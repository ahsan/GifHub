resource "aws_dynamodb_table" "gifhub-dynamodb-table" {
  name           = "Users"
  billing_mode   = "PAY_PER_REQUEST"
  read_capacity  = 5
  write_capacity = 10
  hash_key       = "email"

  attribute {
    name = "email"
    type = "S"
  }

  tags = {
    Name        = "dynamodb-table-1"
    Environment = "production"
  }
}