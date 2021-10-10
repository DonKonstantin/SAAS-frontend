import {CarrierLoader} from "./CarrierLoader";

export const carriersLoader: {(token?: string): CarrierLoader} = token => {
    return new CarrierLoader(token)
}