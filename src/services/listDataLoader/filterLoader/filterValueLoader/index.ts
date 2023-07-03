import {FilterValueLoaderInterface} from "./interfaces";
import {FilterValueLoader} from "./FilterValueLoader";
import {valueLoadProcessors} from "./processors";
import {loggerFactory} from "../../../logger";

// Фабрика сервиса
export const filterValueLoader: {(): FilterValueLoaderInterface} = () => (
    new FilterValueLoader(
        valueLoadProcessors(),
        loggerFactory(),
    )
)