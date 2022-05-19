build-image:
	docker build -t notebook-image .

build-prod-image:
	docker build -t notebook-image:prod -f Dockerfile.prod .

# Docker

# run the image
docker-run-local:
	docker run -d -p 3000:3000 --name notebook notebook-image:latest

docker-run-prod:
	docker run -d -p 80:80 --name notebook shelldog/notebook:latest

# stop the image
docker-stop-local:
	docker stop notebook && docker rm notebook

docker-stop-prod:
	docker stop notebook && docker rm notebook
