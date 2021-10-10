import {TnvedCodeLoader} from "./TnvedCodeLoader";

export const tnvedCodeLoader: { (token?: string): TnvedCodeLoader } = token => {
    return new TnvedCodeLoader(token)
};