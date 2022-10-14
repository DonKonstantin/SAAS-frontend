import React, { FC, useState } from "react";
import { Box } from "@mui/system";
import { IconButton, Paper, Tooltip } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import FilterDrawer from "./FilterDrawer";
import { useEntityEdit } from "context/EntityEditContext";
import LoadingBlocker from "components/LoadingBlocker";
import Filter from "components/ListPageParts/Filter";
import ListPagePagination from "components/ListPageParts/ListPagePagination";
import List from "components/ListPageParts/List";
import DeleteDialog from "components/ListPageParts/DeleteDialog";

// Компонент вывода страницы листинга
const FileList: FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);

  const { entityData } = useEntityEdit();

  const { t } = useTranslation();

  if (!entityData) {
    return <LoadingBlocker />;
  }

  // Обработчик переключения фильтра
  const handleToggleFilter = () => {
    setIsFilterOpen((s) => !s);
  };

  const FilterIcon = isFilterOpen ? ChevronRightIcon : ChevronLeftIcon;
  const filterTooltip = `entity-list.components.filter.show-button.tooltip.${
    !isFilterOpen ? "show" : "hide"
  }`;
  return (
    <>
      <FilterDrawer
        isOpen={isFilterOpen}
        onChangeOpen={handleToggleFilter}
        filterContent={<Filter />}
      >
        <Box sx={{ pb: 3 }}>
          <Tooltip title={t(filterTooltip) as string}>
            <IconButton
              size="small"
              color="primary"
              onClick={handleToggleFilter}
            >
              <FilterIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2, p: 3 }}>
            <List checkedItems={selected} onChangeCheckedItems={setSelected} />
            <Box sx={{ pt: 1 }}>
              <ListPagePagination />
            </Box>
          </Paper>
          <DeleteDialog />
        </Box>
      </FilterDrawer>
    </>
  );
};

// Экспортируем компонент
export default React.memo(FileList, () => true);
