import React, {FC, useRef} from "react";
import {SimpleValues} from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import {TableCell, Link as LinkUi} from "@mui/material";
import {ListFieldProperties} from "../../services/listDataLoader/listLoader/types";
import {useEntityList} from "context/EntityListContext";
import {listSchemaConfiguration} from "settings/pages";
import Link from "next/link";

/**
 * Компонент ячейки названия кампании со ссылкой на редактирование
 * @param props
 * @returns
 */
const CampaignNameWithLinkCell: FC<ListFieldProperties<SimpleValues>> = ({
                                                                             value,
                                                                         }) => {
    const {data} = useEntityList();

    const config = useRef(listSchemaConfiguration()['campaign']);

    if (!data || !config.current) {
        return null;
    }

    const {editPageUrl} = config.current;

    const {
        currentData: {rows},
    } = data;

    const row = rows.find((r) => r.columnValues.name.value === value.value);
    const url = editPageUrl(row?.primaryKeyValue);

    return (
        <TableCell className="list-table-cell" sx={{textAlign: 'left'}}>
            {
                url ? (
                        <Link as={url.as} href={url.href} passHref>
                            <LinkUi>{row?.columnValues.name.value}</LinkUi>
                        </Link>
                    )
                    : row?.columnValues.name.value
            }
        </TableCell>
    );
};

export default CampaignNameWithLinkCell;
