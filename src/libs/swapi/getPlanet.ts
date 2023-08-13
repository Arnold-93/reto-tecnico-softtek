
import {apiResponse} from "../../utils/response";
import {Planet} from "../../models/Planet";
import { C } from "src/shared/constants";
import { planetsModel } from "src/utils/model/planetsModel";
import { planetsResult } from "src/services/planetService";

/**
 *  Funcion para transformar los values de personas a español.
 * **/
export const getSwapiAllPlanet= async (language = "en", idPlanet = null) => {
    try {
        const { data } = await planetsResult(idPlanet);

        const dataResponse: Planet[] = (idPlanet == null) ? data.results : [data];;

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
