import { apiResponse } from "../../utils/response";
import { People } from "../../models/People";
import axios from "axios";
import { C } from "src/shared/constants";
import { peopleModel } from "src/utils/model/peopleModel";

/**
 *  Funcion para transformar los values de planetas a español.
 * **/
export const getSwapiAllPeople = async (language = 'en') => {

    try {
        const { data } = await axios.get(`${C.SERVICIOS.URL_SWAPI}/people/`);

        const dataResponse: People[] = data.results;

        if (dataResponse.length === 0) return apiResponse(data, C.MESSAGE.COMMON.VACIO, 404);

        return (language === 'es') ?
            apiResponse(
                dataResponse.map((person) => ({ ...C.mapearCampoES(peopleModel, person) })),
                C.MESSAGE.PEOPLE.ES,
                200
            )

            : apiResponse(
                dataResponse,
                C.MESSAGE.PEOPLE.EN,
                200
            );

    } catch (error) {
        console.log({ error: error });
        return apiResponse(
            null,
            C.MESSAGE.COMMON.ERROR,
            500,
            error
        );
    }
};
