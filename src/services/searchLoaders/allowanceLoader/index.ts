import {AllowanceLoader} from "./AllowanceLoader";

export const allowanceLoader: {(token?: string): AllowanceLoader} = token => {
    return new AllowanceLoader(token)
}