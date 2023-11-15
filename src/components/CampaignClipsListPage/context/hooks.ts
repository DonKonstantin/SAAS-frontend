import { useEffect, useState } from 'react';
import {
  actions,
  isLoading$,
  isLocalLoading$,
  rowsPerPage$,
  sortStream$,
  clips$,
  tablePage$,
  loadedProjectListAggregation$,
  // tableRows$,
} from './context';
import { SortType } from 'components/EditPageCustomFields/CampaignGroup/Channels/types';
import { CampaignPlayListFileType } from 'services/campaignListService/types';

/**
 * Хук для доступа к контексту листинга роликов кампании
 * @returns
 */
const useCampaignClipsListPage = () => ({
  actions,

  useIsLoading,
  useIsLocalLoading,
  useTableRows,
  useSort,
  usePages,
  usePageLimit,
  useClipsCount,
});

//  Флаг загрузки
const useIsLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const subscription = isLoading$
      .subscribe(setIsLoading);
    
    return () => subscription.unsubscribe();
  }, []);

  return isLoading;
};

//  Флаг обработки операций над листингом без подгрузки новых данных
const useIsLocalLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const subscription = isLocalLoading$
      .subscribe(setIsLoading);
    
    return () => subscription.unsubscribe();
  }, []);

  return isLoading;
};

//  Строки таблицы
const useTableRows = () => {
  const [tableRows, setTableRows] = useState<CampaignPlayListFileType[]>([]);

  useEffect(() => {
    const subscription = clips$
      .subscribe(setTableRows);
    
    return () => subscription.unsubscribe();
  }, []);

  return tableRows;
};

//  Параметры сортировки
const useSort = () => {
  const [sort, setSort] = useState<SortType>({
    column: 'name',
    direction: 'asc',
  });

  useEffect(() => {
    const subscription = sortStream$
      .subscribe(setSort);
    
    return () => subscription.unsubscribe();
  }, []);

  return sort;
};

//  Изменение страницы листинга
const usePages = () => {
  const [pages, setPages] = useState<number>(0);

  useEffect(() => {
    const subscription = tablePage$
      .subscribe(setPages);
    
    return () => subscription.unsubscribe();
  }, []);

  return pages;
};

//  Изменение лимита строк на страницу
const usePageLimit = () => {
  const [limit, setLimit] = useState<number>(0);

  useEffect(() => {
    const subscription = rowsPerPage$
      .subscribe(setLimit);
    
    return () => subscription.unsubscribe();
  }, []);

  return limit;
};

//  Количество клипов
const useClipsCount = () => {
  const [limit, setLimit] = useState<number>(0);

  useEffect(() => {
    const subscription = loadedProjectListAggregation$
      .subscribe(count => setLimit(count));
    
    return () => subscription.unsubscribe();
  }, []);

  return limit;
};

export default useCampaignClipsListPage;