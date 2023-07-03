import React, {FC} from "react";
import {EditFormGroupProperties} from "../../../settings/pages/system/edit";
import {useEntityEdit} from "../../../context/EntityEditContext";
import {distinctUntilChanged} from "rxjs";
import {Button, Divider, Grid, Paper, Stack, Typography} from "@mui/material";
import {Box, styled} from "@mui/system";
import {useTranslation} from "react-i18next";
import {useActionButtons} from "../../EditPage/ActionButtons";


const StyledDivider = styled(Divider)(() => ({
  color: "#9F9F9F",
  borderColor: "#9F9F9F",
}))

// Компонент вывода группы личных данных пользователя
const ProjectChannelGroup: FC<EditFormGroupProperties> = ({config}) => {
  const {fields, isVisible = () => true, sizes = {xs: 12}} = config
  const {t} = useTranslation()
  const {entityData} = useEntityEdit(distinctUntilChanged())
  if (!entityData) {
    return null
  }

  const actionCtx = useActionButtons();

  if (!actionCtx) {
    return null
  }

  const {values} = entityData
  if (!isVisible(values)) {
    return null
  }

  const {
    isActionInProgress,
    handleSave,
  } = actionCtx

  return (
    <Grid item {...sizes}>
      <Paper sx={{width: '100%', px: 5, py: 2.5}}>
        <Box sx={{pl: 1.25}}>
          <Typography color="primary">{t(`pages.project_channel.edit.header`)}</Typography>
        </Box>
        <StyledDivider sx={{mt: 4, mb: 2}}/>
        <Grid container spacing={2} sx={{mt: 0}} alignItems={'center'}>
          {fields.map(({field, title, component: Component}) => {
            // @ts-ignore
            if (field === 'project_id') {
              return null
            }

            return (
              <React.Fragment key={`${field}-grid`}>
                <Grid item xs={12} md={2.5} sx={{maxWidth: '330px'}}>{t(title)}</Grid>
                <Grid item xs={12} md={9.5}>
                  <Component key={field} fieldCode={field}/>
                </Grid>
              </React.Fragment>
            )
          })}
        </Grid>
        <StyledDivider sx={{my: 2}}/>
        <Stack alignItems={"flex-end"}>
          <Button
            disabled={isActionInProgress}
            variant="outlined"
            onClick={() => handleSave()}
          >{t(`pages.project_channel.edit.button.Save`)}</Button>
        </Stack>
      </Paper>
    </Grid>
  )
}

// Экспортируем компонент
export default ProjectChannelGroup
