import M3uService from "./M3uService";

/**
 * Фабрика сервиса создания m3u плейлистов
 */
const m3uServiceFactory = () => {
    return new M3uService();
}

export default m3uServiceFactory;
