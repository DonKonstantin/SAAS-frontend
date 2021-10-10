import {TransportTypesLoader} from "./TransportTypesLoader";

export const transportTypesLoader: {(token?: string): TransportTypesLoader} = token => {
    return new TransportTypesLoader(token)
}