import { handlerPath } from "@libs/handler-resolver";
import { AWSLambda } from '../../../utils/lambdaFunctionInterface';

const handler: AWSLambda = {
	handler: `${handlerPath(__dirname)}/handler.main`,
	name: "heroe-add",
	description: "Registrar un heroe de la BD Dynamo",
	events: [
		{
			http: {
				method: "post",
				path: "heroes"
			},
		},
	],
};
export default handler;