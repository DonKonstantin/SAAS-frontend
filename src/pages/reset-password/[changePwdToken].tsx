import {FC, useEffect} from 'react';
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {PageWithMetaTags} from "../../components/UILayer/PageWithMetaTags";

// Свойства страницы
type Props = PageWithMetaTags<{
    changePasswordToken: string
    isNeedShowChangePassword: boolean
}>

// Компонент страницы восстановления пароля.
// Редиректит на главную, если пользователь смог войти в CRM
const ChangePasswordPage: FC<Props> = () => {
    const router = useRouter()
    useEffect(() => {
        router.replace("/")
    })

    return null
}

// Получение токена восстановления пароля и проброс флага, отображающего
// форму изменения пароля
export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {
            changePasswordToken: context.params?.changePwdToken,
            isNeedShowChangePassword: true,
        }
    }
}

// Экспортируем компонент
export default ChangePasswordPage