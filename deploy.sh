#!/usr/bin/bash

docker rmi kickstart-frontend kickstart-backend
docker build . -t kickstart-backend
docker save kickstart-backend -o kickstart-backend.tar
scp kickstart-backend.tar ubuntu@35.234.63.181:tailor-bliss
rm kickstart-backend.tar
