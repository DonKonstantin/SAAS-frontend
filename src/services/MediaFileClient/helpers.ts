import getConfig from "next/config";

export const getMainFileApiLink = () => {
    const {publicRuntimeConfig} = getConfig();

    return `${publicRuntimeConfig.mediaLibraryEndPoint}api/${publicRuntimeConfig.mediaLibraryApiVersion}`
}
