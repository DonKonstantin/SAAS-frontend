import React, {FC, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip} from "@mui/material";
import {Trans, useTranslation} from "react-i18next";
import {useEntityList} from "../../context/EntityListContext";
import {distinctUntilChanged} from "rxjs";

// Свойства компонента
type CopyButtonProps = {
    selected: string[]
    isDisabled: boolean
    onClick: {(): void}
}

// Компонент вывода кнопки копирования ролей
const CopyButton: FC<CopyButtonProps> = props => {
    const {isDisabled, selected, onClick} = props
    const {t} = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const count = selected.length
    const {isLoading} = useEntityList(distinctUntilChanged((previous, current) => {
        return previous.isLoading === current.isLoading
    }))

    return (
        <>
            <Tooltip title={t(`entity-list.components.actions.copy-tooltip`) as string}>
                <span>
                    <Button variant={"outlined"} onClick={() => setIsOpen(true)} disabled={isDisabled}>
                        {t(`entity-list.components.actions.copy`)}
                    </Button>
                </span>
            </Tooltip>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}
                    aria-labelledby="entity-list-copy-dialog-title">
                <DialogTitle
                    id="entity-list-copy-dialog-title">{t(`entity-list.components.copy-dialog.title`)}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Trans i18nKey="entity-list.components.copy-dialog.description" count={count}>
                            Вы точно хотите копировать элементы ({{count}} шт.)?
                        </Trans>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Tooltip title={t(`entity-list.components.copy-dialog.cancel-tooltip`) as string}>
                        <Button onClick={() => setIsOpen(false)} color="primary">
                            {t(`entity-list.components.copy-dialog.cancel`)}
                        </Button>
                    </Tooltip>
                    <Tooltip title={t(`entity-list.components.copy-dialog.submit-tooltip`) as string}>
                    <span>
                        <Button
                            onClick={onClick}
                            disabled={isLoading}
                            color="secondary"
                        >
                            <Trans i18nKey="entity-list.components.copy-dialog.submit" count={count}>
                                Копировать ({{count}})
                            </Trans>
                        </Button>
                    </span>
                    </Tooltip>
                </DialogActions>
            </Dialog>
        </>
    )
}

// Кнопка копирования ролей
export default CopyButton