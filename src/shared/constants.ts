
export namespace C {
    export namespace TABLE {
        export const HEROE_TABLE = 'HeroesTable'
    }

    export namespace SERVICIOS {
        export const URL_SWAPI = 'https://swapi.py4e.com/api';
    }

    export namespace MESSAGE {
        export namespace PEOPLE {
            export const ES = 'Se transformó correctamente los modelos de los personajes.';
            export const EN = 'Character list fetched successfully.';

        }
        export namespace PLANET {
            export const ES = 'Se transformó correctamente los modelos de los planet.';
            export const EN = 'Character list fetched successfully.';

        }

        export namespace HEROE {
            export const LISTAR_HEROE = 'list of heroes successful.';
            export const REGISTRO_HEROE = 'Successful Hero Record.';
        }

        export namespace COMMON {
            export const VACIO = 'There is no recorded data.';
            export const ERROR = 'There was a problem listing the characters.';
        }

    }

    export const mapearCampoES = (
        camposEntidad,
        instancia

    ) => {

        return Object.keys(instancia)
            .reduce((objeto, atributo) => {

                const campoTraducido = camposEntidad[atributo];
                objeto[campoTraducido] = instancia[atributo];
                return objeto;
            }, {});
    };



}


