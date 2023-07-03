import {EditFormGroup, EditPageConfiguration} from "../system/edit";
import {PageUrl} from "../system/list";
import {MinimalLengthValidator} from "../../../services/validation/validators/minimalLength";
import StringField from "../../../components/EditPage/Fields/StringField";
import CheckboxField from "../../../components/EditPage/Fields/CheckboxField";
import DomainsSelector from "../../../components/EditPageCustomFields/DomainsSelector";
import {ValueExistsValidator} from "../../../services/validation/validators/valueExists";
import {allDomainsAndProjectsLoader} from "../../../services/loaders/allDomainsAndProjects";
import {UniqueValueInColumnValidator} from "../../../services/validation/validators/uniqueValueInColumn";
import {getCurrentState, onReloadDomainsAndProjects} from "../../../context/AuthorizationContext";
import HiddenGroup from "../../../components/EditPageCustomFields/HiddenGroup";

export class ProjectEditPageConfig implements EditPageConfiguration<"project"> {
    groups: EditFormGroup<"project">[] = [
        {
            sizes: {xs: 12},
            fields: [
                {
                    field: "name",
                    title: "pages.project.edit.fields.name",
                    size: {xs: 12},
                    defaultValue: "",
                    validation: [
                        MinimalLengthValidator({minimalLength: 3}),
                        UniqueValueInColumnValidator({schema: "project", field: "name"}),
                    ],
                    component: StringField
                },
                {
                    field: "active",
                    title: "pages.project.edit.fields.active",
                    size: {xs: 12},
                    defaultValue: true,
                    validation: [],
                    component: CheckboxField
                },
            ]
        },
        {
            sizes: {xs: 12},
            component: HiddenGroup,
            fields: [
                {
                    field: "parent",
                    title: "pages.project.edit.fields.parent",
                    size: {xs: 12},
                    defaultValue: async () => {
                        const {domain} = getCurrentState()
                        return domain
                    },
                    validation: [
                        ValueExistsValidator({errorMessage: "pages.project.edit.fields.parent-error"}),
                    ],
                    component: DomainsSelector,
                    additionData: async () => {
                        return await allDomainsAndProjectsLoader().Load()
                    },
                    onAfterSave: async () => {
                        // После сохранения необходимо перезагрузить проекты
                        await onReloadDomainsAndProjects()
                    }
                },
            ]
        },
    ];
    schema: "project" = "project";
    listPageUrl: { (): PageUrl } = () => {
        const {domain} = getCurrentState()
        return {
            href: "/domain/[domainId]/project",
            as: `/domain/${domain}/project`
        }
    };
    isCopyEnabled: boolean = true;
    isSaveAndCloseEnabled: boolean = true;
    isSaveEnabled: boolean = true;
    editPageUrlGenerator: { (primaryKey: any): PageUrl } = pk => {
        const {domain} = getCurrentState()
        return {
            href: "/domain/[domainId]/project/[projectId]/edit",
            as: `/domain/${domain}/project/${pk}/edit`
        }
    };
}