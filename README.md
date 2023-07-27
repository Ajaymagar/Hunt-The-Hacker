# Hunt The Hacker

Hello, Folks this project is useful for Devsecops people and Blue teamers.

SIEM — Security Information and Event Management. Tons of platforms who offer this service. but I thought let us create one a customize, simple and inhouse.

Insufficient Logging and Monitoring — OWASP introduce this as an Application Risk in 2017.

Security Logging Project :- This project looks like GuardDuty in aws. GuardDuty collect logs from cloudtrail and check for malicious activity and Threat. and also alert the Security Team if any malicious activity is logged.

I am doing the same thing collecting logs through Fluentd sending these logs to Elasticsearch Server. after that i wrote a script in nodejs which hit the elasticsearch server for malicios logs and alert the team via discord App.






## Tech Stack

**Tools:** K8s Cluster , nginx-ingress controller , Node-js app deployment , Elasticsearch , Kibana and Fluentd.


This is an Era Of Microservices And **Kubernetes** so we implementing this Project in Kubernetes — **GKE** — Google Cloud. All The Cloud services are the same EKS GKE AKS you can use any.


# Heart of the project 

The Most Important part of the Project is **Node.JS Script** which hit the elasticsearch api and the query will run in output we will get Malicious logs and then we send these logs to the Discord server via Webhook

## Documentation

[Detailed blog post](https://infosecwriteups.com/hunt-the-hacker-d270c1a44c07)


## Feedback

If you have any feedback, please reach out to me at magarajay538@gmail.com
