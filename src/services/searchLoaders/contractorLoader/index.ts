import {ContractorLoader} from "./ContractorLoader";

export const contractorLoader: {(token?: string): ContractorLoader} = token => {
    return new ContractorLoader(token)
}