import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { C } from "src/shared/constants";
import { logger } from "src/utils/logger/logger";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(ddbClient);


/**
 * Funcion de registro hereo  
 * **/

export const heroeServiceAddService = async (newHeroe) => {
    logger.info(">>>>>>Inicio registro en DynamoDB")
    const params = {
        TableName: C.TABLE.HEROE_TABLE,
        Item: newHeroe,
    };

    try {
        return await docClient.send(new PutCommand(params));
    } catch (err) {
        throw new Error(err);
    }

};

/**
 * - Funcion para listar heroes por parametros { description, power, comic, weakness }
 * -  Funcion para listar heroes sin parametro
 * **/

export const queryHeroesByParameters = async (parameters: Record<string, any>) => {
    logger.info(">>>>>>Inicio listado hereos por parametro o sin parametro de DynamoDB")

    if (parameters == null) return await docClient.send(new ScanCommand({
        ProjectionExpression: "#id, description, power, comic, weakness",
        ExpressionAttributeNames: { "#id": "id" },
        TableName: C.TABLE.HEROE_TABLE
    }));

    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    let filterExpression = "";

    for (const paramName in parameters) {
        const paramNameKey = `#${paramName}`;
        const paramValueKey = `:${paramName}`;
        expressionAttributeNames[paramNameKey] = paramName;
        expressionAttributeValues[paramValueKey] = parameters[paramName];
        filterExpression += `${paramNameKey} = ${paramValueKey} AND `;
    }
    filterExpression = filterExpression.slice(0, -5);

    const command =

        new ScanCommand({
            TableName: C.TABLE.HEROE_TABLE,
            FilterExpression: filterExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
        });



    return await docClient.send(command);
}

export const getHeroesAllService = async () => {
    logger.info(">>>>>>Inicio listado hereos de DynamoDB")
    try {
        const command = new ScanCommand({
            ProjectionExpression: "#id, description, power, comic, weakness",
            ExpressionAttributeNames: { "#id": "id" },
            TableName: C.TABLE.HEROE_TABLE
        });

        return await docClient.send(command);

    } catch (err) {
        throw new Error(err);
    }

};

export const updateHero = async (heroId, newData) => {

    const params = {
        TableName: C.TABLE.HEROE_TABLE,
        Key: { heroId },
        UpdateExpression: "SET #description = :newDescription, #power = :newPower, #comic = :newComic",
        ExpressionAttributeNames: {
            "#description": "description",
            "#power": "power",
            "#comic": "comic"
        },
        ExpressionAttributeValues: ({
            ":newDescription": newData.description,
            ":newPower": newData.power,
            ":newComic": newData.comic
        }),
    };


    return await docClient.send(new UpdateItemCommand(params));

}