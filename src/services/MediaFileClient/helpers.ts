import getConfig from "next/config";
import { MediaFile } from "services/MediaLibraryService/interface";
import { MediaFileWithoutLicense } from "./interface";

export const getMainFileApiLink = () => {
    const {publicRuntimeConfig} = getConfig();

    return `${publicRuntimeConfig.mediaLibraryEndPoint}api/${publicRuntimeConfig.mediaLibraryApiVersion}`
}

export const prepareFormdata = (file: File, mediaInfo: MediaFile): FormData => {
  const data = new FormData();

  data.append('file', file);

  Object.entries(mediaInfo).map(([field, value]) => {
      data.append(field, value as string)
  })

  return data;
}

export const prepareFormdataWithoutLicense = (file: File, mediaInfo: MediaFileWithoutLicense): FormData => {
  const data = new FormData();

  data.append('file', file);

  Object.entries(mediaInfo).map(([field, value]) => {
      data.append(field, value as string)
  })

  return data;
}