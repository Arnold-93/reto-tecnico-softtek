import { APIGatewayEvent, Handler } from "aws-lambda";
import {formatJSONResponse} from "@libs/api-gateway";
import {middyfy} from "@libs/lambda";

import { queryHeroesByParameters } from "src/services/heroeService";
import { C } from "src/shared/constants";
import { logger } from "src/utils/logger/logger";

const getHeroesAll: Handler = async (event: APIGatewayEvent) => {

    const parameters = event.queryStringParameters || null;

    logger.info(">>>>>>Inicio listado hereos")
    try {
        const result = await queryHeroesByParameters(parameters);
        return formatJSONResponse(
            {   status: 200,
                error: false,
                message: C.MESSAGE.HEROE.LISTAR_HEROE,
                data: result.Items,
                
            }
        );

    } catch (error) {
        console.log({error_list_heroes: error});

        return formatJSONResponse(

            {   status: 500,
                error: true,
                message: error.message,
                
            }
        );
    }
};

export const main = middyfy(getHeroesAll);