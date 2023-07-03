import React, {FC, useEffect, useState} from "react";
import {Box} from "@mui/system";
import {Grid, IconButton, Paper, Tooltip} from "@mui/material";
import List from "../ListPageParts/List";
import DeleteDialog from "../ListPageParts/DeleteDialog";
import {useEntityList} from "../../context/EntityListContext";
import LoadingBlocker from "../LoadingBlocker";
import TableCaption from "../ListPageParts/TableCaption";
import ListPagePagination from "../ListPageParts/ListPagePagination";
import ListPageCreationButton from "../ListPageParts/ListPageCreationButton";
import Breadcrumbs from "../Breadcrumbs";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useTranslation} from "react-i18next";
import Filter from "../ListPageParts/Filter";
import {distinctUntilChanged} from "rxjs";
import FilterDrawer from "../ListPage/FilterDrawer";
import CopyButton from "./CopyButton";

// Компонент вывода страницы листинга
const ListPageWithCopy: FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selected, setSelected] = useState<any[]>([])
    const {data, setSchema, onCloneItems} = useEntityList(
        distinctUntilChanged((previous, current) => {
            const prevVal = previous.data ? 1 : 2
            const currentVal = current.data ? 1 : 2

            return prevVal === currentVal
        })
    )
    const {t} = useTranslation()

    useEffect(() => {
        // При размонтировании страницы очищаем загруженные данные
        return () => setSchema("" as any)
    }, [])

    useEffect(() => {
        setSelected([])
        setIsFilterOpen(false)
    }, [data?.schema])

    if (!data) {
        return <LoadingBlocker/>
    }

    // Обработчик переключения фильтра
    const handleToggleFilter = () => {
        setIsFilterOpen(s => !s)
    }

    const FilterIcon = isFilterOpen ? ChevronRightIcon : ChevronLeftIcon
    const filterTooltip = `entity-list.components.filter.show-button.tooltip.${!isFilterOpen ? "show" : "hide"}`
    return (
        <>
            <FilterDrawer
                isOpen={isFilterOpen}
                onChangeOpen={handleToggleFilter}
                filterContent={(
                    <Filter/>
                )}
            >
                <Box sx={{pb: 3}}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item sx={{flex: "1 1 0"}}>
                            <Breadcrumbs/>
                        </Grid>
                        <Grid item>
                            <Tooltip title={t(filterTooltip) as string}>
                                <IconButton size="small" color="primary" onClick={handleToggleFilter}>
                                    <FilterIcon fontSize="medium"/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{width: '100%'}}>
                    <Paper sx={{width: '100%', mb: 2, p: 3}}>
                        <TableCaption checkedItems={selected}/>
                        <List checkedItems={selected} onChangeCheckedItems={setSelected}/>
                        <Box sx={{pt: 1}}>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item sx={{flex: "1 1 0"}}>
                                    <ListPagePagination/>
                                </Grid>
                                <Grid item>
                                    <CopyButton
                                        selected={selected}
                                        isDisabled={selected.length === 0}
                                        onClick={() => onCloneItems(selected)}
                                    />
                                </Grid>
                                <Grid item>
                                    <ListPageCreationButton/>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                    <DeleteDialog/>
                </Box>
            </FilterDrawer>
        </>
    )
}

// Экспортируем компонент
export default React.memo(ListPageWithCopy, () => true)