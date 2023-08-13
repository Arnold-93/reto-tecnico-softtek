import { mapearCampoES, fieldsPeople } from "../../utils/attributesTranslate";
import { apiResponse } from "../../utils/response";
import axios from "axios";
export const getPeopleSwapi = async (language = "en") => {
    try {
        const { data } = await axios.get("https://swapi.py4e.com/api/people/");
        const dataResponse = data.results;
        if (dataResponse.length === 0) {
            return apiResponse(data, "No hay datos registrados.", 404);
        }
        if (language === "es") {
            const datResponseConverted = dataResponse.map((person) => {
                return {
                    ...mapearCampoES(fieldsPeople, person),
                };
            });
            return apiResponse(datResponseConverted, "Lista de personajes obtenida correctamente.", 200);
        }
        return apiResponse(dataResponse, "Lista de personajes obtenida correctamente.", 200);
    }
    catch (error) {
        console.log({ error: error });
        return apiResponse(null, "Hubo un problema al listrar los personajes.", 500, error);
    }
};
//# sourceMappingURL=getPeople.js.map