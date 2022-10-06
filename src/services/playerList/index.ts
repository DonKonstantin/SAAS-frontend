import {PlayerListServiceInterface} from "./interfaces";
import {PlayerListService} from "./PlayerListService";

// Фабрика сервиса листинга плееров
export const playerListService: {(): PlayerListServiceInterface} = () => {
    return new PlayerListService()
}