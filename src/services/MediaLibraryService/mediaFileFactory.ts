import {LicenseType, MediaFile} from "./interface";

/**
 * Фабрика создания оъекта сущности медиафайла
 * @param fileDTO
 * @param licenseType
 */
export default (fileDTO: Partial<MediaFile>, licenseType: LicenseType): MediaFile => {
    return {
        album: fileDTO.album || "",
        artist: fileDTO.artist || "",
        bpm: fileDTO.bpm || 0,
        composer: fileDTO.composer || "",
        file_name: fileDTO.file_name || "",
        genre: fileDTO.genre || "",
        id: fileDTO.id || "",
        isrc: fileDTO.isrc || "",
        language: fileDTO.language || "",
        license_type: fileDTO.license_type || licenseType,
        lyricist: fileDTO.lyricist || "",
        mime_type: fileDTO.mime_type || "",
        obscene: fileDTO.obscene || false,
        publisher: fileDTO.publisher || "",
        title: fileDTO.title || "",
        year: fileDTO.year || 0,
        duration: fileDTO.duration || 0,
        size: fileDTO.size || 0,
    }
}
