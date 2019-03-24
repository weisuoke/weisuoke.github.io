#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 发布到自定义域名
# echo 'www.weisuoke.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:weisuoke/weisuoke.github.io.git master

cd -