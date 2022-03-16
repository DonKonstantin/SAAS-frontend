import React from 'react';
import {NextPage} from "next";
import LogsListPage from "../../../../../components/SystemLogsList";
import {PageWithMetaTags} from "../../../../../components/UILayer/PageWithMetaTags";
import {LogsLevel} from "../../../../../services/systemLogsService/interface";
import SystemLogsProvider, {WithSystemLogsProps} from "../../../../../components/SystemLogsList/SystemLogsProvider";
import {PageWithChangeableMenu} from "../../../../../layouts/MenuChangeLayout";

// Свойства страницы
type Props = PageWithMetaTags & WithSystemLogsProps & PageWithChangeableMenu;

// Компонент страницы проекта
const Page: NextPage<Props> = ({structureId, logLevel}) => {
    return (
        <SystemLogsProvider level={logLevel} structureId={structureId}>
            <LogsListPage/>
        </SystemLogsProvider>
    )
}

// Экспортируем основные параметры страницы
Page.getInitialProps = async ({query}): Promise<Props> => ({
    title: "Логи",
    header: "Логи",
    logLevel: LogsLevel.project,
    structureId: query.projectId as string,
    pageMenuType: "project",
})

// Экспортируем компонент
export default Page
