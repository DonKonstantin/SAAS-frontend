import React from "react";
import {CircularProgress, LinearProgress} from "@material-ui/core";
import clsx from 'clsx';

// Свойства компонента загрузчика
export interface LoadingBlockerProps {
    isVisible?: boolean
    style: "circle" | "linear"
    isBlockContent: boolean
}

/**
 * Компонент вывода анимации загрузки
 */
class LoadingBlocker extends React.Component<LoadingBlockerProps> {
    render() {
        const isVisible = !!this.props.isVisible
        const Component = this.props.style === "circle" ? <CircularProgress className={`circular-loader`} size={70}/> : <LinearProgress />

        return (
            <div className={
                clsx(`loading-blocker`, {
                    "loading-blocker-container": this.props.isBlockContent,
                    "visible": isVisible,
                })
            }>
                {Component}
            </div>
        )
    }
}

export default LoadingBlocker