import { handlerPath } from "@libs/handler-resolver";
import { AWSLambda } from "../../../utils/lambdaFunctionInterface";

// handle: el principal
const handler: AWSLambda = {
	//esto apunta al main del handle .ts
	handler: `${handlerPath(__dirname)}/handler.main`,
	//compilacion
	package:{
		patterns: [`${handlerPath(__dirname)}/handler.js`]
	},
	
	name: "people-swapi",// lo que yo quiera
	description: "listar los datos transformados de los personajes StarWars API",// lo que yo quiera
	events: [
		{
			http: {
				method: "get",
				path: "api-sw/people"
			},
		},
	],
};
export default handler;
