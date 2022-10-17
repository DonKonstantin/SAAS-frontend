import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import React, { FC, memo } from "react";

// Компонент пустой ячейки кнопок действий
const EmptyActions: FC<ListHeaderProps> = () => {
  return <></>;
};

// Экспортируем компонент
export default memo(EmptyActions)
