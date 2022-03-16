import React from 'react';
import {PageWithMetaTags} from "../../../components/UILayer/PageWithMetaTags";
import {NextPage} from "next";
import LogsListPage from "../../../components/LogsListPage";
import SystemLogsProvider, {WithSystemLogsProps} from "../../../components/LogsListPage/SystemLogsProvider";
import {LogsLevel} from "../../../services/systemLogsService/interface";
import {PageWithChangeableMenu} from "../../../layouts/MenuChangeLayout";

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
    logLevel: LogsLevel.domain,
    structureId: query.domainId as string,
    pageMenuType: "domain",
})

// Экспортируем компонент
export default Page
