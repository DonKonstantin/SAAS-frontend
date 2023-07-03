import {FC} from "react";
import {EditFieldProperties} from "../../../settings/pages/system/edit";
import useEntityEditField from "../../EditPage/Fields/useEntityEditField";
import {distinctUntilChanged} from "rxjs";
import {PermissionCategoryData} from "../../../services/loaders/allPermissionCategories/LoaderQuery";
import {PermissionData} from "../../../services/loaders/allPermissions/LoaderQuery";
import {AvailableLevelsForLevel} from "../../../services/helpers/CheckPermission";
import PermissionGroup from "./PermissionGroup";
import {Box, Divider, Table, TableBody, TableContainer, Typography} from "@mui/material";

// Компонент вывода селектора разрешений для ролей
const PermissionChooseSelector: FC<EditFieldProperties> = props => {
    const {fieldCode} = props
    const fieldData = useEntityEditField(fieldCode, distinctUntilChanged())

    if (!fieldData) {
        return null
    }

    const {t, additionData, value, values, validation, onChangeFieldValue} = fieldData
    const permissionsAndCategories = additionData[fieldCode] as {categories: PermissionCategoryData[], permissions: PermissionData[]}

    const categories = permissionsAndCategories.categories
        .filter(c => AvailableLevelsForLevel[values['level'] as any].includes(c.level))

    return (
        <>
            <Box sx={{p: 1.5, pl: 2, pt: 1}}>
                <Typography color={!!validation ? "error" : "primary"}>{t(`entity-edit.fields.permission-choose-selector.caption`)}</Typography>
                {!!validation && (
                    <Typography component="div" variant="caption" color="error">
                        {t(validation)}
                    </Typography>
                )}
            </Box>
            <Divider />
            <TableContainer>
                <Table>
                    <TableBody>
                        {categories.map(category => (
                            <PermissionGroup
                                key={category.id}
                                group={category}
                                permissions={permissionsAndCategories.permissions}
                                selected={value as string[]}
                                onChangeSelected={onChangeFieldValue as any}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

// Экспортируем компонент
export default PermissionChooseSelector