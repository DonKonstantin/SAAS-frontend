import {FC, useEffect, useState} from "react";
import {useEntityEdit} from "../../context/EntityEditContext";
import {distinctUntilChanged} from "rxjs";
import {EditPageConfiguration} from "../../settings/pages/system/edit";
import {editSchemaConfiguration} from "../../settings/pages";
import {useRouter} from "next/router";
import {Box, Fab, Grid, Tooltip} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {useTranslation} from "react-i18next";

/**
 * Хук необходим для того, чтоб корректно обработать зависимости, когда их нет.
 * Когда они есть, то возвращаются все необходимые callback для работы.
 */
const useActionButtons = () => {
    const router = useRouter()
    const [config, setConfig] = useState<EditPageConfiguration>()
    const {onSave, entityData, isActionInProgress} = useEntityEdit(distinctUntilChanged(
        (previous, current) => {
            return previous?.entityData?.schema === current?.entityData?.schema
        }
    ))

    useEffect(() => {
        if (!entityData) {
            return
        }

        const {schema} = entityData
        const conf = editSchemaConfiguration()[schema]
        if (!conf) {
            return
        }

        setConfig(conf as any)
    }, [entityData])

    if (!entityData || !config) {
        return undefined
    }

    const {primaryKey} = entityData
    const {listPageUrl, editPageUrlGenerator} = config

    // Обработка сохранения страницы
    const handleSave = async () => {
        if (isActionInProgress) {
            return
        }

        const newPrimaryKey = await onSave()
        if (!newPrimaryKey || newPrimaryKey === primaryKey) {
            return
        }

        const url = editPageUrlGenerator(newPrimaryKey)

        return router.replace(url.href, url.as)
    }

    // Обработка сохранения страницы с копированием элемента
    const handleSaveWithCopy = async () => {
        if (isActionInProgress) {
            return
        }

        const newPrimaryKey = await onSave(true)
        if (!newPrimaryKey) {
            return
        }

        const url = editPageUrlGenerator(newPrimaryKey)

        return router.replace(url.href, url.as)
    }

    // Обработка закрытия страницы
    const handleClose = () => {
        if (isActionInProgress) {
            return
        }

        return router.push(listPageUrl.href, listPageUrl.as)
    }

    // Обработка сохранения элемента и закрытия страницы
    const handleSaveAndClose = async () => {
        if (isActionInProgress) {
            return
        }

        const newPrimaryKey = await onSave(true)
        if (!newPrimaryKey) {
            return
        }

        return router.push(listPageUrl.href, listPageUrl.as)
    }

    return {
        isActionInProgress,
        handleSave,
        handleSaveWithCopy,
        handleClose,
        handleSaveAndClose
    }
}

// Компонент вывода кнопок управления формой
const ActionButtons: FC = () => {
    const {t} = useTranslation()
    const actionsCtx = useActionButtons()

    // Доабавляет обработку нажатия клавиш
    useEffect(() => {
        const listener = (event: DocumentEventMap['keydown']) => {
            if (!event.ctrlKey || !actionsCtx) {
                return
            }

            const {handleClose, handleSaveWithCopy, handleSaveAndClose, handleSave} = actionsCtx
            switch (true) {
                case event.ctrlKey && event.shiftKey && ["x", "ч"].includes(event.key.toLowerCase()):
                    event.preventDefault()
                    return handleClose()
                case event.ctrlKey && event.shiftKey && ["c", "с"].includes(event.key.toLowerCase()):
                    event.preventDefault()
                    return handleSaveWithCopy()
                case event.ctrlKey && event.shiftKey && ["s", "ы"].includes(event.key.toLowerCase()):
                    event.preventDefault()
                    return handleSaveAndClose()
                case event.ctrlKey && ["s", "ы"].includes(event.key.toLowerCase()):
                    event.preventDefault()
                    return handleSave()

            }
        }

        document.addEventListener("keydown", listener)
        return () => {
            document.removeEventListener("keydown", listener)
        }
    }, [actionsCtx])

    if (!actionsCtx) {
        return null
    }

    const {
        isActionInProgress,
        handleClose,
        handleSaveWithCopy,
        handleSaveAndClose,
        handleSave,
    } = actionsCtx

    return (
        <Box sx={{position: "fixed", bottom: 36, right: 36}}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Tooltip placement="top" title={t(`entity-edit.actions.save`) as string}>
                        <div>
                            <Fab
                                size="medium"
                                disabled={isActionInProgress}
                                color="primary"
                                onClick={handleSave}
                            >
                                <SaveIcon/>
                            </Fab>
                        </div>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip placement="top" title={t(`entity-edit.actions.copy`) as string}>
                        <div>
                            <Fab
                                size="medium"
                                disabled={isActionInProgress}
                                color="primary"
                                onClick={handleSaveWithCopy}
                            >
                                <ContentCopyIcon/>
                            </Fab>
                        </div>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip placement="top" title={t(`entity-edit.actions.save-and-close`) as string}>
                        <div>
                            <Fab
                                size="medium"
                                disabled={isActionInProgress}
                                color="primary"
                                onClick={handleSaveAndClose}
                            >
                                <SaveAltIcon/>
                            </Fab>
                        </div>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip placement="top" title={t(`entity-edit.actions.close`) as string}>
                        <div>
                            <Fab
                                size="large"
                                disabled={isActionInProgress}
                                color="secondary"
                                onClick={handleClose}
                            >
                                <CloseIcon/>
                            </Fab>
                        </div>
                    </Tooltip>
                </Grid>
            </Grid>
        </Box>
    )
}

// Экспортируем компонент
export default ActionButtons