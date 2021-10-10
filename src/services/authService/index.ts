import {AuthService} from "./AuthService";
import {graphQLClient} from "../graphQLClient";
import {AuthServiceInterface} from "./interfaces";

export const authService: () => AuthServiceInterface = () => (
    new AuthService(graphQLClient)
)