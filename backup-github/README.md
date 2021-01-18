## 

build:

```
docker build . -t backup-github -f Dockerfile
```

```
docker run -d --name backup-github -e ACCESS_TOKEN="" -v /downloads:/root/Downloads -v /hosts:/etc/hosts backup-github
```

exec:

```
docker exec -it backup-github sh
```