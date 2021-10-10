import {FilterGeneratorInterface} from "./interfaces";
import {FilterGenerator} from "./FilterGenerator";
import {filterGeneratorProcessors} from "./processors";

// Фабрика генератора запросов
export const filterGenerator: {(): FilterGeneratorInterface} = () => (
    new FilterGenerator(filterGeneratorProcessors())
)