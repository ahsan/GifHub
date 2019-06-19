# Steps for Deployment

> Note: These steps are for MacOS. Other OS's might have some variations.

## Infrastructure

### Setting up AWS CLI
1. In AWS Console, create a new user for Terraform. e.g `gifhub_terraform`. I gave this user the following permission policies `AdministratorAccess`, `AmazonEC2FullAccess` and all of EKS related policies.
2. Install `aws-cli` by following [this guide](https://docs.aws.amazon.com/cli/latest/userguide/install-macos.html).

### Setting and running Terraform
1. Install Terrafor by following [this guide](https://learn.hashicorp.com/terraform/getting-started/install.html).
2. Navigate into the `./infra/terraform` directory and run the `deploy_infra` shell script.

> Caution: this step might cause significant contributions to your AWS bill

```sh
cd ./infra/terraform
./deploy_infra
```
3. This shell script will perform the following steps on its own (without prompt):
```
terraform init
terraform plan
terraform apply
```

4. After bringing up the infrastructure, Terraform will produce two outputs:
- `config_map_aws_auth`
- `kubeconfig`

5. The script will automatically apply the `config_map_aws_auth`.
6. The script will also place the generated `kubeconfig` at `~/.kube/config`. We will also need this config at a later point to setup our Gitlab CI/CD.



# Required Environment Variables
1. Terraform needs needs to create AWS resources. A role for terraform with permissions to create the AutoScaling, EC2, EKS, and IAM resources was created. The keys of this user need to be populated in these environment variables:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY


# Setting up the EKS cluster
1. Configure AWS credentials `aws configure`
2. Download and i nstall `kubectl`
3. Download the `aws-iam-authenticator` and move to PATH by following [this guide](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html).
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
