import React, { FC, memo } from "react";
import ListHeaderCellWithOrder from "./ListHeaderCellWithOrder";
import ListHeaderCellWithoutOrder from "./ListHeaderCellWithoutOrder";
import { ListHeaderCellType } from "./types";

/**
 * Компонент ячейки заголовка кастомного листинга
 * @param props
 * @returns
 */
const ListHeaderCell: FC<ListHeaderCellType> = (props) => {
  const { isSortable } = props;

  if (isSortable) {
      return <ListHeaderCellWithOrder {...props} />
  }

  return <ListHeaderCellWithoutOrder {...props} />
};

export default memo(ListHeaderCell);
