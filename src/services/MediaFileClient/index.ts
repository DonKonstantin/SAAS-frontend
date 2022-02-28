import MediaFileClient from "./MediaFileClient";
import {MediaFileClientInterface} from "./interface";
import {getAuthorizationToken} from "../../context/AuthorizationContext";
import getConfig from "next/config";
import {Axios} from "axios";

const getMainLink = () => {
    const {publicRuntimeConfig} = getConfig();

    return `${publicRuntimeConfig.mediaLibraryEndPoint}api/${publicRuntimeConfig.mediaLibraryApiVersion}`
}

// Factory for job with files
const mediaFileClient: { (): MediaFileClientInterface } = () => {
    const token = getAuthorizationToken();

    return new MediaFileClient(
        getAuthorizationToken(),
        new Axios({
            baseURL: getMainLink(),
            headers: {
                "Authorization": `${token}`
            }
        })
    );
}

export default mediaFileClient;
