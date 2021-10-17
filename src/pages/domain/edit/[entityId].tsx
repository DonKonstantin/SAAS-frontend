import React, {FC} from 'react';
import {GetServerSideProps} from "next";
import EditPage from "../../../components/EditPage";

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
            title: "pages.domain.edit.title",
            header: "pages.domain.edit.header",
            entityEditSchema: "domain",
            entityEditPrimaryKey: context.params?.entityId,
            permissionCheckPermission: "UPDATE_DOMAINS",
        }
    }
}

// Экспортируем компонент
export default EditPageContent