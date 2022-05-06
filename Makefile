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
	ENV=local MONGO_INITDB_ROOT_USERNAME=admin MONGO_INITDB_ROOT_PASSWORD=YWRtaW4tcGFzc3dvcmQK docker-compose -f docker-compose-local.yml up

docker-compose-local-down:
	ENV=local MONGO_INITDB_ROOT_USERNAME=admin MONGO_INITDB_ROOT_PASSWORD=YWRtaW4tcGFzc3dvcmQK docker-compose -f docker-compose-local.yml down

# for dev
docker-compose-dev-up:
	ENV=local MONGO_INITDB_ROOT_USERNAME=admin MONGO_INITDB_ROOT_PASSWORD=YWRtaW4tcGFzc3dvcmQK docker-compose -f docker-compose-dev.yml up

docker-compose-dev-down:
	ENV=local MONGO_INITDB_ROOT_USERNAME=admin MONGO_INITDB_ROOT_PASSWORD=YWRtaW4tcGFzc3dvcmQK docker-compose -f docker-compose-dev.yml down

# for production

docker-compose-production-up:
	$(MAKE) docker-build-prod-image \
			&& ENV=production docker-compose -f docker-compose-production.yml up

docker-compose-production-down:
	ENV=production docker-compose -f docker-compose-production.yml down

# other utilities
docker-prune:
	docker volume prune
