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
