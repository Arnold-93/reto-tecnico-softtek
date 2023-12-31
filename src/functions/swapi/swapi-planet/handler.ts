import { APIGatewayEvent, Handler } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getSwapiAllPlanet } from "@libs/swapi/getPlanet";

const getPlanet: Handler = async (event: APIGatewayEvent) => {
    try {
        const { queryStringParameters } = event
        const { lan, idPlanet} = queryStringParameters;
        const response = await getSwapiAllPlanet(lan, idPlanet);
        return formatJSONResponse(response);

    } catch (error) {
        return formatJSONResponse(
            {
                error: error.message,
                status: 400
            }
        );
    }
};

export const main = middyfy(getPlanet);
