// Код ТНВЭД
export type TnvedCode = {
    code: string
    created_at: string
    description: string
    id: string
    last_modified: string
    name: string
    parent: number | null
    path: string
    vendor: string
};

// Сервис загрузки веток кодов ТНВЭД
export interface TnvedCodeBranchLoaderInterface {
    // Загрузка веток по переданным ID
    LoadBranchesByIds(ids: string[]): Promise<TnvedCode[]>
}