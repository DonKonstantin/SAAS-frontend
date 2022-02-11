import React from "react";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import {Stack} from "@mui/material";


const CCEEditorWithoutSSR = dynamic(async () => import("../../../components/EditPage/Fields/CKEEditor"), {
    ssr: false,
    loading: () => (
        <Stack spacing={1}>
            <Skeleton variant={"rectangular"} height={24}/>
            <Skeleton variant={"rectangular"} height={135}/>
        </Stack>
    )
});

export default CCEEditorWithoutSSR;
