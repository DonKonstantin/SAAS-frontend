/**
 * Интерфейс детектора площадки запуска скрипта
 */
export interface ClientServerDetector {
    // Является ли текущая площадка серверной частью
    isServer(): boolean

    // Является ли текущая площадка клиентской частью
    isClient(): boolean
}
