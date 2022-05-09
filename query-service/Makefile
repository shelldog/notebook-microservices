build-image:
	docker build -t query-service-image .

# Kubernetes

# local
k8s-query-local-up:
	kubectl apply -f k8s-query-local.yaml

k8s-query-local-down:
	kubectl delete -f k8s-query-local.yaml

# prod
k8s-query-prod-up:
	kubectl apply -f k8s-query-prod.yaml

k8s-query-prod-down:
	kubectl delete -f k8s-query-prod.yaml
