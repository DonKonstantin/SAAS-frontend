import {EntityValuesGetterInterface} from "./interfaces";
import {EntityValuesGetter} from "./EntityValuesGetter";
import {graphQLClient} from "../../graphQLClient";

// Фабрика сервиса
export const entityValuesGetter: {(): EntityValuesGetterInterface} = () => {
    return new EntityValuesGetter(
        graphQLClient()
    )
}