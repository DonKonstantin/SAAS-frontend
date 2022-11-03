import MediaFileClient from "./MediaFileClient";
import {MediaFileClientInterface} from "./interface";
import {getAuthorizationToken} from "../../context/AuthorizationContext";
import {Axios} from "axios";
import {getMainFileApiLink} from "./helpers";



// Factory for job with files 
const mediaFileClient: { (): MediaFileClientInterface } = () => {
    const token = getAuthorizationToken();

    return new MediaFileClient(
        new Axios({
            baseURL: getMainFileApiLink(),
            headers: {
                "Authorization": `${token}`
            }
        })
    );
}

export default mediaFileClient;
