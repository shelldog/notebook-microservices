build-image:
	docker build -t notebook-image .

build-prod-image:
	docker build -t notebook-image:prod -f Dockerfile.prod .

# Docker

# run the image
docker-run-local:
	docker run -d -p 3000:3000 --name notebook notebook-image:latest

docker-stop-local:
	docker stop notebook && docker rm notebook
