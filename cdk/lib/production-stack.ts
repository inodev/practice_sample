
import * as cdk from 'aws-cdk-lib';
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class ProductionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stackName = 'MagarecoProduction';

    const vpc = new ec2.Vpc(this, 'vpc', {
      ipAddresses: ec2.IpAddresses.cidr('172.16.0.0/16'),
      natGateways: 1, // default 1
      maxAzs: 2,
      subnetConfiguration: [
        {
          // Public Subnets for ALB
          cidrMask: 24,
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          // Private Subnets for App
          cidrMask: 24,
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          // Isolated Subnets for RDS
          cidrMask: 24,
          name: 'Isolated',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // ECRレポジトリ
    const appEcrRepository = new ecr.Repository(this, 'appRepository', {
      repositoryName: "magareco-production-app",
      encryption: ecr.RepositoryEncryption.AES_256,
      imageTagMutability: ecr.TagMutability.MUTABLE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteImages: true
    });

    const nginxEcrRepository = new ecr.Repository(this, 'nginxRepository', {
      repositoryName: "magareco-production-nginx",
      encryption: ecr.RepositoryEncryption.AES_256,
      imageTagMutability: ecr.TagMutability.MUTABLE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteImages: true
    });

    // for EC2
    const ec2SecurityGroup = new ec2.SecurityGroup(this, 'ec2SecurityGroup', {
      vpc,
      description: 'ec2 security group',
      allowAllOutbound: true
    });

    // for RDS
    const rdsSecurityGroup = new ec2.SecurityGroup(this, 'rdsSecurityGroup', {
      vpc,
      description: 'rds security group',
      allowAllOutbound: true
    });
    rdsSecurityGroup.addIngressRule(ec2SecurityGroup, ec2.Port.tcp(5432), 'allow ec2 to connect rds');

    // RDSの追加
    const postgres = new rds.DatabaseInstance(this, "PostgresInstance", {
      engine: rds.DatabaseInstanceEngine.POSTGRES,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      securityGroups: [rdsSecurityGroup],
      vpc,
    });

    // S3のバケット作成
    const bucket = new s3.Bucket(this, 'bucket', {
      encryption: s3.BucketEncryption.KMS,
      bucketName: 'magareco'
    });
  }
}
