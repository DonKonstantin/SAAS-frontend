import {Language} from "../../../../reduxStore/stores/Languages";
import {Button, createStyles, Menu, MenuItem, Theme, Tooltip, withStyles} from "@material-ui/core";
import React from "react";
import {PopoverProps} from "@material-ui/core/Popover";
import GTranslateIcon from '@material-ui/icons/GTranslate';
import TranslateIcon from '@material-ui/icons/Translate';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {clientServerDetector} from "../../../../services/clientServerDetector";

// Стили компонента
const styles = (theme: Theme) => createStyles({
    langSelector: {
        marginLeft: theme.spacing(1),
    },
});

// Свойства компонента выбора языков системы
export interface LanguagesMenuProps {
    primaryLangId: string
    secondaryLangId: string
    languages: Language[]

    onChangePrimaryLang: {(id: string): void}
    onChangeSecondaryLang: {(id: string): void}

    classes: {
        langSelector: string
    }
}

// State компонента
export interface LanguagesMenuState {
    isPrimaryOpen: boolean
    isSecondaryOpen: boolean
    primaryAnchor: PopoverProps['anchorEl']
    secondaryAnchor: PopoverProps['anchorEl']
    isMobile: boolean
}

/**
 * Компонент вывода меню выбора языков для админки
 */
class LanguagesMenuComponent extends React.Component<LanguagesMenuProps, LanguagesMenuState> {
    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: LanguagesMenuProps) {
        super(props);
        this.state = {
            primaryAnchor: null,
            secondaryAnchor: null,
            isPrimaryOpen: false,
            isSecondaryOpen: false,
            isMobile: clientServerDetector().isServer() ? false : (window.outerWidth < 1000)
        }
    }

    /**
     * Обновление компонента
     */
    componentDidUpdate() {
        const isMobile = clientServerDetector().isServer() ? false : (window.outerWidth < 1000);
        if (isMobile !== this.state.isMobile) {
            this.setState({
                ...this.state,
                isMobile: isMobile,
            })
        }
    }

    /**
     * Обработка переключения состояния меню выбора основного языка
     * @param anchor
     * @param state
     */
    handleChangePrimaryState(anchor: PopoverProps['anchorEl'], state: boolean) {
        this.setState({
            ...this.state,
            isPrimaryOpen: state,
            primaryAnchor: anchor,
        })
    }

    /**
     * Обработка переключения состояния меню выбора дополнительного языка
     * @param anchor
     * @param state
     */
    handleChangeSecondaryState(anchor: PopoverProps['anchorEl'], state: boolean) {
        this.setState({
            ...this.state,
            isSecondaryOpen: state,
            secondaryAnchor: anchor,
        })
    }

    /**
     * Обработка изменения основного языка
     * @param id
     */
    handleChoosePrimaryLang(id: string) {
        this.handleChangePrimaryState(null, false);
        this.props.onChangePrimaryLang(id)
    }

    /**
     * Обработка изменения основного языка
     * @param id
     */
    handleChooseSecondaryLang(id: string) {
        this.handleChangeSecondaryState(null, false);
        this.props.onChangeSecondaryLang(id)
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const currentPrimaryLang = this.props.languages.find(lang => lang.id === this.props.primaryLangId);
        const currentSecondaryLang = this.props.languages.find(lang => lang.id === this.props.secondaryLangId);

        if (!currentPrimaryLang || !currentSecondaryLang) {
            return null
        }

        const primaryLang = this.props.languages.filter(lang => lang.id !== currentSecondaryLang.id);
        const secondaryLang = this.props.languages.filter(lang => lang.id !== currentPrimaryLang.id);

        return (
            <React.Fragment>
                <div className={this.props.classes.langSelector}>
                    <Tooltip title={`Изменить дополнительный язык локализованных полей`}>
                        <Button
                            aria-controls="secondary-lang-menu"
                            aria-haspopup="true"
                            startIcon={<GTranslateIcon />}
                            endIcon={<KeyboardArrowDownIcon />}
                            onClick={e => this.handleChangeSecondaryState(e.currentTarget,true)}
                            color={`inherit`}
                        >
                            {this.state.isMobile ? currentSecondaryLang.code : currentSecondaryLang.name}
                        </Button>
                    </Tooltip>
                    <Menu
                        id="secondary-lang-menu"
                        anchorEl={this.state.secondaryAnchor}
                        keepMounted
                        open={this.state.isSecondaryOpen}
                        onClose={() => this.handleChangeSecondaryState(null,false)}
                    >
                        {secondaryLang.map(lang => {
                            return (
                                <MenuItem
                                    key={`secondary-lang-id-${lang.id}`}
                                    onClick={() => this.handleChooseSecondaryLang(lang.id)}
                                >
                                    {lang.name} ({lang.code})
                                </MenuItem>
                            )
                        })}
                    </Menu>
                </div>
                <div className={this.props.classes.langSelector}>
                    <Tooltip title={`Изменить основной язык локализованных полей`}>
                        <Button
                            aria-controls="primary-lang-menu"
                            aria-haspopup="true"
                            startIcon={<TranslateIcon />}
                            endIcon={<KeyboardArrowDownIcon />}
                            onClick={e => this.handleChangePrimaryState(e.currentTarget,true)}
                            color={`inherit`}
                        >
                            {this.state.isMobile ? currentPrimaryLang.code : currentPrimaryLang.name}
                        </Button>
                    </Tooltip>
                    <Menu
                        id="primary-lang-menu"
                        anchorEl={this.state.primaryAnchor}
                        keepMounted
                        open={this.state.isPrimaryOpen}
                        onClose={() => this.handleChangePrimaryState(null,false)}
                    >
                        {primaryLang.map(lang => {
                            return (
                                <MenuItem
                                    key={`primary-lang-id-${lang.id}`}
                                    onClick={() => this.handleChoosePrimaryLang(lang.id)}
                                >
                                    {lang.name} ({lang.code})
                                </MenuItem>
                            )
                        })}
                    </Menu>
                </div>
            </React.Fragment>
        )
    }
}

// Подключаем стили к компоненту
export default withStyles(styles)(LanguagesMenuComponent)