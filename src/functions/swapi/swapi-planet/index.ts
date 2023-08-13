import { handlerPath } from "@libs/handler-resolver";
import { AWSLambda } from "../../../utils/lambdaFunctionInterface";

const handler: AWSLambda = {
	handler: `${handlerPath(__dirname)}/handler.main`,
	name: "planet-swapi",
	description: "listar los datos transformados de los planetas StarWars API",
	events: [
		{
			http: {
				method: "get",
				path: "api-sw/planet"
			},
		},
	],
};
export default handler;

