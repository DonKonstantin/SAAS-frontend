import {getCurrentState} from "context/AuthorizationContext";
import {TFunction} from "react-i18next";
import mediaLibraryService from "services/MediaLibraryService";
import {MediaFilesDoubles} from "services/MediaLibraryService/interface";
import {notificationsDispatcher} from "services/notifications";
import projectPlaylistService from "services/projectPlaylistService";
import {ExportedPlaylistType} from "services/projectPlaylistService/interfaces";
import {makeInputPlaylists} from "../../../services/projectPlaylistService/helpers";

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
  onCloseHandle: () => void,
  setNotAvailables: (value: string[]) => void,
  setShowResult: (values: boolean) => void
) => {
  const notifications = notificationsDispatcher();

  const dropedList = JSON.parse(await acceptedFiles[0].text());
  const { project } = getCurrentState();

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


  const existsFiles = checkResul.filter((item) => !!item.doubles.length);

  // Запрашиваем плейлисты по названию
  const findCurrentsPlaylists = await projectPlaylistService().getPlaylistsByArrayName(Object.keys(dropedList), Number(project))

  // Создаем объекты плейлистов для создания
  const getToCreatedPlaylists = Object.keys(dropedList).reduce((acc, current) => {
    const findPlaylist = findCurrentsPlaylists.find(playlist => playlist.name === current)

    if (!findPlaylist) {
      acc[current] = dropedList[current]
    }

    return acc
  }, {})

  //Преобразовываем весь входящий JSON в плейлисты
  const getInputForPlaylist = makeInputPlaylists(
    dropedList,
    existsFiles,
    project
  );

  // Создаем массив с объектами плейлистов для редактирования и добавляем к нему id
  const getToUpdatePlaylists = findCurrentsPlaylists
    .map(playlist => {

    let findPlaylistForUpdate = getInputForPlaylist.find(list => list?.name === playlist.name)

    if (findPlaylistForUpdate) {
      return  {...findPlaylistForUpdate, id: Number(playlist.id)}
    }

    return null
  })
    .filter(playlist => !!playlist)

  try {
    const newPlaylists = await projectPlaylistService().storePlaylist(
      getToCreatedPlaylists,
      existsFiles,
      project
    );

    const updatedPlaylists = await Promise.all(
      getToUpdatePlaylists.map(async playlist => projectPlaylistService().storePlaylistChanges(playlist!))
    )

    const responses = newPlaylists.length + updatedPlaylists.length

    notifications.dispatch({
      message: t(
        `project-playlists.notifications.export-playlist.successfully-added.${
          responses > 1 ? "multiple" : "single"
        }`
      ),
      type: "success",
    });

    if (!noAvailableInStock.length) {
      onCloseHandle()
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
