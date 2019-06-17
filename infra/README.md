# Steps
1. Create a user named `gifhub_terraform` in AWS.
2. Grant admin rights for AutoScaling, EC2, EKS, IAM and DynamoDB to this user.
- `AutoScalingFullAccess`
- `AmazonEC2FullAccess`
- ``

# Required Environment Variables
1. Terraform needs needs to create AWS resources. A role for terraform with permissions to create the AutoScaling, EC2, EKS, and IAM resources was created. The keys of this user need to be populated in these environment variables:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY


# Setting up the EKS cluster
1. Configure AWS credentials `aws configure`
2. Download and i nstall `kubectl`
3. Download the `aws-iam-authenticator` and move to PATH.
4. `terraform plan` 
5. `terraform apply`
6. Get the `kubeconfig` output and write to `~/.kube/config`
```
mv ~/.kube/config ~/.kube/config.bkp
terraform output kubeconfig > ~/.kube/config
```
7. Apply the config map
```
terraform output config_map_aws_auth > config_map_aws_auth.yaml
kubectl apply -f config_map_aws_auth.yaml
```
