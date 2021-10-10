import React from "react";
import {IconButton, Tooltip} from "@material-ui/core";
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import {clientServerDetector} from "../../../../services/clientServerDetector";

// Свойства компонента
export interface DebugComponentProps {
    isEnabled: boolean
    onChangeState: {(state: boolean): void}
}

// Компонент переключения состояния отладки
export class DebugComponent extends React.Component<DebugComponentProps>{
    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: DebugComponentProps) {
        super(props);

        this.handleButtonPressEvent = this.handleButtonPressEvent.bind(this)
    }

    /**
     * Подключаем обработку нажатия быстрых клавиш
     */
    componentDidMount() {
        if (clientServerDetector().isClient()) {
            document.addEventListener("keydown", this.handleButtonPressEvent)
        }
    }

    /**
     * Отключаем обработку нажатия быстрых клавиш
     */
    componentWillUnmount() {
        if (clientServerDetector().isClient()) {
            document.removeEventListener("keydown", this.handleButtonPressEvent)
        }
    }

    /**
     * Обработка глобальных нажатий клавиш
     * @param event
     */
    handleButtonPressEvent(event: KeyboardEvent) {
        switch (true) {
            case event.defaultPrevented:
                return;
            case event.code === "KeyD" && event.ctrlKey && event.shiftKey:
                this.props.onChangeState(!this.props.isEnabled);

                event.stopPropagation();
                event.preventDefault();
                return
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return (
            <Tooltip
                title={(
                    <React.Fragment>
                        {this.props.isEnabled ? `Отключить режим отладки` : `Включить режим отладки`}
                        <hr style={{opacity: 0.15, marginBottom: 2, marginTop: 6}} />
                        <i>Комбинация клавиш: <b>CTRL + SHIFT + D</b></i>
                    </React.Fragment>
                )}
            >
                <IconButton
                    aria-label="Режим отладки"
                    onClick={() => this.props.onChangeState(!this.props.isEnabled)}
                    color="inherit"
                >
                    {this.props.isEnabled ? <AlarmOffIcon /> : <AlarmOnIcon />}
                </IconButton>
            </Tooltip>
        )
    }
}