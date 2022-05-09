build-image:
	docker build -t event-bus-image .

# Kubernetes

# local

k8s-event-bus-local-up:
	kubectl apply -f k8s-event-bus-local.yaml

k8s-event-bus-local-down:
	kubectl delete -f k8s-event-bus-local.yaml	

# prod
k8s-event-bus-prod-up:
	kubectl apply -f k8s-event-bus-prod.yaml

k8s-event-bus-prod-down:
	kubectl delete -f k8s-event-bus-prod.yaml
