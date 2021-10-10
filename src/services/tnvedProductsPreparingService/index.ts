import {TnvedProductsPreparingServiceInterface} from "./interface";
import {TnvedProductsPreparingService} from "./TnvedProductsPreparingService";

// Фабрика сервиса
export const tnvedProductsPreparingService: {(): TnvedProductsPreparingServiceInterface} = () => {
    return new TnvedProductsPreparingService()
};