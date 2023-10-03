import React, { FC, useCallback } from "react";
import { useCheckMediaFilesContext } from "./CheckMediaFilesContext";
import CheckMediaFilesItem from "./CheckMediaFilesItem";
import { Alert, Box, Skeleton, Stack } from "@mui/material";
import CheckMediaFilesInput from "./CheckMediaFilesInput";
import ConfirmDoubleDialog from "./ConfirmDoubleDialog";

const CheckMediaFilesList: FC = () => {
  const {
    fileCheckResult,
    isChecked,
    isError,
    isCheckProgress,
    excludeFromDouble,
  } = useCheckMediaFilesContext();

  const confirmNotDoubleHandler = useCallback(
    (fileName) => {
      excludeFromDouble(fileName)
    },
    []
  );

  if (isCheckProgress) {
    return (
      <Stack sx={{ pt: 2 }}>
        <Skeleton variant={"text"} height={36} />
        <Skeleton variant={"text"} height={36} />
        <Skeleton variant={"text"} height={36} />
        <Skeleton variant={"text"} height={36} />
        <Skeleton variant={"text"} height={36} />
        <Skeleton variant={"text"} height={36} />
      </Stack>
    )
  }

  if (isError) {
    return (
      <div>
        <Alert severity={"error"} sx={{ mt: 2 }}>Не удалось провести проверку</Alert>
      </div>
    )
  }

  if (!isChecked) {
    return (
      <CheckMediaFilesInput />
    )
  }



  return (
    <Box
      sx={{ overflowY: "auto", pt: 2 }}
    >
      <Stack>
        {fileCheckResult.map(file => (
          <CheckMediaFilesItem {...file} key={file.fileName} />
        ))}
      </Stack>
      <ConfirmDoubleDialog
        onConfirm={confirmNotDoubleHandler}
      />
    </Box>
  )
}

export default CheckMediaFilesList;
