import React, {FC} from "react";
import {EditFieldProperties} from "../../settings/pages/system/edit";
import {useAuthorization} from "../../context/AuthorizationContext";
import {useEntityEdit} from "../../context/EntityEditContext";
import {LoaderQueryResponse} from "../../services/loaders/allDomainsAndProjects/LoaderQuery";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {useTranslation} from "react-i18next";

// Селектор выбора уровня доступа для роли
const LevelCheckSelector: FC<EditFieldProperties> = props => {
    const {fieldCode} = props
    const {t} = useTranslation()
    const {entityData, validation, onChangeFieldValue} = useEntityEdit()
    const {userInfo} = useAuthorization()

    if (!entityData || !userInfo) {
        return null
    }

    const {additionData, values} = entityData
    const {roles} = userInfo
    const domainsAndProjects = additionData[fieldCode] as LoaderQueryResponse

    const availableStructureIds = roles
        .filter(r => r.permissions.map(p => p.code).includes("CHANGE_ROLES"))
        .map(r => r.structure_item_id)

    const isRealmAccess = availableStructureIds.includes("1")
    const availableDomains = domainsAndProjects.domains
        .filter(d => availableStructureIds.includes(d.id) || isRealmAccess)

    const isDomainAccess = isRealmAccess || availableDomains.length > 0
    const domainIds = availableDomains.map(d => d.id)
    const availableProjects = domainsAndProjects.projects.filter(
        p => availableStructureIds.includes(p.id)
            || isRealmAccess
            || domainIds.includes(`${p.parent}`)
    )

    const projectIds = availableProjects.map(p => p.id)

    return (
        <FormControl fullWidth component="fieldset">
            <FormLabel component="legend">{t(`entity-edit.fields.level-check-selector.title`)}</FormLabel>
            <RadioGroup
                value={values['level']}
                onChange={event => {
                    onChangeFieldValue('level', () => (event.target as HTMLInputElement).value)
                    onChangeFieldValue("permissions_id", () => [])
                    onChangeFieldValue(fieldCode, () => {
                        if ((event.target as HTMLInputElement).value === "realm") {
                            return "1"
                        }

                        return ""
                    })
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <FormControlLabel
                            value="realm"
                            control={<Radio/>}
                            disabled={!isRealmAccess}
                            label={t(`entity-edit.fields.level-check-selector.levels.realm`) as string}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            value="domain"
                            control={<Radio/>}
                            disabled={!isDomainAccess}
                            label={t(`entity-edit.fields.level-check-selector.levels.domain`) as string}
                        />
                        <TextField
                            label={t(`entity-edit.fields.level-check-selector.selectors.domain.label`) as string}
                            variant="standard"
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
                            {domainsAndProjects.domains.map(domain => (
                                <MenuItem value={domain.id} key={domain.id}>{domain.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            value="project"
                            control={<Radio/>}
                            label={t(`entity-edit.fields.level-check-selector.levels.project`) as string}
                        />
                        <TextField
                            label={t(`entity-edit.fields.level-check-selector.selectors.project.label`) as string}
                            variant="standard"
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
                            {domainsAndProjects.projects.map(project => (
                                <MenuItem value={project.id} key={project.id}>{project.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </RadioGroup>
        </FormControl>
    )
}

// Экспортируем компонент
export default LevelCheckSelector