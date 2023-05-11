# Overview
In this project, you'll develop and demonstrate your skills in using a variety of industry leading tools, especially Microsoft Azure, to create disposable test environments and run a variety of automated tests with the click of a button. Additionally, you'll monitor and provide insight into your application's behavior, and determine root causes by querying the application’s custom log files.

# Getting Started
Before you deploy the infrastructure, you will need to:
* Azure & Github Account
* Clone the repository
* Creating a Azure App service
* Deploying the App with Azure Pipelines
* Terraform
* JMeter
* Postman
* Python
* Selenuim


# Instructions

## Azure pipeline
![](./screenshots/azure-pipeline.png)

## Build Infrastructure with terraform
Terraform init
![](./screenshots/pipeline_terraform_init.png)
Terraform apply
![](./screenshots/pipeline_terraform_apply.png)
Liste of ressources
![](./screenshots/pipeline_terraform_apply.png)

## Deploy to Azure Web App
Deploy fake rest api
![](./screenshots/pipeline_deploy_webapp.png)

## Integration tests
Pipeline data validation
![](./screenshots/pipeline_integration_test_data_validation.png)
Publish data validation
![](./screenshots/pipeline_integration_test_data_validation_publish.png)

Pipeline regression
![](./screenshots/pipeline_integration_test_regression.png)
Publish regression
![](./screenshots/pipeline_integration_test_regression_publish.png)

## JMeter tests
Pipeline Endurance test
![](./screenshots/pipeline_jmeter_endurance.png)
Report Stress test
![](./screenshots/pipeline_jmeter_endurance_report.png)

Pipeline Stress test
![](./screenshots/pipeline_jmeter_stress_test.png)
Report Stress test
![](./screenshots/pipeline_jmeter_stress_test_report.png)

## UI tests with selenium
Pipeline UI test
![](./screenshots/pipeline_ui_tests.png)
Logs by ui testing
![](./screenshots/pipeline_ui_tests_logs.png)

## Monitoring Azure Webapp
Alerts monitoring send mail
![](./screenshots/monitoring_azure_404.png)