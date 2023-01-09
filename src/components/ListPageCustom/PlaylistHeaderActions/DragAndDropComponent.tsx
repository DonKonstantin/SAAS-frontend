import React, {FC, memo, useCallback, useState} from "react";
import { Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { onDropHandler } from "./helpers";
import { ExportedPlaylistType } from "services/projectPlaylistService/interfaces";
import ExportBlock from "./ExportBlock";
import ExportResultBlock from "./ExportResultBlock";
import { styled } from "@mui/system";
import {useEntityList} from "../../../context/EntityListContext";
import {distinctUntilChanged} from "rxjs";

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
});

/**
 * Компонент обработки экспорта плэйлистов
 * @param param0
 * @returns
 */
const DragAndDropComponent: FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();

  const [showResult, setShowResult] = useState<boolean>(false);
  const [dropedPlaylistList, setDropedPlaylistList] =
    useState<ExportedPlaylistType>({});
  const [notAvailables, setNotAvailables] = useState<string[]>([]);
  const { reloadedListingData } = useEntityList(
    distinctUntilChanged(() => true)
  );

  const onCloseHandle = useCallback(() => {
    reloadedListingData()
    onClose()
  }, [onClose, reloadedListingData]);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    onDropHandler(
      acceptedFiles,
      setDropedPlaylistList,
      t,
      onCloseHandle,
      setNotAvailables,
      setShowResult,
    );
  };

  return (
    <StyledPaper>
      {!showResult && <ExportBlock onClose={onClose} onDrop={onDrop} />}
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
