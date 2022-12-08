import React, {FC, useEffect} from "react";
import {EditFieldProperties} from "../../settings/pages/system/edit";
import {useAuthorization} from "../../context/AuthorizationContext";
import {useEntityEdit} from "../../context/EntityEditContext";
import {LoaderQueryResponse} from "../../services/loaders/allDomainsAndProjects/LoaderQuery";
import {MenuItem, Tab, Tabs, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Box} from "@mui/system";
import { notificationsDispatcher } from "services/notifications";

// Селектор выбора уровня доступа для роли
const LevelCheckSelector: FC<EditFieldProperties> = props => {
    const {fieldCode} = props
    const {t} = useTranslation()
    const {entityData, validation, onChangeFieldValue} = useEntityEdit()
    const {userInfo, domain, project, menuType} = useAuthorization()

    if (!entityData || !userInfo) {
        return null
    }

    const {additionData, values} = entityData
    const {roles} = userInfo
    const domainsAndProjects = additionData[fieldCode] as LoaderQueryResponse

    const availableStructureIds = roles
        .filter(r => r.permissions.map(p => p.code).includes("EDIT_ROLES"))
        .map(r => r.structure_item_id)

    const isRealmAccess = availableStructureIds.includes("1")
    const availableDomains = domainsAndProjects.domains
        .filter(d => availableStructureIds.includes(d.id) || isRealmAccess)

    const domainIds = availableDomains.map(d => d.id)
    const availableProjects = domainsAndProjects.projects.filter(
        p => availableStructureIds.includes(p.id)
            || isRealmAccess
            || domainIds.includes(`${p.parent}`)
    )

    const projectIds = availableProjects.map(p => p.id)

    const domainsToChoose = availableDomains.filter(d => domain.length === 0 || (d.id === domain && project.length === 0))
    const projectsToChoose = availableProjects.filter(p => {
        if (isRealmAccess) {
            return true
        }

        if (menuType === `domain`) {
            return domainsToChoose.map(d => d.id).includes(`${p.parent}`)
        }

        return p.id === project
    })

    const isNeedShowRealm = menuType === `realm`
    const isNeedShowDomain = menuType === `domain` || menuType === `realm`

    useEffect(() => {
      if (values['level'] === "realm") {
        return
      }

      if (values['level'] === "domain" && !domainsToChoose.length) {
        notificationsDispatcher().dispatch({
          message: t('pages.role.error.load_domains'),
          type: 'warning',
        });

        return
      }

      if (!!projectsToChoose.length) {
        return
      }

      notificationsDispatcher().dispatch({
        message: t('pages.role.error.load_projects'),
        type: 'warning',
      });
    }, []);

    return (
        <Box sx={{flexGrow: 1, display: 'flex', height: 174}}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={values['level']}
                onChange={(_, value) => {
                    onChangeFieldValue('level', () => value)
                    onChangeFieldValue("permissions_id", () => [])
                    onChangeFieldValue(fieldCode, () => {
                        if (value === "realm") {
                            return "1"
                        }

                        return ""
                    })
                }}
                sx={{borderRight: 1, borderColor: 'divider', flex: "0 0 160px"}}
            >
                <Tab
                    label={t(`entity-edit.fields.level-check-selector.levels.realm`) as string}
                    value={"realm"}
                    disabled={!isNeedShowRealm}
                    id={`level-check-selector-realm`}
                />
                <Tab
                    label={t(`entity-edit.fields.level-check-selector.levels.domain`) as string}
                    value={"domain"}
                    disabled={!isNeedShowDomain}
                    id={`level-check-selector-domain`}
                />
                <Tab
                    label={t(`entity-edit.fields.level-check-selector.levels.project`) as string}
                    value={"project"}
                    id={`level-check-selector-project`}
                />
            </Tabs>
            {values['level'] === "realm" && (
                <Box sx={{p: 3, pt: 2, pb: 2, flex: "1 1 0"}}>
                    <Typography variant="caption">
                        {t(`entity-edit.fields.level-check-selector.level-descriptions.realm`)}
                    </Typography>
                </Box>
            )}
            {values['level'] === "domain" && (
                <Box sx={{p: 3, pt: 2, pb: 2, flex: "1 1 0"}}>
                    <Typography variant="caption">
                        {t(`entity-edit.fields.level-check-selector.level-descriptions.domain`)}
                    </Typography>
                    <TextField
                        label={t(`entity-edit.fields.level-check-selector.selectors.domain.label`) as string}
                        variant="standard"
                        sx={{mt: 2}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={domainIds.includes(`${values[fieldCode] || ""}`) ? values[fieldCode] : ""}
                        error={!!validation[fieldCode] && values['level'] === "domain"}
                        helperText={validation[fieldCode] && values['level'] === "domain" ? t(validation[fieldCode] as string) : undefined}
                        disabled={values['level'] !== "domain"}
                        fullWidth
                        select
                        onChange={event => {
                            event.preventDefault()
                            event.stopPropagation()

                            onChangeFieldValue(fieldCode, () => event.target.value)
                            onChangeFieldValue("permissions_id", () => [])
                        }}
                    >
                        <MenuItem value="">
                            <Typography variant="overline" sx={{p: 0}}>
                                {t(`entity-edit.fields.level-check-selector.selectors.domain.no-value`)}
                            </Typography>
                        </MenuItem>
                        {domainsToChoose.map(domain => (
                            <MenuItem value={domain.id} key={domain.id}>{domain.name}</MenuItem>
                        ))}
                    </TextField>
                </Box>
            )}
            {values['level'] === "project" && (
                <Box sx={{p: 3, pt: 2, pb: 2, flex: "1 1 0"}}>
                    <Typography variant="caption">
                        {t(`entity-edit.fields.level-check-selector.level-descriptions.project`)}
                    </Typography>
                    <TextField
                        label={t(`entity-edit.fields.level-check-selector.selectors.project.label`) as string}
                        variant="standard"
                        sx={{mt: 2}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={projectIds.includes(`${values[fieldCode] || ""}`) ? values[fieldCode] : ""}
                        error={!!validation[fieldCode] && values['level'] === "project"}
                        helperText={validation[fieldCode] && values['level'] === "project" ? t(validation[fieldCode] as string) : undefined}
                        disabled={values['level'] !== "project"}
                        fullWidth
                        select
                        onChange={event => {
                            event.preventDefault()
                            event.stopPropagation()

                            onChangeFieldValue(fieldCode, () => event.target.value)
                            onChangeFieldValue("permissions_id", () => [])
                        }}
                    >
                        <MenuItem value="">
                            <Typography variant="overline" sx={{p: 0}}>
                                {t(`entity-edit.fields.level-check-selector.selectors.project.no-value`)}
                            </Typography>
                        </MenuItem>
                        {projectsToChoose.map(project => (
                            <MenuItem value={project.id} key={project.id}>{project.name}</MenuItem>
                        ))}
                    </TextField>
                </Box>
            )}
        </Box>
    )
}

// Экспортируем компонент
export default LevelCheckSelector
