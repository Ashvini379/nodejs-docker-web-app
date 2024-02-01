Configuring, Provisioning, and Monitoring Node.js Application - Capstone Project

1.	Node.js Application Configuration
Application is available at github location

https://github.com/Ashvini379/nodejs-docker-web-app.git

Step 1: Created a directory structure for different environments.(eg development, staging and production)
 

Step 2: Created configuration for different environments as shown above.

2.	Dockerize Node.js application.

Step 1: Created a Dockerfile for Node.js application
 

Step 2: Specified the base image (e.g., Node.js image) and necessary dependencies.
Step 3: Instructions to copy application code into the image.
Step 4: Set environment variables and configure the container to run the Node.js application.
Step 5: Build the Docker image using the docker build command.

docker build -t ashvini34/node-express-web-app:v1


Step 6: Test the Docker image by running it locally using docker run.

docker run -p 8001:8080 ashvini34/node-express-web-app:v1

Lets go to browser and hit http://localhost:8001

 
Step 7: Push image to docker hub

docker push ashvini34/node-express-web-app:v1
 

3.	Provisioning with Kubernetes
Step 1: Install and configure Minikube for local Kubernetes cluster provisioning.

Step 2: Use kubectl to interact with the Minikube cluster and verify its configuration.

Step 3: Develop Kubernetes YAML files for deploying the Node.js application.

Step 4: Define a Kubernetes Deployment resource to manage the application's pods.
 
Step 5: Specify a Kubernetes Service resource to expose the application within the cluster.
 

Step 6: Set up Ingress to enable external access to the Node.js application.
Step 7: Deploy the application to the Minikube cluster using kubectl apply.

Start minikube

minikube start

          Create deployment in kubernetes cluster
	Kubectl apply –f deployment.yaml
	Kubectl get pods
 
          Create service 
	Kubectl apply –f service.yaml
	Kubectl get services
	 
Minikube dashboard
 
 
 
Run minikube service
Minikube service nodeexpresswebapp-service
 
4.	Monitoring setup
Step 1: Install and configure Prometheus to collect metrics from the Node.js application.
Add Prometheus repository

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

Install provided helm chart for Prometheus
helm install prometheus prometheus-community/Prometheus

Expose the prometheus-server service via NodePort

kubectl expose service prometheus-server --type=NodePort --target-port=9090 --name=prometheus-server-np
 



Step 2: Create Prometheus configuration files to define scraping targets and alerting rules.
Step 3: Set up Grafana and configure it to visualize Prometheus data.
Add grafana helm repo
helm repo add grafana https://grafana.github.io/helm-charts

Install grafana chart
helm install grafana grafana/grafana

Expose grafana service vis nodePort Service

kubectl expose service grafana --type=NodePort --target-port=3000 --name=grafana-np

Check exposed services
kubectl get services

Get grafana secrets

kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo

Expose grafana service in Minikube

minikube service grafana-np –url

 


Step 4: Design a Grafana dashboard that displays key performance metrics.
Step 5: Test the monitoring setup by verifying that metrics are collected and displayed in Grafana.

 

 




 	
            
	

