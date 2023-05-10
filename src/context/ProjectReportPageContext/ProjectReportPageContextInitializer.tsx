import React, { FC, memo, PropsWithChildren, useEffect } from 'react';
import { InitProjectReportPageContextContext } from '.';

/**
 * Компонент инициализации контекста страницы отчетов проекта
 * @param param0 
 * @returns 
 */
const ProjectReportPageContextInitializer: FC<PropsWithChildren<{}>> = ({ children }) => {
  useEffect(() => InitProjectReportPageContextContext(), []);

  return <>{children}</>;
};

export default memo(ProjectReportPageContextInitializer);