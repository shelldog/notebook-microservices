# Makefile for developing locally

docker-pull-images:
	docker pull mongo:latest
	docker pull nginx:latest
	docker pull node:17-alpine3.14

docker-rm-images:
	# make sure delete entire images
	docker rmi note-service-image \
		&& docker rmi behave-service-image \
		&& docker rmi event-bus-image \
		&& docker rmi query-service-image \
		&& docker rmi notebook-image:latest \
		&& docker rmi notebook-image:prod

docker-build-images:
	cd note-service \
		&& $(MAKE) build-image
	cd behave-service \
		&& $(MAKE) build-image
	cd pseudo-event-bus \
		&& $(MAKE) build-image
	cd query-service \
		&& $(MAKE) build-image
	cd notebook \
		&& $(MAKE) build-image \
		&& $(MAKE) build-prod-image

# for local
docker-compose-local-up:
	ENV=local MONGO_INITDB_ROOT_USERNAME=admin MONGO_INITDB_ROOT_PASSWORD=YWRtaW4tcGFzc3dvcmQK docker-compose -f docker-compose-local.yaml up

docker-compose-local-down:
	ENV=local MONGO_INITDB_ROOT_USERNAME=admin MONGO_INITDB_ROOT_PASSWORD=YWRtaW4tcGFzc3dvcmQK docker-compose -f docker-compose-local.yaml down

# for dev
docker-compose-dev-up:
	ENV=local MONGO_INITDB_ROOT_USERNAME=admin MONGO_INITDB_ROOT_PASSWORD=YWRtaW4tcGFzc3dvcmQK docker-compose -f docker-compose-dev.yaml up

docker-compose-dev-down:
	ENV=local MONGO_INITDB_ROOT_USERNAME=admin MONGO_INITDB_ROOT_PASSWORD=YWRtaW4tcGFzc3dvcmQK docker-compose -f docker-compose-dev.yaml down

# for production

docker-compose-production-up:
	$(MAKE) docker-build-prod-image \
			&& ENV=production docker-compose -f docker-compose-production.yaml up

docker-compose-production-down:
	ENV=production docker-compose -f docker-compose-production.yaml down

# other utilities
docker-prune:
	docker volume prune

# tags to push the images
docker-tag-images:
	docker tag notebook-image:prod shelldog/notebook:latest
	docker tag note-service-image:latest shelldog/note:latest
	docker tag behave-service-image:latest shelldog/behave:latest
	docker tag query-service-image:latest shelldog/query:latest
	docker tag event-bus-image:latest shelldog/event-bus:latest

docker-push-images:
	docker push shelldog/notebook:latest
	docker push shelldog/note:latest
	docker push shelldog/behave:latest
	docker push shelldog/query:latest
	docker push shelldog/event-bus:latest

## KUBERNETES ##

k8s-init:
	minikube start

k8s-init-wsl2:
	minikube start --ports=127.0.0.1:30000:30000 --ports=127.0.0.1:30010:30010 --ports=127.0.0.1:30020:30020 --ports=127.0.0.1:30030:30030

k8s-load-images:
	minikube image load mongo:latest
	minikube image load nginx:latest
	minikube image load note-service-image:latest
	minikube image load behave-service-image:latest
	minikube image load query-service-image:latest
	minikube image load event-bus-image:latest

k8s-up:
	kubectl apply -f k8s-config.yaml
	kubectl apply -f k8s-secret.yaml

k8s-down:
	kubectl delete -f k8s-config.yaml
	kubectl delete -f k8s-secret.yaml

# for local
k8s-local-up:
	cd notebook \
		&& $(MAKE) docker-run-local
	kubectl apply -f k8s-mongo.yaml	
	cd note-service \
		&& $(MAKE) k8s-note-local-up
	cd behave-service \
		&& $(MAKE) k8s-behave-local-up
	cd query-service \
		&& $(MAKE) k8s-query-local-up
	cd pseudo-event-bus \
		&& $(MAKE) k8s-event-bus-local-up

k8s-local-down:
	cd notebook \
		&& $(MAKE) docker-stop-local
	kubectl delete -f k8s-mongo.yaml
	cd note-service \
		&& $(MAKE) k8s-note-local-down
	cd behave-service \
		&& $(MAKE) k8s-behave-local-down
	cd query-service \
		&& $(MAKE) k8s-query-local-down
	cd pseudo-event-bus \
		&& $(MAKE) k8s-event-bus-local-down

k8s-prod-up:
	cd notebook \
		&& $(MAKE) docker-run-prod
	cd note-service \
		&& $(MAKE) k8s-note-prod-up
	cd behave-service \
		&& $(MAKE) k8s-behave-prod-up
	cd query-service \
		&& $(MAKE) k8s-query-prod-up
	cd pseudo-event-bus \
		&& $(MAKE) k8s-event-bus-prod-up

k8s-prod-down:
	cd notebook \
		&& $(MAKE) docker-stop-prod
	cd note-service \
		&& $(MAKE) k8s-note-prod-down
	cd behave-service \
		&& $(MAKE) k8s-behave-prod-down
	cd query-service \
		&& $(MAKE) k8s-query-prod-down
	cd pseudo-event-bus \
		&& $(MAKE) k8s-event-bus-prod-down
