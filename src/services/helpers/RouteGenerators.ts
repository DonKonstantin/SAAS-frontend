// Генерирует ссылку на страницу листинга сущности
export function routeToEntityList(table: string): string {
    return `/${table}`
}

// Генерирует ссылку на страницу редактирования сущности
export function routeToEntity(table: string, id: string | number): string {
    return `/${table}/${id}`
}

// Генерирует ссылку на страницу редактирования сущности
export function routeToEntityAdd(table: string): string {
    return `/${table}/add`
}

// Генерация ссылки с предустановленными данными для формы
export function withFormData(route: string, data: object): string {
    let formData: string[] = [];
    Object.keys(data).map(key => {
        // @ts-ignore
        formData.push(`formData[${key}]=${data[key] ? data[key] : `""`}`)
    });

    return `${route}?${formData.join("&")}`
}
