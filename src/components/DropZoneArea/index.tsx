import React, { FC, useEffect, useMemo } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";

type Props = {
  active?: boolean;
  iconSize?: number;
  customInputText?: string;
  height?: number;
  dropZonePadding?: number;
  messagePadding?: string;
  reverseCallbackErrors?(error: FileRejection[]): void
} & DropzoneOptions;

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // padding: '40px',
  borderWidth: 1,
  borderRadius: 3,
  borderColor: "#E5E5E5",
  borderStyle: "solid",
  backgroundColor: "#F5F5F5",
  color: "#F5F5F5",
  outline: "none",
  transition: "border .24s ease-in-out",
  backgroundImage:
    "repeating-linear-gradient(45deg, #D8D8D8 0, #D8D8D8 25px, #F5F5F5 25px, #F5F5F5 50px",
  backgroundSize: "150% 100%",
  backgroundPosition: "-70px 0",
  cursor: "pointer",
};

const activeStyle = {
  animation: "progress 5s linear infinite",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

/**
 * Component wrapper for styling dropArea
 * @param props
 */
const DropZoneArea: FC<Props> = (props) => {
  const {
    active = false,
    iconSize = 100,
    customInputText,
    height = 300,
    dropZonePadding = 40,
    messagePadding = "20px 24px 24px",
    reverseCallbackErrors,
    ...other
  } = props;

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, fileRejections } =
    useDropzone(other);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(active ? activeStyle : {}),
      height: `${height}px`,
      padding: `${dropZonePadding}px`,
    }),
    [isFocused, isDragAccept, isDragReject, active, height, dropZonePadding]
  );

  useEffect(() => {
    reverseCallbackErrors && reverseCallbackErrors(fileRejections)
  }, [reverseCallbackErrors, fileRejections])

  return (
    // @ts-ignore
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <Box
        sx={{
          maxWidth: 350,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 3,
          display: "flex",
          justifyContent: `center`,
          flexDirection: "column",
          textAlign: "center",
          p: messagePadding,
        }}
      >
        <Box sx={{ height: iconSize }}>
          <CloudUploadIcon color={"primary"} sx={{ fontSize: iconSize }}/>
        </Box>
        <Typography color={"primary"} sx={{whiteSpace: 'pre-line'}}>
          {!!customInputText?.length
            ? customInputText
            : "Переместите \n файлы для загрузки"}
        </Typography>
      </Box>
    </div>
  );
};

export default DropZoneArea;
