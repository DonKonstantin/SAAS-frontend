import LoadingAnimation from "./LoadingAnimation";

// Компонент загрузочного экрана. Выводится на всю ширину и высоту
// контентной области
const LoadingBlocker = () => {
    return (
        <div className={"loading-blocker-container"}>
            <LoadingAnimation />
        </div>
    )
}

// Экспортируем компонент
export default LoadingBlocker