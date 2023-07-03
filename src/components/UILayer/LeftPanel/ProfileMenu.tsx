import React, {FC} from "react";
import {IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AuthorizationHoc, {WithAuthorization} from "../../../context/AuthorizationContext";
import {auditTime} from "rxjs";
import {useTranslation} from "react-i18next";
import {Logout} from "@mui/icons-material";

// Свойства компонента профиля пользователя
export type ProfileMenuProps = WithAuthorization<{}>

// Меню профиля пользователя
const ProfileMenu: FC<ProfileMenuProps> = props => {
    const {
        onLogout,
    } = props

    // State для хранения меню
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Обработчик открытия меню
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Обработчик закрытия меню
    const handleClose = () => {
        setAnchorEl(null);
    }

    // Обработчик разлогинивания пользователя
    const handleLogout = () => {
        onLogout();
    }

    const {t} = useTranslation()

    return (
        <>
            <Tooltip title={t(`UI.menu.profile-menu.tooltip`) as string}>
                <IconButton
                    id="left-menu-profile-menu-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    color="primary"
                    size="small"
                >
                    <ArrowDropDownIcon fontSize="medium"/>
                </IconButton>
            </Tooltip>
            <Menu
                id="left-menu-profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'left-menu-profile-menu-button',
                }}
            >
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    {t(`UI.menu.profile-menu.logout`)}
                </MenuItem>
            </Menu>
        </>
    )
}

// Экспортируем компонент
export default AuthorizationHoc(auditTime(50))(ProfileMenu)
