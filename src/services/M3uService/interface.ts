// Сервис по созданию плейлиста в формате m3u на стороне клиента
export interface M3UServiceInterface {
    /**
     * Создание и сохранение файла плейлиста
     */
    createPlaylist(
        playlistCompositions: string[]
    ): void;
}
