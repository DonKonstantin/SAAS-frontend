import * as mmb from "music-metadata-browser";
import { MediaFileToUploadWithoutLicense } from "services/MediaFileClient/interface";
import { MediaFile } from "services/MediaLibraryService/interface";

//  создает из файла объект с медиа данными
export const makeMediaFileInfo = async (
  file: File
): Promise<MediaFileToUploadWithoutLicense> => {
  const metadata = await mmb.parseBlob(file, { skipPostHeaders: true });

  const preparedFileData = metadataToMediaInfo(metadata);

  return {
    replace: false,
    replaceId: "",
    hasDoubles: false,
    file,
    mediaInfo: {
      album: preparedFileData.album || "",
      artist: preparedFileData.artist || "",
      bpm: preparedFileData.bpm || 0,
      composer: preparedFileData.composer || "",
      file_name: preparedFileData.file_name || "",
      origin_name: file.name || "",
      genre: preparedFileData.genre || "",
      creation_date: preparedFileData.creation_date || "",
      creator: preparedFileData.creator || "",
      hash_sum: preparedFileData.hash_sum || "",
      last_change_date: preparedFileData.last_change_date || "",
      last_editor: preparedFileData.last_editor || "",
      id: preparedFileData.id || "",
      isrc: preparedFileData.isrc || "",
      language: preparedFileData.language || "",
      lyricist: preparedFileData.lyricist || "",
      mime_type: preparedFileData.mime_type || "",
      obscene: preparedFileData.obscene || false,
      publisher: preparedFileData.publisher || "",
      title: preparedFileData.title || "",
      year: preparedFileData.year || 0,
      duration: preparedFileData.duration || 0,
      size: file.size || 0,
      uuid: preparedFileData.uuid || "",
    },
  };
};

//  конвертирует IAudioMetadata в формат MediaFile
export const metadataToMediaInfo = (
  metadata: mmb.IAudioMetadata
): Partial<MediaFile> => {
  return {
    album: metadata.common.album || "",
    artist: metadata.common.artist || "",
    bpm: metadata.common.bpm || "",
    composer: metadata.common.composer || "",
    genre: metadata.common.genre || "",
    isrc: metadata.common.isrc || "",
    language: metadata.common.language || "",
    lyricist: metadata.common.lyricist || "",
    publisher: metadata.common?.label?.join(", ") || "",
    title: metadata.common.title || "",
    year: metadata.common.year || 0,
    duration: metadata.format.duration || 0,
  } as Partial<MediaFile>;
};
