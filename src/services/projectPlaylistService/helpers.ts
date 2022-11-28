import { MediaFilesDoubles } from "services/MediaLibraryService/interface";
import { ExportedPlaylistType } from "./interfaces";

/**
 * Создает объект плэйтиста для создания сущьности
 * @param playlists
 * @param playlistsFiles
 * @param projectId
 * @returns
 */
export const makeInputPlaylists = (
  playlists: ExportedPlaylistType,
  playlistsFiles: MediaFilesDoubles[],
  projectId: string
) => {
  const playlistsNames = Object.keys(playlists);

  const response = playlistsNames.map((name) => {
    const playlistFiles = playlists[name]
      .map((track) => playlistsFiles.find((item) => item.fileName === track))
      .filter((el) => !!el)
      .map((item) => {
        const media = item?.doubles[0];

        return {
          volume: 100,
          fileId: Number(media?.id),
          sort: 1,
        };
      });

    if (!playlistFiles.length) {
      return undefined;
    }

    return {
      files: playlistFiles,
      projectId: Number(projectId),
      name,
      isOverallVolume: true,
      overallVolume: 100,
    };
  });

  return response.filter((item) => !!item);
};
