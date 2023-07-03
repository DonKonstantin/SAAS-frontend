import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import ErrorPageHuman from "./Icons/ErrorPageHuman";
import Link from "./Link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Компонент отображения страницы внутренней ошибки системы
const InternalError: FC = () => {
    const {t} = useTranslation()

    return (
        <div className={"error-page"}>
            <div className={"position-block"}>
                <ErrorPageHuman />
                <div className="error-code">500</div>
                <div className="return-link">
                    <Link href="#" onClick={() => window.location.href = "/"} className="link">
                        <div><ArrowForwardIcon color="inherit"/></div>
                        <div>{t(`UI.pages.error.back-to-main-page`)}</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

// Экспортируем компонент
export default InternalError