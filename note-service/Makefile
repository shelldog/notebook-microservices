build-image:
	docker build -t note-service-image .

# for Kubernetes

# note-service

# local
k8s-note-local-up:
	kubectl apply -f k8s-note-local.yaml

k8s-note-local-down:
	kubectl delete -f k8s-note-local.yaml

# production
k8s-note-prod-up:
	kubectl apply -f k8s-note-prod.yaml

k8s-note-prod-down:
	kubectl delete -f k8s-note-prod.yaml
