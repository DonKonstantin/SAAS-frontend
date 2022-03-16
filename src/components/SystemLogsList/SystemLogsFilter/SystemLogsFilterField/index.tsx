import {FC, memo} from "react";
import {SystemLogsFilterFieldProps} from "../types";
import EqualStringField from "./EqualString";
import {SystemLogsFilterConfiguration} from "../../systemLogsFilterConfiguration";
import MultiVariantEnumSelector from "./MultiVariantEnumSelector";
import VariantEnumSelector from "./VariantEnumSelector";
import EqualDate from "./EqualDate";

const SystemLogsFilterField: FC<SystemLogsFilterFieldProps> = (props) => {
    const {
        fieldCode
    } = props;

    const fieldConfiguration = SystemLogsFilterConfiguration[fieldCode];

    if (!fieldConfiguration) {
        return <></>;
    }

    const {fieldType} = fieldConfiguration;

    switch (fieldType) {
        case "EqualString":
            return (<EqualStringField {...props}/>);
        case "MultiVariantEnumSelector":
            return (<MultiVariantEnumSelector {...props}/>);
        case "VariantEnumSelector":
            return (<VariantEnumSelector {...props}/>);
        case "EqualDate":
            return (<EqualDate {...props}/>);
        default:
            return (<></>)
    }

}

export default memo(
    SystemLogsFilterField,
    (prev, current) =>
        prev.fieldCode === current.fieldCode
);
