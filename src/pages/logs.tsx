import React from 'react';
import {PageWithMetaTags} from "../components/UILayer/PageWithMetaTags";
import {NextPage} from "next";
import SystemLogsList from "../components/SystemLogsList";
import SystemLogsProvider, {WithSystemLogsProps} from "../components/SystemLogsList/SystemLogsProvider";
import {LogsLevel} from "../services/systemLogsService/interface";

// Свойства страницы
type Props = PageWithMetaTags & WithSystemLogsProps;

// Компонент страницы проекта
const Page: NextPage<Props> = ({structureId, logLevel}) => {
    return (
        <SystemLogsProvider level={logLevel} structureId={structureId}>
            <SystemLogsList/>
        </SystemLogsProvider>
    )
}

// Экспортируем основные параметры страницы
Page.getInitialProps = async () => ({
    title: "Логи",
    header: "Логи",
    logLevel: LogsLevel.realm,
    structureId: "1"
})

// Экспортируем компонент
export default Page
