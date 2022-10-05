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
import FilterDrawer from "./FilterDrawer";
import Filter from "../ListPageParts/Filter";
import {distinctUntilChanged} from "rxjs";
import {listSchemaConfiguration} from "../../settings/pages";

// Компонент вывода страницы листинга
const ListPage: FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selected, setSelected] = useState<any[]>([])

    const {data, setSchema, itemsToDelete} = useEntityList(
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

    useEffect(
        // При изменении удаляемых элементов сбрасываем список выбранные
        () => setSelected([]),
        [itemsToDelete]
    );

    if (!data) {
        return <LoadingBlocker/>
    }

    const config = listSchemaConfiguration()[data.schema]

    const ActionComponent = config?.action || undefined;
    // Обработчик переключения фильтра
    const handleToggleFilter = () => {
        setIsFilterOpen(s => !s)
    }

    const additionItemButtonTitle = config?.additionButtonTitle || undefined;

    const FilterIcon = isFilterOpen ? ChevronRightIcon : ChevronLeftIcon
    const filterTooltip = `entity-list.components.filter.show-button.tooltip.${!isFilterOpen ? "show" : "hide"}`
    return (
        <>
            <FilterDrawer
                isOpen={isFilterOpen}
                onChangeOpen={handleToggleFilter}
                filterContent={<Filter/>}
            >
                <Box sx={{pb: 3}}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item sx={{flex: "1 1 0"}}>
                            <Breadcrumbs/>
                        </Grid>
                        <Grid item>
                          {!config?.hideFilter && (
                                <Tooltip title={t(filterTooltip) as string}>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={handleToggleFilter}
                                    >
                                        <FilterIcon fontSize="medium"/>
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{width: '100%'}}>
                    <Paper sx={{width: '100%', mb: 2, p: 3}}>
                        <TableCaption checkedItems={selected}/>
                        <List
                            checkedItems={selected}
                            onChangeCheckedItems={setSelected}
                        />
                        <Box sx={{pt: 1}}>
                            <Grid
                                container
                                alignItems="center"
                                spacing={1}
                            >
                                <Grid item sx={{flex: "1 1 0"}}>
                                    {!config?.hidePagination && (
                                        <ListPagePagination/>
                                    )}
                                </Grid>
                                {ActionComponent && (
                                    <Grid item>
                                        <ActionComponent checkedItems={selected} />
                                    </Grid>
                                )}
                                {!ActionComponent && (
                                  <Grid item>
                                    <ListPageCreationButton buttonTitle={additionItemButtonTitle} />
                                  </Grid>
                                )}
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
export default React.memo(ListPage, () => true)
