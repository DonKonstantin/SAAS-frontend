import {SetUserPasswordServiceInterface} from "./interfaces";
import {SetUserPasswordService} from "./SetUserPasswordService";

// Фабрика сервиса
export const setUserPasswordService: {(): SetUserPasswordServiceInterface} = () => (
    new SetUserPasswordService()
)