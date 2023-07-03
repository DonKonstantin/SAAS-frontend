import {MediaLibraryServiceInterface} from "./interface";
import MediaLibraryService from "./MediaLibraryService";
import {graphQLClient} from "../graphQLClient";

//Factory for MediaLibraryService
const mediaLibraryService : {() : MediaLibraryServiceInterface} = () => {
    return new MediaLibraryService(
        graphQLClient()
    );
}

export default mediaLibraryService;
