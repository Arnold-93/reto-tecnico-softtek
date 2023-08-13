import axios from "axios";
import { C } from "src/shared/constants";

export const peopleResult = async (idPeople = null) => {

    const url = (idPeople != null) ?
        `${C.SERVICIOS.URL_SWAPI}/people/${idPeople}/` :
        `${C.SERVICIOS.URL_SWAPI}/people/`;

    const { data } = await axios.get(url);
    return {
        data
    }
}