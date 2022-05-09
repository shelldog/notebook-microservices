# Makefile for developing locally

docker-rm-image:
	# make sure delete entire images
	docker rmi note-service-image \
		&& docker rmi behave-service-image \
		&& docker rmi event-bus-image \
		&& docker rmi query-service-image \
		&& docker rmi notebook-image:latest \
		&& docker rmi notebook-image:prod

docker-build-image:
	cd note-service \
		&& $(MAKE) build-image
	cd behave-service \
		&& $(MAKE) build-image
	cd pseudo-event-bus \
		&& $(MAKE) build-image
	cd query-service \
		&& $(MAKE) build-image
	cd notebook \
		&& $(MAKE) build-image

docker-build-prod-image:
	cd notebook \
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

## KUBERNETES ##

k8s-init:
	minikube start --ports=30000 --ports=30010 --ports=30020 --ports=30030

k8s-load-image:
	minikube image load mongo:latest
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
	kubectl delete -f k8s-mongo.yaml
	cd note-service \
		&& $(MAKE) k8s-note-local-down
	cd behave-service \
		&& $(MAKE) k8s-behave-local-down
	cd query-service \
		&& $(MAKE) k8s-query-local-down
	cd pseudo-event-bus \
		&& $(MAKE) k8s-event-bus-local-down
