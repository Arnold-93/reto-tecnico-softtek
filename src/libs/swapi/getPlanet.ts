
import {apiResponse} from "../../utils/response";
import {Planet} from "../../models/Planet";
import axios from "axios";
import { C } from "src/shared/constants";
import { planetsModel } from "src/utils/model/planetsModel";

/**
 *  Funcion para transformar los values de personas a español.
 * **/
export const getSwapiAllPlanet= async (language = "en") => {
    try {
        const { data } = await axios.get(`${C.SERVICIOS.URL_SWAPI}/planets/`);
        const dataResponse: Planet[] = data.results;

        if (dataResponse.length === 0) return apiResponse(data, C.MESSAGE.COMMON.VACIO, 404);

        return (language === "es") ?
            apiResponse(
                dataResponse.map((person) => ({ ...C.mapearCampoES(planetsModel, person) })),
                C.MESSAGE.PLANET.ES,
                200)
            :
            apiResponse(
                dataResponse,
                C.MESSAGE.PLANET.EN,
                200);


    } catch (error) {
        return apiResponse(
            null,
            C.MESSAGE.COMMON.ERROR,
            500,
            error
        );
    }
};
