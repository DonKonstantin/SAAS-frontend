import React, {FC, memo, useEffect} from "react";
import {useSystemLogsEntity} from "./SystemLogsEntityContext";
import {distinctUntilChanged} from "rxjs";
import {LogsLevel} from "../../services/systemLogsService/interface";

type Props = {
    level: LogsLevel,
    structureId: string,
    children: React.ReactNode
}

export type WithSystemLogsProps = {
    logLevel: LogsLevel,
    structureId: string
}

const SystemLogsProvider: FC<Props> = ({children, structureId, level}) => {
    const {initEntityContext} = useSystemLogsEntity(distinctUntilChanged(() => true));

    useEffect(
        () => initEntityContext(level, structureId),
        [],
    );

    return (
        <>
            {children}
        </>
    )
}

export default memo(SystemLogsProvider)
