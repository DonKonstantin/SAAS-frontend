import React, {FC} from "react";

// Свойства страницы
type PageProps<T extends object = {}> = T

// Свойства провайдера
type PagePropsProviderProps<T extends object = {}> = PageProps<T> & {
    children: React.ReactNode
}

// Контекст свойств страницы
const PagePropsContext = React.createContext<PageProps>({});

// Компонент провайдера
const PagePropsProvider: FC<PagePropsProviderProps> = props => {
    const {children, ...pageProps} = props
    return (
        <PagePropsContext.Provider value={pageProps}>
            {children}
        </PagePropsContext.Provider>
    )
}

/**
 * HOC для использования контекста свойств страницы
 * @param Component
 */
export function withPageProps <T>(Component: React.ComponentType<PageProps & T>): React.ComponentType<T> {
    return props => {
        return (
            <PagePropsContext.Consumer>
                {pageProps => (
                    <Component {...props} {...pageProps} />
                )}
            </PagePropsContext.Consumer>
        )
    }
}

// Экспортируем провайдер
export default PagePropsProvider