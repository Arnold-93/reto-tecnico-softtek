import {handlerPath} from "@libs/handler-resolver";
import { AWSLambda } from '../../../utils/lambdaFunctionInterface';


const handler: AWSLambda = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "heroes-all",
    description: "listar todos los heroes de la BD de Dynamo",
    events: [
        {
            http: {
                method: "get",
                path: "heroes"
            },
        },
    ],
};
export default handler;