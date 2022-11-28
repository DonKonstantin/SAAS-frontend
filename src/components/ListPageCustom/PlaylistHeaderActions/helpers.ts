import { getCurrentState } from "context/AuthorizationContext";
import { TFunction } from "react-i18next";
import mediaLibraryService from "services/MediaLibraryService";
import { MediaFilesDoubles } from "services/MediaLibraryService/interface";
import { notificationsDispatcher } from "services/notifications";
import projectPlaylistService from "services/projectPlaylistService";
import { ExportedPlaylistType } from "services/projectPlaylistService/interfaces";

export const checksFileExists = (
  fileList: ExportedPlaylistType
): Promise<MediaFilesDoubles[]> => {
  const fileNames = Object.values(fileList).flatMap((item) => item);

  if (!fileNames.length) {
    return Promise.resolve([]);
  }

  return mediaLibraryService().findDoubles(fileNames);
};

export const onDropHandler = async (
  acceptedFiles: File[],
  setDropedPlaylistList: (value: ExportedPlaylistType) => void,
  t: TFunction,
  onClose: VoidFunction,
  setNotAvailables: (value: string[]) => void,
  setShowResult: (values: boolean) => void
) => {
  const notifications = notificationsDispatcher();

  const dropedList = JSON.parse(await acceptedFiles[0].text());

  setDropedPlaylistList(dropedList);

  const checkResul = await checksFileExists(dropedList);

  if (!checkResul.filter((item) => !!item.doubles.length).length) {
    notifications.dispatch({
      message: t("project-playlists.notifications.export-playlist.no-files"),
      type: "warning",
    });

    return;
  }

  const availableInStock = checkResul.filter((item) => !!item.doubles.length);

  const noAvailableInStock = checkResul.filter((item) => !item.doubles.length);

  setNotAvailables(noAvailableInStock.map((item) => item.fileName));

  if (!availableInStock.length) {
    notifications.dispatch({
      message: t(
        "project-playlists.notifications.export-playlist.no-available-in-stock"
      ),
      type: "warning",
    });

    setShowResult(true);

    return;
  }

  const { project } = getCurrentState();

  const existsFiles = checkResul.filter((item) => !!item.doubles.length);

  try {
    const response = await projectPlaylistService().storePlaylist(
      dropedList,
      existsFiles,
      project
    );

    notifications.dispatch({
      message: t(
        `project-playlists.notifications.export-playlist.successfully-added.${
          response.length > 1 ? "multiple" : "single"
        }`
      ),
      type: "success",
    });

    if (!noAvailableInStock.length) {
      onClose();
    }

    setShowResult(true);
  } catch (error) {
    notifications.dispatch({
      message: t(
        "project-playlists.notifications.export-playlist.not-exported"
      ),
      type: "warning",
    });
  }
};
