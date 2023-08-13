import type {AWS} from "@serverless/typescript";

import getPeopleSwapi from "@functions/swapi/swapi-people";
import getPlanetSwapi from "@functions/swapi/swapi-planet";
import addHeroe from "@functions/heroes/heroe-add";
import allHeroe from "@functions/heroes/hores-all";

const serverlessConfiguration: AWS = {
    service: "softtek",
    frameworkVersion: "3",
    plugins: ["serverless-esbuild","serverless-offline"],
    provider: {
        name: "aws",
        runtime: "nodejs16.x",
        stage: "dev",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
        },
        iam: {
            role: {
                name: "role_aws_prueba_tecnica_softtek",
                statements: [
                    {
                        Effect: "Allow",
                        Action: [
                            "s3:PutObject",
                            "s3:DeleteObject",
                            "s3:GetObject",
                        ],
                        Resource: "*"
                    },
                    {
                        Effect: "Allow",
                        Action: [
                            "secretsmanager:GetSecretValue"
                        ],
                        Resource: "*"
                    },
                    {
                        Effect: "Allow",
                        Action: [
                            "dynamodb:DescribeTable",
                            "dynamodb:Query",
                            "dynamodb:GetItem",
                            "dynamodb:Scan",
                            "dynamodb:PutItem"
                        ],
                        Resource: "arn:aws:dynamodb:us-east-1:*:table/HeroesTable"
                    },
                    {
                        //esto invocar el lambda
                        Effect: "Allow",
                        Action: [
                            "execute-api:Invoke"
                        ],
                        Resource: "arn:aws:execute-api:*:*:*"
                    }
                ],
            }
        }
    },
    //declarar los recurso en este caso DynamoDB en DynamoDB
    resources: {
        Resources: {
            PeopleTable: { //Nombre de la tabla crear
                Type: "AWS::DynamoDB::Table", 
                Properties: { 
                    TableName: "HeroesTable",
                    BillingMode: "PAY_PER_REQUEST",//modo de pago
                    AttributeDefinitions: [ //pot defecto es primary key
                        //AttributeName valor --- AttributeType - tipo: String
                        {AttributeName: "id", AttributeType: "S"}
                    ],
                    KeySchema: [
                        {AttributeName: "id", KeyType: "HASH"}
                    ]
                }
            }
        }
    },
    // declando las funciones
    functions: {getPeopleSwapi, getPlanetSwapi, addHeroe, allHeroe },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ["aws-sdk"],
            target: "node16",
            define: {"require.resolve": undefined},
            platform: "node",
            concurrency: 20,
        },
    },
};

module.exports = serverlessConfiguration;
