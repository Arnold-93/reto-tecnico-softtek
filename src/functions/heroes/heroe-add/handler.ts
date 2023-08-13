import { APIGatewayEvent } from "aws-lambda";
import { heroeServiceAddService } from "src/services/heroeService";
import { v4 } from 'uuid';
import { middyfy } from "@libs/lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { logger } from "src/utils/logger/logger";
import { C } from "src/shared/constants";

export const heroeAdd = async (event: APIGatewayEvent) => {

    logger.info(">>>>>>Inicio registro de heroe")

    try {
        logger.info(">>>>>>Heroe request: ", JSON.parse(JSON.stringify(event.body)));

        const { description, power, comic, weakness } = JSON.parse(JSON.stringify(event.body));
        const id = v4();

        const newHeroe = {
            id,
            description,
            power,
            comic,
            weakness

        };
        await heroeServiceAddService(newHeroe);

        logger.info(">>>>>>Fin del registro");
        return formatJSONResponse(
            {   status: 200,
                error: false,
                message: C.MESSAGE.HEROE.REGISTRO_HEROE,
                data: newHeroe,
            }
        );

    } catch (error) {
        console.log({ error_addPeople: error });

        return formatJSONResponse(
            {   
                status: 500,
                error: true,
                message: error.message,
                
            }
        );
    }
};

export const main = middyfy(heroeAdd);
