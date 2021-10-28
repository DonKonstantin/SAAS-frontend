import React, {FC, useState} from "react";
import {EditFormGroupProperties} from "../../settings/pages/system/edit";
import {useEntityEdit} from "../../context/EntityEditContext";
import {distinctUntilChanged} from "rxjs";
import {Divider, Grid, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {useTranslation} from "react-i18next";
import {RoleData} from "../../services/loaders/allRoles/LoaderQuery";
import {DomainData, ProjectData} from "../../services/loaders/allDomainsAndProjects/LoaderQuery";
import UserRolesTable from "./UserRolesTable";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

// Компонент вывода группы привязки ролей к пользователям
const UserRolesGroup: FC<EditFormGroupProperties> = ({config}) => {
    const {isVisible = () => true, sizes = {xs: 12}} = config
    const {t} = useTranslation()
    const {entityData, validation, onChangeFieldValue} = useEntityEdit(distinctUntilChanged())

    const [selectedUnassignedRoles, setSelectedUnassignedRoles] = useState<string[]>([])
    const [selectedAssignedRoles, setSelectedAssignedRoles] = useState<string[]>([])

    if (!entityData) {
        return null
    }

    const {values, additionData} = entityData
    if (!isVisible(values) || !additionData || !additionData['roles_id']) {
        return null
    }

    const roles = additionData['roles_id'].roles as RoleData[]
    const domains = additionData['roles_id'].domains as DomainData[]
    const projects = additionData['roles_id'].projects as ProjectData[]

    const assignedRoles = roles.filter(r => (values['roles_id'] as string[]).includes(r.id))
    const unassignedRoles = roles.filter(r => !(values['roles_id'] as string[]).includes(r.id))
    const rolesValidation = validation['roles_id']

    // Обработка присвоения ролей пользователю
    const handleAssignRoles = () => {
        onChangeFieldValue('roles_id', items => {
            return [...(items as string[]), ...selectedUnassignedRoles]
        })
        setSelectedUnassignedRoles([])
    }

    // Обработка удаления ролей у пользователя
    const handleUnassignRoles = () => {
        onChangeFieldValue('roles_id', items => {
            return (items as string[]).filter(i => !selectedAssignedRoles.includes(i))
        })
        setSelectedAssignedRoles([])
    }

    const titleColor = !rolesValidation ? "primary" : "error"
    return (
        <Grid item {...sizes}>
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', p: 3, pt: 2}}>
                    <Box sx={{p: 1.5, pl: 2, pt: 0}}>
                        <Typography color={titleColor} component="div">{t(`entity-edit.fields.user-roles-group.title`)}</Typography>
                        {!!rolesValidation && (
                            <Typography
                                color={titleColor}
                                component="div"
                                variant="caption"
                            >
                                {t(rolesValidation as string)}
                            </Typography>
                        )}
                    </Box>
                    <Divider/>
                    <Grid container spacing={0}>
                        <Grid item sx={{flex: "0 0 45%", overflow: "hidden", height: 278}}>
                            <UserRolesTable
                                roles={unassignedRoles}
                                domains={domains}
                                projects={projects}
                                selectedItems={selectedUnassignedRoles}
                                onChangeSelected={setSelectedUnassignedRoles}
                            />
                        </Grid>
                        <Grid item sx={{
                            flex: "0 0 10%",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <div>
                                <Tooltip title={t(`entity-edit.fields.user-roles-group.tooltips.assign`) as string}>
                                    <span>
                                        <IconButton
                                            disabled={selectedUnassignedRoles.length === 0}
                                            onClick={handleAssignRoles}
                                            color="primary"
                                        >
                                            <DoubleArrowIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip title={t(`entity-edit.fields.user-roles-group.tooltips.unassign`) as string}>
                                    <span>
                                        <IconButton
                                            disabled={selectedAssignedRoles.length === 0}
                                            onClick={handleUnassignRoles}
                                            color="primary"
                                            sx={{mt: 1}}
                                        >
                                            <DoubleArrowIcon sx={{transform: "rotate(180deg)"}} />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </div>
                        </Grid>
                        <Grid item sx={{flex: "0 0 45%", overflow: "hidden", height: 278}}>
                            <UserRolesTable
                                roles={assignedRoles}
                                domains={domains}
                                projects={projects}
                                selectedItems={selectedAssignedRoles}
                                onChangeSelected={setSelectedAssignedRoles}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Grid>
    )
}

// Экспортируем компонент
export default UserRolesGroup