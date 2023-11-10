import { SortType } from "components/EditPageCustomFields/CampaignGroup/Channels/types";

/**
 * Интерфейс функций контекста листинга роликов проекта
 */
export interface CampaignClipsListPageContextActionsType {
  /**
   * Записываем ID продукта для инициализации контекста
   * @param id
   * @returns
   */
  setProjctId: (id: string | null) => void;

  /**
   * Записываем параметры сортировки таблицы
   * @param sortParams
   * @returns
   */
  setSortParams: (sortParams: SortType) => void;

  /**
   * Перезагружаем список кампаний
   */
  reloadListData: VoidFunction;

  /**
   * Изменение страницы листинга
   * @param pageCount
   * @returns
   */
  onChangeListPage: (pageCount: number) => void;

  /**
   * Изменение лимита строк на страницу
   * @param limit
   * @returns
   */
  onChangeLimit: (limit: number) => void;

  /**
   * Удаление переданых роликов
   * @param clips
   * @returns
   */
  removeClips: (clips: string[]) => void;

  /**
   * Скачиваем ролик
   * @param fileName
   * @param title
   * @returns
   */
  downloadClip: (fileName: string, title: string) => void;
}