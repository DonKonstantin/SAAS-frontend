import {ReduxStore} from "../ReduxStore";
import {Authorization} from "../stores/Authorization";

export type AuthorizationSelector = { (state: ReduxStore): Authorization }

export const authorizationSelector: AuthorizationSelector = (state: ReduxStore): Authorization => state.Authorization || {} as Authorization;
