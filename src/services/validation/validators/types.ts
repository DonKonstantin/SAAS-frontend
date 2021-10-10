import {EditFieldValidator} from "../../../settings/pages/system/edit";
import {Schemas} from "../../../settings/schema";

export type ValidatorFactory<T> = {(params: T): EditFieldValidator<keyof Schemas>}