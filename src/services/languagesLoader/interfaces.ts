import {LanguagesStore} from "../../reduxStore/stores/Languages";

// Загрузчик данных по языкам
export interface LanguagesLoaderInterface {
    // Загрузка данных по языкам
    Load(): Promise<LanguagesStore>
}