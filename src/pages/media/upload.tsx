import React from 'react';
import { NextPage } from "next";
import { PageWithMetaTags } from "../../components/UILayer/PageWithMetaTags";
import { PageWithChangeableMenu } from "../../layouts/MenuChangeLayout";
import MediaLibraryUploadPage from "../../components/MediaLibraryUploadPage";

// Свойства страницы
type Props = PageWithMetaTags & PageWithChangeableMenu;

// Компонент страницы загрузки файлов в медиабиблиотеку
const Page: NextPage<Props> = () => {
  return <MediaLibraryUploadPage />;
};

// Экспортируем основные параметры страницы
Page.getInitialProps = async () => ({
  title: "Медиабиблиотека - загрузка",
  header: "Медиабиблиотека - загрузка",
});

// Экспортируем компонент
export default Page;
