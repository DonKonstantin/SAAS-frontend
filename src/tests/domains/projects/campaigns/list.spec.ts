import { test, expect } from "@playwright/test";
import {
  campaignsDetails,
  campaignsDetailsAfterCopy,
  campaignsDetailsAfterDelete,
  campaignsList,
  deleteCampaignSuccessfull,
  domainsAndProjects,
  domainsList,
  domainsListRelData,
  fullCampaignsDetails,
  fullCampaignsDetailsOnCopy,
  itemsCountAfterCopy,
  itemsCountAfterDelete,
  itemsListAfterCopy,
  itemsListAfterDelete,
  projectsList,
  publishCampaign,
  responceError,
  storeCampaign,
} from "tests/fixtures/domains/projects/campaigns/list_responces";
import { checkLoadingBlocker, delay, interceptGQL } from "tests/helpers";
import { getComponents } from "./components";
import {
  copyCampaignPayload,
  deletePayload,
  depublishPaypoad,
  editPayload,
  publishCampaignPayload
} from "tests/fixtures/domains/projects/campaigns/list_payload";

test.describe("Checking page", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    page.unroute("");

    await page.goto(baseURL || "");

    await page
      .getByTestId("email")
      .getByRole("textbox")
      .fill("knyazkovd@gmail.com");

    await page
      .getByTestId("password")
      .getByRole("textbox")
      .fill("BbNqbU2jnDgs6wP!#))3а");

    await delay(1000);

    page.getByTestId("loginButton").click({ force: true });

    await interceptGQL(
      page,
      "LoadDomainsAndCategories",
      domainsAndProjects,
    );

    await page.getByText("Домены").click();

    await interceptGQL(
      page,
      "__ITEMS_LIST__",
      domainsList,
    );

    await interceptGQL(
      page,
      "__LIST_REL_DATA__ ",
      domainsListRelData,
    );

    const domenLink = page.getByRole("link", { name: "Test domain", exact: true });

    await domenLink.waitFor({ state: "attached" });

    domenLink.click();

    await interceptGQL(
      page,
      "__ITEMS_LIST__",
      projectsList,
    );

    const projectLink = page
      .getByRole("link", { name: "Test project", exact: true });

    await projectLink.waitFor({ state: "attached" });

    projectLink.click();

    await interceptGQL(
      page,
      "__ITEMS_LIST__",
      campaignsList,
    );

    await interceptGQL(
      page,
      "__GET_CAMPAIGN__",
      campaignsDetails,
    );

    await checkLoadingBlocker(page);
  });

  test("Breadcrumbs", async ({ page, baseURL }) => {
    const { breadcrumbs } = getComponents(page);

    expect(await breadcrumbs.count()).toBe(5);

    expect(await breadcrumbs.nth(2).innerText()).toBe("Test domain");
    expect(await breadcrumbs.nth(4).innerText()).toBe("Test project");

    await breadcrumbs
      .nth(3)
      .click();

    expect(page).toHaveURL(`${baseURL}domain/1/project`);
  });

  test("List of campaigns", async ({ page, baseURL }) => {
    const {
      listHeader,
      commonDeleteButton,
      editButton,
      deleteButton,
      deleteDialogWrapper,
      deleteDialogTitle,
      deleteDialogText,
      deleteDialogCancelButton,
      deleteDialogDeleteButton,
      rowsCheckboxes,
      editOrAddCampaignWrapper,
      createCampaignButton,
      copyCampaignButton,
      publishCampaignButton,
      deselectCampaignButton,
      copyCampaignWrapper,
      copyCampaignCloseCrossButton,
      copyCampaignHeader,
      copyCampaignSubmitButton,
      copyCampaignCloseButton,
      copingCampaignTitle,
      datePicker,
      listRow,
    } = getComponents(page);

    expect(await listHeader.innerText()).toBe("Список кампаний");

    expect(commonDeleteButton).toBeDisabled();

    //  Тестируем заголовки таблицы
    const heading = page.getByRole("columnheader");

    expect(await heading.count()).toBe(8);

    expect(await heading.nth(1).textContent()).toBe("Названиесортировка по возрастанию");
    expect(await heading.nth(2).textContent()).toBe("Последняя версия");
    expect(await heading.nth(3).textContent()).toBe("Приоритет");
    expect(await heading.nth(4).textContent()).toBe("Начало");
    expect(await heading.nth(5).textContent()).toBe("Конец");
    expect(await heading.nth(6).textContent()).toBe("Статус");

    //  Тестируем истроки
    await listRow.first().waitFor({ state: "attached" });

    expect(await listRow.count()).toBe(2);

    const firstRowCells = listRow.first().locator("td");

    const firstRowCheckbox = rowsCheckboxes.first();

    await firstRowCheckbox.check();

    expect(commonDeleteButton).toBeEnabled();

    await commonDeleteButton.click();

    await deleteDialogWrapper.waitFor({ state: "attached" });

    let deleteDialogTextValue = await deleteDialogText.innerText();

    expect(deleteDialogTextValue).toBe("Вы точно хотите удалить элементы (2 шт)? Это действие нельзя отменить!");

    deleteDialogCancelButton.click();

    expect(await firstRowCells.count()).toBe(8);

    expect(await firstRowCells.nth(1).textContent()).toBe("Test campaign");
    expect(await firstRowCells.nth(2).textContent()).toBe("Нет");
    expect(await firstRowCells.nth(3).textContent()).toBe("Фоновый");
    expect(await firstRowCells.nth(4).textContent()).toBe("01.02.2023");
    expect(await firstRowCells.nth(5).textContent()).toBe("28.02.2025");
    expect(await firstRowCells.nth(6).textContent()).toBe("Активен");

    editButton.click();

    await interceptGQL(
      page,
      "__GET_CAMPAIGN__",
      fullCampaignsDetails,
      editPayload,
    );

    await editOrAddCampaignWrapper.waitFor({ state: "attached" });

    expect(page).toHaveURL(`${baseURL}domain/1/project/1/campaign/edit/1`);
    
    page.goBack();

    await interceptGQL(
      page,
      "__ITEMS_LIST__",
      campaignsList,
    );

    await interceptGQL(
      page,
      "__GET_CAMPAIGN__",
      campaignsDetails,
    );

    await checkLoadingBlocker(page);

    await listHeader.waitFor({ state: "attached" });

    listHeader.innerText().then(text => {
      expect(text).toBe("Список кампаний");
    });

    await deleteButton.click();
    
    await deleteDialogWrapper.waitFor({ state: "attached" });

    await deleteDialogTitle.waitFor({ state: "attached" });

    const deleteDialogTitleValue = await deleteDialogTitle.innerText();

    expect(deleteDialogTitleValue).toBe("Удалить элементы");

    await deleteDialogText.waitFor({ state: "attached" });

    deleteDialogTextValue = await deleteDialogText.innerText();

    expect(deleteDialogTextValue).toBe("Вы точно хотите удалить элементы (1 шт)? Это действие нельзя отменить!");

    await deleteDialogCancelButton.waitFor({ state: "attached" });

    await deleteDialogDeleteButton.waitFor({ state: "attached" });

    deleteDialogCancelButton.click();

    await deleteDialogWrapper.waitFor({ state: "detached" });

    await deleteButton.click();

    await deleteDialogWrapper.waitFor({ state: "attached" });

    await deleteDialogDeleteButton.waitFor({ state: "visible" });

    deleteDialogDeleteButton.click();

    await interceptGQL(
      page,
      "__DELETE_ENTITY__",
      deleteCampaignSuccessfull,
      deletePayload,
    );

    await interceptGQL(
      page,
      "__ITEMS_COUNT__",
      itemsCountAfterDelete,
    );

    await interceptGQL(
      page,
      "__ITEMS_LIST__",
      itemsListAfterDelete,
    );

    await interceptGQL(
      page,
      "__GET_CAMPAIGN__",
      campaignsDetailsAfterDelete,
    );

    await page.getByText("Элементы успешно удалены").waitFor({ state: "visible" });

    /**
     * Кнопки управления
     */

    expect(createCampaignButton.isEnabled()).toBeTruthy();
    expect(copyCampaignButton.isDisabled()).toBeTruthy();
    expect(publishCampaignButton.isDisabled()).toBeTruthy();
    expect(deselectCampaignButton.isDisabled()).toBeTruthy();

    //  Проверяем работу кнопки "Создать"
    createCampaignButton.click();

    await checkLoadingBlocker(page);

    await editOrAddCampaignWrapper.waitFor({ state: "attached" });

    expect(page).toHaveURL(`${baseURL}domain/1/project/1/campaign/add`);
    
    page.goBack();

    await interceptGQL(
      page,
      "__ITEMS_LIST__",
      campaignsList,
    );

    await interceptGQL(
      page,
      "__GET_CAMPAIGN__",
      campaignsDetails,
    );

    await checkLoadingBlocker(page);

    await listHeader.waitFor({ state: "attached" });

    listHeader.innerText().then(text => {
      expect(text).toBe("Список кампаний");
    });

    //  Проверяем активацию кнопок после выбора строки в списке
    await rowsCheckboxes.nth(1).check();

    expect(copyCampaignButton.isEnabled()).toBeTruthy();
    expect(publishCampaignButton.isEnabled()).toBeTruthy();
    expect(deselectCampaignButton.isEnabled()).toBeTruthy();

    //  Проверяем работу кнопки "Копировать"
    copyCampaignButton.click();

    await copyCampaignWrapper.waitFor({ state: "attached" });

    //  Тестируем модалку копирования кампании

    expect(copyCampaignCloseCrossButton.isVisible()).toBeTruthy();
    expect(await copyCampaignHeader.textContent()).toBe("Для копий кампаний необходимо указать период");
    expect(await copingCampaignTitle.textContent()).toBe("COPY Test campaign");
    expect(copyCampaignSubmitButton.isVisible()).toBeTruthy();
    expect(copyCampaignCloseButton.isVisible()).toBeTruthy();

    copyCampaignCloseCrossButton.click();

    await copyCampaignWrapper.waitFor({ state: "detached" });

    copyCampaignButton.click();

    await copyCampaignWrapper.waitFor({ state: "attached" });

    copyCampaignCloseButton.click();

    await copyCampaignWrapper.waitFor({ state: "detached" });

    copyCampaignButton.click();

    await copyCampaignWrapper.waitFor({ state: "attached" });

    await copyCampaignSubmitButton.click();

    const helperText = page.getByText("Поле обязательно к заполнению");

    expect(await helperText.count()).toBe(2);

    await datePicker.first().fill("01.01.2001");
    await datePicker.nth(1).fill("01.11.2001");

    copyCampaignSubmitButton.click();

    await interceptGQL(
      page,
      "__GET_CAMPAIGN_BY_IDS__",
      fullCampaignsDetailsOnCopy,
    );

    await interceptGQL(
      page,
      "__STORE_CAMPAIGN__",
      storeCampaign,
      copyCampaignPayload,
    );

    await interceptGQL(
      page,
      "__ITEMS_LIST__",
      itemsListAfterCopy,
    );
    
    await interceptGQL(
      page,
      "__ITEMS_COUNT__",
      itemsCountAfterCopy,
    );

    await interceptGQL(
      page,
      "__GET_CAMPAIGN__",
      campaignsDetailsAfterCopy,
    );

    await page.getByText("Кампания скопирована").waitFor({ state: "visible" });

    await copyCampaignWrapper.waitFor({ state: "detached" });

    await checkLoadingBlocker(page);

    await listRow.first().waitFor({ state: "attached" });

    // expect(await listRow.count()).toBe(3);
    
    //  Тестируем кнопку "Опубликовать"
    await rowsCheckboxes.nth(1).check();

    publishCampaignButton.click();

    await interceptGQL(
      page,
      "__PUBLISH_CAMPAIGN__",
      publishCampaign,
      publishCampaignPayload,
    );

    await page.getByText("Кампания опубликована").waitFor({ state: "visible" });
    await page.getByText("Кампания опубликована").waitFor({ state: "detached" });
    
    //  Тестируем кнопку "Снять"
    page.unroute("");

    await rowsCheckboxes.nth(1).check();

    deselectCampaignButton.click();

    await interceptGQL(
      page,
      "__GET_CAMPAIGN_BY_IDS__",
      fullCampaignsDetailsOnCopy,
    );

    await interceptGQL(
      page,
      "__STORE_CAMPAIGN__",
      storeCampaign,
      depublishPaypoad,
    );

    await page.getByText("Публикация кампании снята").waitFor({ state: "visible" });
  });

  test("Test requests error", async ({ page }) => {
    const {
      deleteButton,
      deleteDialogWrapper,
      deleteDialogCancelButton,
      deleteDialogDeleteButton,
      rowsCheckboxes,
      copyCampaignButton,
      publishCampaignButton,
      deselectCampaignButton,
      copyCampaignWrapper,
      copyCampaignSubmitButton,
      copyCampaignCloseButton,
      datePicker,
    } = getComponents(page);

    //  Тестируем ошибку при удалении кампании
    await deleteButton.click();

    await deleteDialogWrapper.waitFor({ state: "attached" });

    await deleteDialogDeleteButton.waitFor({ state: "visible" });

    deleteDialogDeleteButton.click();

    await interceptGQL(
      page,
      "__DELETE_ENTITY__",
      responceError,
    );

    await page.getByText("Не удалось удалить элементы").waitFor({ state: "visible" });

    await deleteDialogWrapper.waitFor({ state: "attached" });

    await deleteDialogCancelButton.click();

    await deleteDialogWrapper.waitFor({ state: "detached" });

    await page.getByText("Не удалось удалить элементы").waitFor({ state: "detached" });

    //  Тестируем ошибку при копировании кампании
    await rowsCheckboxes.nth(1).click({ force: true });
    await rowsCheckboxes.nth(1).click();

    copyCampaignButton.click();

    await copyCampaignWrapper.waitFor({ state: "attached" });

    await datePicker.first().fill("01.01.2001");
    await datePicker.nth(1).fill("01.11.2001");

    copyCampaignSubmitButton.click();
    
    await interceptGQL(
      page,
      "__GET_CAMPAIGN_BY_IDS__",
      fullCampaignsDetailsOnCopy,
    );

    await interceptGQL(
      page,
      "__STORE_CAMPAIGN__",
      responceError,
    );

    await page.getByText("Не удалось скопировать кампанию").waitFor({ state: "visible" });
    
    copyCampaignCloseButton.click();

    await copyCampaignWrapper.waitFor({ state: "detached" });

    //  Тестируем ошибку при публикации
    await rowsCheckboxes.nth(1).click();
    await rowsCheckboxes.nth(1).click();

    publishCampaignButton.click();

    await interceptGQL(
      page,
      "__PUBLISH_CAMPAIGN__",
      responceError,
    );

    await page.getByText("Не удалось опубликовать кампанию").waitFor({ state: "visible" });

    //  Тестируем ошибку при снятии публикации

    await rowsCheckboxes.nth(1).click();
    await rowsCheckboxes.nth(1).click();

    deselectCampaignButton.click();
    
    await interceptGQL(
      page,
      "__GET_CAMPAIGN_BY_IDS__",
      fullCampaignsDetailsOnCopy,
    );

    await interceptGQL(
      page,
      "__STORE_CAMPAIGN__",
      responceError,
    );

    await page.getByText("Не удалось снять публикацию кампании").waitFor({ state: "visible" });
  });
});
