/**
 * Костыль для правильного выбора клиентской роли для выполнения запроса
 * к серверу данных.
 *
 * @param roles
 */
export function getRoleByPriority(roles: string[]): string {
    return roles.includes('admin')
        ? 'admin'
        : roles.includes('moderator')
            ? 'moderator'
            : roles.includes('user')
                ? 'user'
                : 'anonymous'
    ;
}
