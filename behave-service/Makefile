build-image:
	docker build -t behave-service-image .

# Kubernetes

# local
k8s-behave-local-up:
	kubectl apply -f k8s-behave-local.yaml

k8s-behave-local-down:
	kubectl delete -f k8s-behave-local.yaml

# prod
k8s-behave-prod-up:
	kubectl apply -f k8s-behave-prod.yaml

k8s-behave-prod-down:
	kubectl delete -f k8s-behave-prod.yaml
