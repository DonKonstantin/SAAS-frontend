import React, {FC} from 'react';
import {GetStaticProps} from "next";
import EditPage from "../../components/EditPage";
import {PageWithEntityEdit} from "../../components/EditPage/type";

// Компонент страницы создания
const EditPageContent: FC = () => {
    return (
        <EditPage/>
    )
}

// Загрузка данных CRM на стороне сервера
export const getStaticProps: GetStaticProps = async (): Promise<{ props: PageWithEntityEdit }> => {
    return {
        props: {
            title: "pages.domain.add.title",
            header: "pages.domain.add.header",
            entityEditSchema: "domain",
            permissionCheckPermission: "UPDATE_DOMAINS",
        }
    }
}

// Экспортируем компонент
export default EditPageContent