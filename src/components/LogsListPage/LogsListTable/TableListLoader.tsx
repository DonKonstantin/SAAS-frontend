import {Divider, Grid, LinearProgress} from "@mui/material";
import {FC, useEffect, useState} from "react";
import {systemLogsLoadingInProgress} from "../SystemLogsEntityContext";
import {distinctUntilChanged} from "rxjs";

const TableListLoader: FC = () => {
    const [isLoading, setLoading] = useState(false)

    useEffect(
        () => {
            const subscriber = systemLogsLoadingInProgress.pipe(
                distinctUntilChanged()
            ).subscribe(setLoading);

            return () => subscriber.unsubscribe();
        },
        [],
    );

    return (
        <Grid item xs={12} sx={{position: "relative"}}>
            <Divider/>
            {isLoading && (
                <LinearProgress
                    color="primary"
                    sx={{width: "calc(100% - 8px)", position: "absolute", bottom: -1}}
                />
            )}
        </Grid>
    )
}

export default TableListLoader
