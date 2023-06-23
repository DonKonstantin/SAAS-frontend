import { Locator, Page } from "@playwright/test";

export const getComponents = (page: Page): Record<string, Locator> => {
  const breadcrumbs = page.getByTestId("breadcrumb");
  const listHeader = page.getByTestId("listHeader");
  const commonDeleteButton = page.getByTestId("commonDeleteButton");
  const editButton = page.getByTestId('editButton').first();
  const rowsCheckboxes = page.getByTestId("rowCheckbox").getByRole("checkbox");
  const editOrAddCampaignWrapper = page.getByTestId("editOrAddCampaignWrapper");
  const createCampaignButton = page.getByTestId("createCampaignButton");
  const copyCampaignButton = page.getByTestId("copyCampaignButton");
  const publishCampaignButton = page.getByTestId("publishCampaignButton");
  const deselectCampaignButton = page.getByTestId("deselectCampaignButton");
  const listRow = page.getByTestId("listRow");

  //  Модалка удаления кампании
  const deleteButton = page.getByTestId('deleteButton').first();
  const deleteDialogWrapper = page.getByTestId("deleteDialogWrapper");
  const deleteDialogTitle = page.getByTestId("deleteDialogTitle");
  const deleteDialogText = page.getByTestId("deleteDialogText");
  const deleteDialogCancelButton = page.getByTestId("deleteDialogCancelButton");
  const deleteDialogDeleteButton = page.getByTestId("deleteDialogDeleteButton");
  
  //  Модалка копирования кампании
  const copyCampaignWrapper = page.getByTestId("copyCampaignWrapper");
  const copyCampaignCloseCrossButton = page.getByTestId("copyCampaignCloseCrossButton");
  const copyCampaignHeader = page.getByTestId("copyCampaignHeader");
  const copingCampaignTitle = page.getByTestId("copingCampaignTitle");
  const datePicker = page.getByTestId("datePicker").getByRole("textbox");
  const copyCampaignSubmitButton = page.getByTestId("copyCampaignSubmitButton");
  const copyCampaignCloseButton = page.getByTestId("copyCampaignCloseButton");

  return {
    breadcrumbs,
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
  };
};