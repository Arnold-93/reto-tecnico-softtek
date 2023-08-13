import axios from "axios";
import { C } from "src/shared/constants";

export const planetsResult = async (idPeople = null) => {
    const url = (idPeople != null) ?
        `${C.SERVICIOS.URL_SWAPI}/planets/${idPeople}` :
        `${C.SERVICIOS.URL_SWAPI}/planets/`

    const { data } = await axios.get(url);

    return {
        data
    }
}