import {EntityValuesGetterInterface} from "./interfaces";
import {EntityValuesGetter} from "./EntityValuesGetter";
import {graphQLClient} from "../../graphQLClient";

// Фабрика сервиса
export const entityValuesGetter: {(token?: string): EntityValuesGetterInterface} = () => {
    return new EntityValuesGetter(
        graphQLClient()
    )
}