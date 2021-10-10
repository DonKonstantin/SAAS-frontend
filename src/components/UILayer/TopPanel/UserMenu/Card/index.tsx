import React from "react";
import {UserData} from "../../../../../reduxStore/stores/Authorization";
import {Avatar, Button, Card, CardActions, CardHeader, createStyles, withStyles} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

// Стили компонента
const styles = createStyles({
    root: {
        maxWidth: 345,
    },
    avatar: {
        backgroundColor: red[500],
    },
})

/**
 * Свойства компонента верхней панели
 */
export interface UIUserCardComponentProperties {
    user: UserData
    onLogout: () => void
    classes: {
        root: string
        avatar: string
    },
}

/**
 * Компонент верхней панели
 */
class UIUserCardComponent extends React.PureComponent<UIUserCardComponentProperties> {
    render() {
        let avatarCaption = ""
        if (0 !== this.props.user.first_name.length) {
            avatarCaption += this.props.user.first_name.charAt(0)
        }
        if (0 !== this.props.user.last_name.length) {
            avatarCaption += this.props.user.last_name.charAt(0)
        }

        return (
            <Card className={this.props.classes.root}>
                <CardHeader
                    avatar={<Avatar aria-label="recipe" className={this.props.classes.avatar}>{avatarCaption}</Avatar>}
                    title={`${this.props.user.last_name} ${this.props.user.first_name}`}
                    subheader={(
                        <React.Fragment>
                            {this.props.user.email}
                            <div>
                                {this.props.user.roles.join(", ")}
                            </div>
                        </React.Fragment>
                    )}
                />
                <CardActions disableSpacing>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => this.props.onLogout()}
                    >
                        Выйти из профиля
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

// Подключаем стили к компоненту и экспортируем его
export default withStyles(styles)(UIUserCardComponent)