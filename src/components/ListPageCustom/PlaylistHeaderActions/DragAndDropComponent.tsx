import React, { FC, memo, useState } from "react";
import { Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { onDropHandler } from "./helpers";
import { ExportedPlaylistType } from "services/projectPlaylistService/interfaces";
import ExportBlock from "./ExportBlock";
import ExportResultBlock from "./ExportResultBlock";
import { styled } from "@mui/system";

interface Props {
  onClose: VoidFunction;
}

const StyledPaper = styled(Paper)({
  padding: 40,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
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

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    onDropHandler(
      acceptedFiles,
      setDropedPlaylistList,
      t,
      onClose,
      setNotAvailables,
      setShowResult
    );
  };

  return (
    <StyledPaper >
      {!showResult && <ExportBlock onClose={onClose} onDrop={onDrop} />}
      {showResult && (
        <ExportResultBlock
          onClose={onClose}
          dropedPlaylistList={dropedPlaylistList}
          notAvailables={notAvailables}
        />
      )}
    </StyledPaper>
  );
};

export default memo(DragAndDropComponent);
