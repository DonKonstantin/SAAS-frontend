import React from 'react';
import ShoulderImportStatusPage from "../../../../custom/containers/ShoulderImportStatusPage";

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
            title: `Статус задания №${taskId}`,
            header: `Статус задания №${taskId}`,
            taskId: taskId,
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const {taskId} = this.props;
        return <ShoulderImportStatusPage initialTaskId={taskId} />
    }
}

export default Page