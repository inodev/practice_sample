## デプロイコマンド

```shell
cd cdk
# デプロイ前の差分チェック
cdk diff --context target=staging
# デプロイ
cdk deploy --context target=staging
```