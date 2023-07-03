import React from "react";

// Компонент вывода крутилки загрузки данных
const LoadingAnimation = () => {
    return (
        <div className="loading-animation">
            <div className="spinner">
                <div className="spinner-item"/>
                <div className="spinner-item"/>
                <div className="spinner-item"/>
            </div>
        </div>
    )
}

// Экспортируем компонент
export default LoadingAnimation