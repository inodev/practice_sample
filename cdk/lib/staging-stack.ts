
import * as cdk from 'aws-cdk-lib';
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class StagingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stackName = 'MagarecoStaging';

    const vpc = new ec2.Vpc(this, 'vpc', {
      ipAddresses: ec2.IpAddresses.cidr('192.168.0.0/16'),
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
      ],
    });

    // ECRレポジトリ
    const appEcrRepository = new ecr.Repository(this, 'appRepository', {
      repositoryName: "MagarecoStagingApp",
      encryption: ecr.RepositoryEncryption.AES_256,
      imageTagMutability: ecr.TagMutability.MUTABLE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteImages: true
    });

    const nginxEcrRepository = new ecr.Repository(this, 'nginxRepository', {
      repositoryName: "MagarecoStagingNginx",
      encryption: ecr.RepositoryEncryption.AES_256,
      imageTagMutability: ecr.TagMutability.MUTABLE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteImages: true
    });

    // TODO
    // - RDSの追加
    // - RDSのセキュリティグループの追加
    // - S3のバケット作成
  }
}
