import { Box, Grid, Paper } from "@mui/material";
import React, { FC, memo, useEffect, useState } from "react";
import Breadcrumbs from "components/Breadcrumbs";
import useCampaignClipsListPage from "./context/hooks";
import { List } from "components/List";
import { ListHeaderCellType } from "components/List/types";
import ListRowComponent from "./ListRowComponent";
import { useTranslation } from "react-i18next";
import TableCaption from "./TableCaption";
import ListPagePagination from "./ListPagePagination";
import DeleteDialog from "./DeleteDialog";
import LoadingBlocker from "components/LoadingBlocker";
import { ClipListItemType } from "./context/types";

interface Props {
  projectId: string;
}

const headerCells: Omit<ListHeaderCellType, "setSort" | "sorted">[] = [
  {
    name: 'name',
    title: 'campaign-clips-list.list.header-cells.name',
    align: 'left',
    isSortable: true,
    sx: {
      padding: 0,
      width: 250,
    },
  },
  {
    name: 'play',
    title: '',
    align: 'left',
    isSortable: false,
    sx: {
      padding: 0,
      width: 72,
    },
  },
  {
    name: 'createDate',
    title: 'campaign-clips-list.list.header-cells.create-date',
    align: 'left',
    isSortable: true,
    sx: {
      padding: 0,
      width: 150,
    },
  },
  {
    name: 'emptySpace',
    title: '',
    align: 'left',
    isSortable: false,
    sx: {
      padding: 0,
      width: '100%',
    },
  },
  {
    name: 'actions',
    title: '',
    align: 'left',
    isSortable: false,
    sx: {
      padding: 0,
      width: 150,
    },
  },
];

/**
 * Компонент страницы листинга роликов проекта
 * @param param0
 * @returns
 */
const CampaignClipsListPage: FC<Props> = ({ projectId }) => {
  const { t } = useTranslation();

  const {
    actions: {
      setProjctId,
      setSortParams,
      onChangeListPage,
      onChangeLimit,
      removeClips,
    },

    useIsLoading,
    useTableRows,
    useSort,
    usePages,
    usePageLimit,
    useClipsCount,
    useIsLocalLoading,
  } = useCampaignClipsListPage();

  const isLoading = useIsLoading();
  const isLocalLoading = useIsLocalLoading();
  const tableRows = useTableRows();
  const sortParams = useSort();
  const pages = usePages();
  const limit = usePageLimit();
  const clipsCount = useClipsCount();

  const [selected, setSelected] = useState<ClipListItemType[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const onRemoveGroupeHandler = async () => {
    setIsDeleteDialogOpen(false);

    removeClips(selected);

    setSelected([]);
  };

  const onCloseDeleteDialogHandler = () => {
    setIsDeleteDialogOpen(false);
  };

  const onOpenDeleteDialogHandler = () => {
    setIsDeleteDialogOpen(true);
  };

  useEffect(() => {
    setProjctId(projectId);
  }, []);

  if (isLoading) {
    return <LoadingBlocker />;
  }

  return (
    <>
      <Box sx={{ pb: 3 }}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item sx={{ flex: "1 1 0" }}>
            <Breadcrumbs />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2, p: 3 }}>
          <TableCaption
            checkedItems={selected}
            header={t("campaign-clips-list.list.header")}
            isLoading={isLocalLoading}
            onRemoveGroupe={onOpenDeleteDialogHandler}
          />

          <List
            checkedItems={selected}
            headerCells={headerCells}
            tableRows={tableRows}
            sort={sortParams}
            rowCellsComponent={ListRowComponent}
            setSort={setSortParams}
            onChangeCheckedItems={setSelected}
          />

          <Box sx={{ pt: 1 }}>
            <ListPagePagination
              listPage={pages}
              limit={limit}
              rowsCount={clipsCount}
              onChangeListPage={onChangeListPage}
              onChangeLimit={onChangeLimit}
            />
          </Box>
        </Paper>

        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          selectedItemsCount={selected.length}
          onClose={onCloseDeleteDialogHandler}
          onSubmit={onRemoveGroupeHandler}
        />
      </Box>
    </>
  );
};

export default memo(CampaignClipsListPage);
