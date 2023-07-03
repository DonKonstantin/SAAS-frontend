import { Page, expect } from "@playwright/test";
import { isNull } from "lodash";

/**
 * Задержка в тесте
 * @param time
 * @returns
 */
export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

/**
 * Перезватывает запрос и возвращает моковые данные
 * Возможна проверка значений используемых в мутации или запросе в качестве переменных
 * @param page
 * @param operationName
 * @param responce
 * @param payload
 */
export const interceptGQL = async (
  page: Page,
  operationName: string,
  responce: Record<string, unknown>,
  payload?: any,
): Promise<void> => {
  await page.route("", async (route, request) => {
    const body: Record<"operationName" | "variables", string> = route
      .request()
      .postDataJSON();

    if (isNull(body) || body.operationName !== operationName) {
      return route.fallback();
    }

    if (!!payload) {
      const postData = request.postDataJSON();

      const variables = postData.variables;

      expect(variables).toStrictEqual(payload);
    }

    return route.fulfill(responce);
  });
};

/**
 * Проверяет выполнение лоадера 
 * @param page
 */
export const checkLoadingBlocker = async (page: Page) => {
  await page.getByTestId("loadingBlocker").waitFor({ state: "attached" });
  await page.getByTestId("loadingBlocker").waitFor({ state: "detached" });
};