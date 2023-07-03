import AuthorizationHoc, {WithAuthorization} from "../../../context/AuthorizationContext";
import {FC} from "react";
import {auditTime} from "rxjs";
import {Avatar, Grid, Typography} from "@mui/material";
import ProfileMenu from "./ProfileMenu";
import {styled} from "@mui/material/styles";

// Контейнер для вывода профиля пользователя
const ProfileContainer = styled(Grid)(({theme}) => ({
    flexWrap: "nowrap",
    overflow: "hidden",
    alignItems: "center",
    padding: theme.spacing(2, 1),
}));

// Компонент вывода меню профиля на всю ширину flexBox
const FlexibleProfileMenu = styled(Grid)(() => ({
    overflow: "hidden",
    flex: "1 1 0",
}));

// Компонент вывода имени из профиля
const ProfileName = styled(Typography)(() => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

// Преобразование переданной строки в цвета для аватара
// Взято из документации MUI
function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

// Преобразование переданной строки в свойства для аватара
// Взято из документации MUI
function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

// Свойства компонента
export type ProfileProps = WithAuthorization<{}>

// Компонент вывода профиля пользователя в левом меню
const Profile: FC<ProfileProps> = props => {
    const {userInfo} = props
    if (!userInfo) {
        return null
    }

    const userName = `${userInfo.first_name} ${userInfo.last_name}`
    return (
        <ProfileContainer container spacing={2}>
            <Grid item>
                <Avatar {...stringAvatar(userName)} />
            </Grid>
            <FlexibleProfileMenu item>
                <ProfileName variant={"h6"}>{userName}</ProfileName>
            </FlexibleProfileMenu>
            <Grid item>
                <ProfileMenu />
            </Grid>
        </ProfileContainer>
    )
}

// Экспортируем компонент
export default AuthorizationHoc(auditTime(1000))(Profile)