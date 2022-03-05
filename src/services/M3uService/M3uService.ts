import {M3UServiceInterface} from "./interface";
import { saveAs } from 'file-saver';

/**
 * Сервис по созданию m3u плейлистов
 */
export default class M3uService implements M3UServiceInterface {
    createPlaylist(playlistCompositions: string[]): void {
        const blob = new Blob([
            '#EXTM3U\n',
            ...playlistCompositions.flatMap(file => {
                return [
                    '#EXTINF -1, ${file}\n',
                    `${file}\n`
                ]
            }),
        ], {type: "audio/x-mpegurl;charset=utf-8"});

        saveAs(blob, "playlist.m3u");
    }
}
