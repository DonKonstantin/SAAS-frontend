import React, { FC, MouseEventHandler } from "react";
import { SimpleValues } from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import { TableCell } from "@mui/material";
import { ListFieldProperties } from "../../services/listDataLoader/listLoader/types";
import columnDirection from "../ListPageParts/List/helpers/columnDirection";
import convertSimpleValueToString from "../ListPageParts/List/helpers/convertSimpleValueToString";
import Link from "../Link";
import { useAuthorization } from "../../context/AuthorizationContext";
import { useRouter } from "next/router";
import { getMenuItems } from "components/UILayer/LeftPanel/helpers";
import { distinctUntilChanged } from "rxjs";

// Компонент вывода простой ячейки
const ProjectSelectCell: FC<ListFieldProperties<SimpleValues>> = (props) => {
  const { schema, configuration, value, primaryKeyValue } = props;
  const {
    align = columnDirection(schema, configuration),
    width,
    padding,
  } = configuration;

  const router = useRouter();
  const { domain, userInfo, setProject } = useAuthorization(
    distinctUntilChanged(
      (prev, curr) =>
        prev.domain === curr.domain &&
        JSON.stringify(prev.userInfo) === JSON.stringify(curr.userInfo)
    )
  );
  const handleDomainClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setProject(primaryKeyValue);

    //  получаем список доступных пользователю пунктов меню для того что бы перейти на верхний пункт
    const menuItems = getMenuItems("project", userInfo!);

    const currentMenuPath =
      menuItems.length > 1 ? menuItems[1].pathName : menuItems[0].pathName;

    //  пушит на вкладку проекта по умолчанию
    return router.push(
      `/domain/[domainId]/project/[projectId]/${currentMenuPath}`,
      `/domain/${domain}/project/${primaryKeyValue}/${currentMenuPath}`
    );
  };

  return (
    <TableCell
      className="list-table-cell"
      padding={padding}
      style={{ width: width }}
      align={align}
    >
      <Link href="#" onClick={handleDomainClick}>
        {convertSimpleValueToString(schema, configuration, value)}
      </Link>
    </TableCell>
  );
};

// Экспортируем компонент
export default ProjectSelectCell;
