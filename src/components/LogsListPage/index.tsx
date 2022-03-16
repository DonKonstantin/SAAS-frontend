import React, {FC, memo, useState} from "react";
import FilterDrawer from "../ListPage/FilterDrawer";
import {Box, Grid, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import Breadcrumbs from "../Breadcrumbs";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {useTranslation} from "react-i18next";
import LogsListTable from "./LogsListTable";
import LogsListTablePagination from "./LogsListTable/LogsListTablePagination";
import {useSystemLogsEntity} from "./SystemLogsEntityContext";
import LoadingBlocker from "../LoadingBlocker";
import TableListLoader from "./LogsListTable/TableListLoader";

const LogsListPage: FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const {t} = useTranslation();

    const handleToggleFilter = () => {
        setIsFilterOpen(s => !s)
    }

    const {entityItems} = useSystemLogsEntity();

    if (entityItems.length === 0) {
        return <LoadingBlocker/>
    }

    const FilterIcon = isFilterOpen ? ChevronRightIcon : ChevronLeftIcon
    const filterTooltip = `entity-list.components.filter.show-button.tooltip.${!isFilterOpen ? "show" : "hide"}`

    return (
        <FilterDrawer
            isOpen={isFilterOpen}
            filterContent={() => <div>Test filter</div>}
            onChangeOpen={handleToggleFilter}
        >
            <Box sx={{pb: 3}}>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item sx={{flex: "1 1 0"}}>
                        <Breadcrumbs/>
                    </Grid>
                    <Grid item>
                        <Tooltip title={t(filterTooltip) as string}>
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={handleToggleFilter}
                            >
                                <FilterIcon fontSize="medium"/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{pb: 3}}>
                <Paper sx={{width: '100%', mb: 2, p: 3}}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item sx={{flex: "1 1 0"}}>
                            <Typography variant="h6" color="primary" sx={{pl: 2}}>
                                {t("pages.SystemLogs.list.tableHeader")}
                            </Typography>
                        </Grid>
                        <TableListLoader/>
                    </Grid>
                    <LogsListTable/>
                    <Box sx={{pt: 1}}>
                        <Grid
                            container
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item sx={{flex: "1 1 0"}}>
                                <LogsListTablePagination/>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </FilterDrawer>
    )
}

export default memo(LogsListPage);
