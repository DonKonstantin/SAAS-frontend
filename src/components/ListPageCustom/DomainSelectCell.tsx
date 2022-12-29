import React, { FC, MouseEventHandler } from "react";
import { SimpleValues } from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import { TableCell } from "@mui/material";
import { ListFieldProperties } from "../../services/listDataLoader/listLoader/types";
import columnDirection from "../ListPageParts/List/helpers/columnDirection";
import convertSimpleValueToString from "../ListPageParts/List/helpers/convertSimpleValueToString";
import Link from "../Link";
import { useAuthorization } from "../../context/AuthorizationContext";
import { useRouter } from "next/router";
import { distinctUntilKeyChanged } from "rxjs";

// Компонент вывода простой ячейки
const DomainSelectCell: FC<ListFieldProperties<SimpleValues>> = (props) => {
  const { schema, configuration, value, primaryKeyValue } = props;
  const {
    align = columnDirection(schema, configuration),
    width,
    padding,
  } = configuration;

  const router = useRouter();

  const { setDomain, userInfo } = useAuthorization(
    distinctUntilKeyChanged("userInfo")
  );

  const handleDomainClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    event.stopPropagation();

    setDomain(primaryKeyValue);

    const hasPermisson = !!userInfo?.roles
      .flatMap((item) => item.permissions)
      .find((el) => el.code === "READ_PROJECT");

    const routeEnd = hasPermisson ? "project" : "";

    return router.push(
      `/domain/[domainId]/${routeEnd}`,
      `/domain/${primaryKeyValue}/${routeEnd}`
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
export default DomainSelectCell;
