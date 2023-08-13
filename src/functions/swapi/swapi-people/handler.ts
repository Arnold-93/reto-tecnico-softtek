import {APIGatewayEvent, Handler} from "aws-lambda";
import {formatJSONResponse} from "@libs/api-gateway";
import {middyfy} from "@libs/lambda";
import {getSwapiAllPeople} from "@libs/swapi/getPeople";

const getPeople: Handler = async (event: APIGatewayEvent) => {
    try {
        const { queryStringParameters } = event
        //obtenemoslo que enviamos desde el lambda 
        console.log(queryStringParameters.lan)

        const response = await getSwapiAllPeople(queryStringParameters.lan);
        return formatJSONResponse(response);
    } catch (error) {
        console.log(error);
        
        return formatJSONResponse(
            {
                error: error.message,
                status: 400
            }
        );
    }
};

export const main = middyfy(getPeople);
