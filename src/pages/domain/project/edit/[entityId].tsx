import React, {FC} from 'react';
import {GetServerSideProps} from "next";
import EditPage from "../../../../components/EditPage";

// Компонент страницы редактирования
const EditPageContent: FC = () => {
    return (
        <EditPage/>
    )
}

// Загрузка данных CRM на стороне сервера
export const getServerSideProps: GetServerSideProps = async context => {
    if (!context.params?.entityId) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            title: "pages.project.edit.title",
            header: "pages.project.edit.header",
            entityEditSchema: "project",
            entityEditPrimaryKey: context.params?.entityId,
            permissionCheckPermission: "UPDATE_PROJECTS",
            pageMenuType: "domain",
        }
    }
}

// Экспортируем компонент
export default EditPageContent