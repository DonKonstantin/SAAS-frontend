import React, { FC, memo, useCallback, useState } from "react";
import { Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { onDropHandler } from "./helpers";
import { ExportedPlaylistType } from "services/projectPlaylistService/interfaces";
import ExportBlock from "./ExportBlock";
import ExportResultBlock from "./ExportResultBlock";
import { styled } from "@mui/system";
import { useEntityList } from "../../../context/EntityListContext";
import { distinctUntilChanged } from "rxjs";
import { notificationsDispatcher } from "services/notifications";

interface Props {
  onClose: VoidFunction;
}

const StyledPaper = styled(Paper)({
  padding: 40,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  maxHeight: "90vh",
});

/**
 * Компонент обработки экспорта плэйлистов
 * @param param0
 * @returns
 */
const DragAndDropComponent: FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();

  const [showResult, setShowResult] = useState<boolean>(false);
  const [dropedPlaylistList, setDropedPlaylistList] = useState<ExportedPlaylistType>({});
  const [notAvailables, setNotAvailables] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { reloadedListingData } = useEntityList(
    distinctUntilChanged(() => true)
  );

  const onCloseHandle = useCallback(() => {
    reloadedListingData();

    onClose();
  }, [onClose, reloadedListingData]);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    try {
      setIsLoading(true);
      
      await onDropHandler(
        acceptedFiles,
        setDropedPlaylistList,
        t,
        onCloseHandle,
        setNotAvailables,
        setShowResult,
      );
    } catch (error) {
      notificationsDispatcher().dispatch({
        message: t(
          "project-playlists.notifications.export-playlist.not-exported"
        ),
        type: "warning",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledPaper>
      {!showResult && (
        <ExportBlock
          onClose={onClose}
          onDrop={onDrop}
          isLoading={isLoading}
        />
      )}

      {showResult && (
        <ExportResultBlock
          onClose={onCloseHandle}
          dropedPlaylistList={dropedPlaylistList}
          notAvailables={notAvailables}
        />
      )}
    </StyledPaper>
  );
};

export default memo(DragAndDropComponent);
