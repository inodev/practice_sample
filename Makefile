build-staging:
    docker compose -f compose.staging.yml build

ecr-push-staging: build-staging
    docker tag magareco_app:latest 221696344037.dkr.ecr.ap-northeast-1.amazonaws.com/magareco-staging-app:latest
    docker push 221696344037.dkr.ecr.ap-northeast-1.amazonaws.com/magareco-staging-app:latest
    docker tag magareco_nginx:latest 221696344037.dkr.ecr.ap-northeast-1.amazonaws.com/magareco-staging-nginx:latest
    docker push 221696344037.dkr.ecr.ap-northeast-1.amazonaws.com/magareco-staging-nginx:latest

deploy-staging: ecr-push-staging
    cd eb/staging && eb deploy --timeout 30