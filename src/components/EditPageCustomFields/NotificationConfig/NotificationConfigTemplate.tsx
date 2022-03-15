import React, {FC, memo} from "react";
import {EditFieldProperties} from "../../../settings/pages/system/edit";
import {distinctUntilChanged} from "rxjs";
import useEntityEditField from "../../EditPage/Fields/useEntityEditField";
import {InputAdornment, MenuItem, TextField} from "@mui/material";

// Edit notification config ID template
const NotificationConfigTemplate: FC<EditFieldProperties> = (props) => {
    const {fieldCode} = props
    const fieldData = useEntityEditField(fieldCode, distinctUntilChanged());

    if (!fieldData) {
        return null;
    }

    const {
        t,
        value,
        additionData,
        fieldConfig: {title, isVisible = () => true, startIcon: IconComponent, validation: validators = []},
        values,
        validation,
        onChangeFieldValue,
    } = fieldData;

    const templateList = additionData?.id.availableTemplates || [];

    if (!isVisible(values) || templateList.length === 0) {
        return null;
    }

    return (
        <TextField
            label={t(title)}
            variant="standard"
            value={`${value}`}
            error={!!validation}
            helperText={validation ? t(validation) : undefined}
            fullWidth
            select
            required={validators.length > 0}
            onChange={event => {
                event.preventDefault()
                event.stopPropagation()

                onChangeFieldValue(() => event.target.value)
            }}
            InputProps={{
                startAdornment: IconComponent ? (
                    <InputAdornment position="start">
                        <IconComponent/>
                    </InputAdornment>
                ) : undefined,
            }}
        >
            {templateList.map(({id, name}) => <MenuItem value={id} key={id}>{name}</MenuItem>)}
        </TextField>
    )
}

export default memo(NotificationConfigTemplate, (prevProps, nextProps) => {
    return prevProps.fieldCode === nextProps.fieldCode
});
