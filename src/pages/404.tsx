import React, {FC} from 'react';
import ErrorPageHuman from "../components/Icons/ErrorPageHuman";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from "../components/Link";
import {useTranslation} from "react-i18next";

// Свойства страницы
type PageProps = {}

// Страница ошибки 404
const NotFoundPage: FC<PageProps> = () => {
    const {t} = useTranslation()

    return (
        <div className={"error-page"}>
            <div className={"position-block"}>
                <ErrorPageHuman />
                <div className="error-code">404</div>
                <div className="return-link">
                    <Link href="/" className="link">
                        <div><ArrowForwardIcon color="inherit"/></div>
                        <div>{t(`UI.pages.error.back-to-main-page`)}</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage