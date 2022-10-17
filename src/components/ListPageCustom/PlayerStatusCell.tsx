import { styled } from "@mui/system";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { SimpleValues } from "services/listDataLoader/listLoader/listValues/SimpleValues";
import { ListFieldProperties } from "services/listDataLoader/listLoader/types";
import { TableCell } from "@mui/material";

const StyledBox = styled("div")<{ bgColor: boolean }>(({ theme, bgColor }) => ({
  borderRadius: 3,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  padding: "0 7px",
  width: 70,
  backgroundColor: !!bgColor
    ? theme.palette.primary.main
    : theme.palette.error.main,
}));

const StyledTypography = styled('span')({
  color: "#FFFFFF",
  fontSize: 10,
  lineHeight: 2.4,
});

/**
 * Компонет ячейки статуса плеера для листинга плееров
 * @param param0 
 * @returns 
 */
const PlayerStatusCell: FC<ListFieldProperties<SimpleValues>> = ({
  value,
  configuration,
}) => {
  const { padding, width, align } = configuration;

  const { t } = useTranslation();

  return (
    <TableCell
      className="list-table-cell"
      padding={padding}
      style={{ width: width }}
      align={align}
    >
      <StyledBox bgColor={value.value}>
        <StyledTypography>
          {t(`player-list.status.${value.value}`)}
        </StyledTypography>
      </StyledBox>
    </TableCell>
  );
};

export default memo(PlayerStatusCell);
