# README

## 環境構築

```shell
% cp .envrc.sample .envrc
% docker-compose build
% docker-compose up -d
% docker-compose exec web rails db:create
% docker-compose exec web rails db:migrate
```
