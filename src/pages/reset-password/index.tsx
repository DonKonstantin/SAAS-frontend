import {useEffect} from 'react';
import {useRouter} from "next/router";
import {NextPage} from "next";
import {PageWithMetaTags} from "../../components/UILayer/PageWithMetaTags";

// Свойства страницы
type Props = PageWithMetaTags<{
    changePasswordToken: string
    isNeedShowChangePassword: boolean
}>

// Компонент страницы восстановления пароля.
// Редиректит на главную, если пользователь смог войти в CRM
const ChangePasswordPage: NextPage<Props> = () => {
    const router = useRouter()
    useEffect(() => {
        router.replace("/")
    })

    return null
}

// Получение токена восстановления пароля и проброс флага, отображающего
// форму изменения пароля
ChangePasswordPage.getInitialProps = async ({query}) => ({
    changePasswordToken: query?.changePwdToken as string,
    isNeedShowChangePassword: true,
})

// Экспортируем компонент
export default ChangePasswordPage