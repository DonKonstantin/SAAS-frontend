import React, {FC} from 'react';
import InternalError from "../components/InternalError";

// Свойства страницы
type PageProps = {}

// Страница ошибки 500
const InternalErrorPage: FC<PageProps> = () => {
    return <InternalError />
}

export default InternalErrorPage