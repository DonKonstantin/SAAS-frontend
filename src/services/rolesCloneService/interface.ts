/**
 * Интерфейс сервиса клонирования ролей
 */
export interface RolesCloneServiceInterface {
    /**
     * Клонирование переданного списка ролей
     * @param roleIds
     */
    CloneRoles(roleIds: string[]): Promise<void>
}