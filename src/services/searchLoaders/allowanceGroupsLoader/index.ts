import {AllowanceGroupLoader} from "./AllowanceGroupLoader";

export const allowanceGroupsLoader: {(token?: string): AllowanceGroupLoader} = token => {
    return new AllowanceGroupLoader(token)
}