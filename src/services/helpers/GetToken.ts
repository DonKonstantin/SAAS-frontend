import {BaseContext, NextPageContext} from "next/dist/shared/lib/utils";
import Cookies from "universal-cookie";

/**
 * GetToken выполняет получение токена авторизации из куки
 * @param req
 */
const GetToken = <C extends BaseContext = NextPageContext>({req}: C): string => {
    const cookie = new Cookies(req ? req.headers.cookie || "" : document.cookie);
    if (typeof cookie.get('token') === "string") {
        return cookie.get(`token`)
    }

    return ``
}

export default GetToken