import { TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/system";
import CheckBoxCell from "components/ListPageParts/List/CheckBoxCell";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import {CampaignChannels, ProjectChannel} from "services/playerCodeService/interfaces";

interface Props {
  row: ProjectChannel & CampaignChannels;
  checkedItems: string[];
  onChangeCheckedItems: (checkedItems: string[]) => void;
}

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

const StyledTypography = styled("span")({
  color: "#FFFFFF",
  fontSize: 10,
  lineHeight: 2.4,
});

/**
 * Компонент строки таблицы каналов на странице редактирования кампании
 * @param param0
 * @returns
 */
const ChannelRow: FC<Props> = ({ row, checkedItems, onChangeCheckedItems }) => {
  const { t } = useTranslation();

  const isChecked = checkedItems.includes(row.channel_id ?? row.id);

  const isActive = row.is_active;

  const onToggleItemCheckedState = () => {
    if (isChecked) {
      onChangeCheckedItems(checkedItems.filter((i) => i !== row.id ?? row.channel_id));

      return;
    }

    onChangeCheckedItems([...checkedItems, row.id ?? row.channel_id]);
  };

  return (
    <TableRow>
      <CheckBoxCell 
        checked={isChecked} 
        tooltipOnCheck={'player-list.tooltip.list.item.check'}
        tooltipOnUncheck={'player-list.tooltip.list.item.uncheck'}
        onClick={onToggleItemCheckedState} 
      />
      <TableCell>{row.name}</TableCell>
      <TableCell>
        <StyledBox bgColor={isActive}>
          <StyledTypography>
            {t(`player-list.status.${isActive}`)}
          </StyledTypography>
        </StyledBox>
      </TableCell>
      <TableCell>{row.players?.length}</TableCell>
    </TableRow>
  );
};

export default memo(ChannelRow);
