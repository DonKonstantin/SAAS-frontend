
// Сервис для работы с файлами Excel
export interface ExcelFileServiceInterface {
    // Создание нового файла Excel
    CreateFile(name: string, companyId: number, data: string[][]): Promise<string>

    // Удаление файла Excel
    DeleteFile(fileId: string): Promise<void>
}