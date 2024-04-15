#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StagingStack } from '../lib/staging-stack';
import { ProductionStack } from '../lib/production-stack';

const app = new cdk.App();
const target = app.node.tryGetContext('target');

cdk.Tags.of(app).add('Project', 'Magareco');

switch (target) {
  case "staging":
    cdk.Tags.of(app).add('Environment', 'Staging');
    new StagingStack(app, 'MagarecoStagingStack', {
      env: { region: 'ap-northeast-1' },
    });
    break;
  case "production":
    cdk.Tags.of(app).add('Environment', 'Production');
    new ProductionStack(app, 'MagarecoProductionStack', {
      env: { region: 'ap-northeast-1' },
    });
    break;
  default:
    break;
}
