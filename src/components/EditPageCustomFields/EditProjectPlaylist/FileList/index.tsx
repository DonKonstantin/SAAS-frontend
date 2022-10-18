import React, { FC, memo, useEffect, useState } from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import FilterDrawer from "./FilterDrawer";
import { useEntityEdit } from "context/EntityEditContext";
import LoadingBlocker from "components/LoadingBlocker";
import List from "./List";
import { SortDirection } from "./List/ListHeader";
import { ProjectPlayListFile } from "services/projectPlaylistService/interfaces";
import ListPagination from "./List/ListPagination";
import { distinctUntilKeyChanged } from "rxjs";
import { styled } from "@mui/system";

export interface FilterFields {
  name: string;
}

const StyledFilterButton = styled('div')({
  position: "absolute", 
  top: 21, 
  right: 29,
});

// Компонент вывода страницы листинга файлов на странице редактирования плэйлиста
const FileList: FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);
  const [direction, setDirection] = useState<SortDirection>("asc");
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filterValues, setFilterValues] = useState<FilterFields>({ name: "" });
  const [filteredRows, setFilteredRows] = useState<ProjectPlayListFile[]>([]);

  const { entityData } = useEntityEdit(distinctUntilKeyChanged('entityData'));

  const { t } = useTranslation();

  if (!entityData) {
    return <LoadingBlocker />;
  }

  const {
    additionData: {
      id: { files },
    },
  } = entityData;

  // Обработчик переключения фильтра
  const handleToggleFilter = () => {
    setIsFilterOpen((s) => !s);
  };

  const onResetFilterValues = () => {
    setFilterValues({ name: "" });
  };

  const FilterIcon = isFilterOpen ? ChevronRightIcon : ChevronLeftIcon;
  const filterTooltip = `entity-list.components.filter.show-button.tooltip.${
    !isFilterOpen ? "show" : "hide"
  }`;

  useEffect(() => {
    setFilteredRows(files);
  }, []);

  useEffect(() => {
    setFilteredRows((values) =>
      values.sort((a, b) => {
        const aValue = a.file.title as string;
        const bValue = b.file.title as string;

        if (direction === "desc") {
          return bValue.localeCompare(aValue);
        }

        return aValue.localeCompare(bValue);
      })
    );
  }, [direction]);

  useEffect(() => {
    setFilteredRows(
      files.filter((file) => file.file.title.includes(filterValues.name))
    );
  }, [filterValues]);

  useEffect(() => {
    setFilteredRows(
      files
        .filter((file) => file.file.title.includes(filterValues.name))
        .sort((a, b) => {
          const aValue = a.file.title as string;
          const bValue = b.file.title as string;

          if (direction === "desc") {
            return bValue.localeCompare(aValue);
          }

          return aValue.localeCompare(bValue);
        })
    );
  }, [entityData, setFilteredRows]);

  return (
    <>
      <FilterDrawer
        isOpen={isFilterOpen}
        onChangeOpen={handleToggleFilter}
        onResetFilterValues={onResetFilterValues}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      >
        <StyledFilterButton>
          <Tooltip title={t(filterTooltip) as string}>
            <IconButton
              size="small"
              color="primary"
              onClick={handleToggleFilter}
            >
              <FilterIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </StyledFilterButton>
        <Box sx={{ width: "100%" }}>
          <List
            selected={selected}
            setSelected={setSelected}
            rows={filteredRows}
            direction={direction}
            setDirection={setDirection}
          />
          <Box sx={{ pt: 1 }}>
            <ListPagination
              offset={offset}
              limit={limit}
              count={filteredRows.length}
              onChangeOffset={setOffset}
              onChangeLimit={setLimit}
            />
          </Box>
        </Box>
      </FilterDrawer>
    </>
  );
};

// Экспортируем компонент
export default memo(FileList);
