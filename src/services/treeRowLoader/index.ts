import {TreeRowLoaderInterface} from "./interfaces";
import {TreeRowLoader} from "./TreeRowLoader";

// Фабрика сервиса
export const treeRowLoader: {(): TreeRowLoaderInterface} = () => {
    return new TreeRowLoader()
}