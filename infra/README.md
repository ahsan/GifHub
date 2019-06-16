# Steps
1. Create a user named `gifhub_terraform` in AWS.
2. Grant admin rights for AutoScaling, EC2, EKS, IAM and DynamoDB to this user.

# Required Environment Variables
1. Terraform needs needs to create AWS resources. A role for terraform with permissions to create the AutoScaling, EC2, EKS, and IAM resources was created. The keys of this user need to be populated in these environment variables:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY