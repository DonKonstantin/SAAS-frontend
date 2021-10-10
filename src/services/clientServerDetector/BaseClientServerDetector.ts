import {ClientServerDetector} from "./ClientServerDetector";

/**
 * Реализация детектора площадок
 */
export class BaseClientServerDetector implements ClientServerDetector {
    /**
     * Является ли текущая площадка клиентской частью
     */
    isClient(): boolean {
        return !this.isServer();
    }

    /**
     * Является ли текущая площадка серверной частью
     */
    isServer(): boolean {
        return typeof window === 'undefined';
    }
}
