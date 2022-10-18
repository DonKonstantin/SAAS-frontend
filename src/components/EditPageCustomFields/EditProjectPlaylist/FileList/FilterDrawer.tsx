import React, { ChangeEvent, FC } from "react";
import { CSSObject, styled } from "@mui/material/styles";
import {
  Divider,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
} from "@mui/material";
import clsx from "clsx";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import { FilterFields } from ".";

const drawerWidth = 350;

// Стилизованный Box для основного контента
const Main = styled(Box, { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    height: "100vh",
  },
});

const StyledFilterWrapper = styled('div')({
  padding: 24, 
  flex: "1 1 0", 
  overflowY: "auto",
});

// Компонент вывода подвала меню
const DrawerFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// Миксин переворачивания кнопки меню
const transformMixin = (): CSSObject => ({
  transform: "rotate(180deg)",
});

// Компонент вывода переворачиваемой кнопки в левом меню
const MenuButton = styled(IconButton)(() => ({
  "&.closed": transformMixin(),
}));

// Свойства компонента
type FilterDrawerProps = {
  isOpen: boolean;
  filterValues: FilterFields;
  onChangeOpen: VoidFunction;
  onResetFilterValues: VoidFunction;
  setFilterValues: (values: FilterFields) => void;

  children: React.ReactNode;
};

// Компонент вывода панели фильтра
const FilterDrawer: FC<FilterDrawerProps> = (props) => {
  const {
    isOpen,
    children,
    filterValues,
    onChangeOpen,
    onResetFilterValues,
    setFilterValues,
  } = props;

  const { t } = useTranslation();

  const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setFilterValues({ ...filterValues, name: value });
  };

  return (
    <>
      <Main open={isOpen}>{children}</Main>
      <StyledDrawer
        variant="persistent"
        anchor="right"
        open={isOpen}
      >
        <StyledFilterWrapper>
          <Box sx={{ pb: 3 }}>
            <Typography color="primary">Параметры фильтрации</Typography>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={filterValues.name}
                  onChange={onNameChangeHandler}
                  sx={{ width: "100%" }}
                  variant="standard"
                  label={t("project-playlists.edit.list.header.track-name")}
                />
              </Grid>
              <Grid item xs={12}>
                <Tooltip
                  title={
                    t(
                      `entity-list.components.filter.reset-button.tooltip`
                    ) as string
                  }
                >
                  <Button
                    sx={{ mt: 3 }}
                    variant={"outlined"}
                    fullWidth
                    onClick={onResetFilterValues}
                  >
                    {t(`entity-list.components.filter.reset-button.caption`)}
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </StyledFilterWrapper>
        <Divider />
        <DrawerFooter>
          <Tooltip
            title={
              t(
                `entity-list.components.filter.hide-button.${
                  isOpen ? "hide" : "show"
                }`
              ) as string
            }
          >
            <MenuButton
              color="primary"
              className={clsx({ closed: !isOpen })}
              onClick={onChangeOpen}
            >
              <ChevronRightIcon />
            </MenuButton>
          </Tooltip>
        </DrawerFooter>
      </StyledDrawer>
    </>
  );
};

// Экспортируем компонент
export default FilterDrawer;
