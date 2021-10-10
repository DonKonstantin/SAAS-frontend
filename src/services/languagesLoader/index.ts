import {LanguagesLoaderInterface} from "./interfaces";
import {LanguagesLoader} from "./LanguagesLoader";

// Фабрика сервиса
export const languagesLoader: {(token?: string): LanguagesLoaderInterface} = token => {
    return new LanguagesLoader(token)
}