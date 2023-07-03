import {EntityValidatorInterface} from "./interfaces";
import {EntityValidator} from "./EntityValidator";

// Фабрика сервиса
export const entityValidator: {(): EntityValidatorInterface} = () => {
    return new EntityValidator()
}