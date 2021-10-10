import React from 'react';
import ChangeTnvedProductImportTaskPageWithoutSSR from "../../../../custom/components/ChangeTnvedProductImportTask";

type Props = {
    title: string
    header: string
    taskId: string
};

/**
 * Класс страницы
 */
class Page extends React.Component<Props> {
    /**
     * Предварительная загрузка данных страницы
     */
    static async getInitialProps({query}: any): Promise<Props> {
        const taskId = query.taskId as string;
        return {
            title: `Управление заданием #${taskId}`,
            header: `Управление заданием #${taskId}`,
            taskId: taskId,
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const {taskId} = this.props;
        return <ChangeTnvedProductImportTaskPageWithoutSSR taskId={taskId}/>
    }
}

export default Page