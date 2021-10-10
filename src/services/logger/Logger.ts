/**
 * Интерфейс системного логера
 */
export interface Logger {
    Info(...messages: any[]): void
    Notice(...messages: any[]): void
    Debug(...messages: any[]): void
    Warning(...messages: any[]): void
    Error(...messages: any[]): void
}

/**
 * Интерфейс фабрики логгеров
 */
export interface LoggerFactory {
    // Создает логер и маркирует его переданным модулем
    make(module: string): Logger
}
