import React, { FC, memo } from "react";
import {Table, TableContainer} from "@mui/material";
import ListHeader from "./ListHeader";

interface Props {
};

const List: FC<Props> = ({}) => {
  return (
    <TableContainer>
            <Table>
                <ListHeader direction={'asc'} />
                {/* <ListBody {...props} /> */}
            </Table>
        </TableContainer>
  );
};

export default memo(List);
