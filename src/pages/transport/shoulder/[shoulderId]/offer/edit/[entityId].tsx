import EntityEdit from "../../../../../../containers/EntityEdit";
import {TransportShoulderEdit} from "../../../../../../settings/pages/edit/shoulder";
import {TransportShoulderOfferEdit} from "../../../../../../settings/pages/edit/shoulderOffer";

export default class extends EntityEdit<{}> {
    static async getInitialProps({query}: any): Promise<{}> {
        const editShoulderConfig = new TransportShoulderEdit();
        const editShouldersOfferConfig = new TransportShoulderOfferEdit();
        return this.getEntityEditProps("transport_shoulder_offer", query.entityId, {}, {
            defaultValues: {
                shoulder_id: query.shoulderId,
            },
            isNeedCloseWindowAfterExit: false,
            closeUrl: editShoulderConfig.editPageUrlGenerator(query.shoulderId),
            customBreadcrumbs: [
                {
                    icon: 'home',
                    title: "Главная",
                    link: {
                        href: "/",
                    }
                },
                {
                    title: editShoulderConfig.listPageConfig.header,
                    link: editShoulderConfig.listPageUrl,
                },
                {
                    title: editShoulderConfig.header(query.shoulderId),
                    link: editShoulderConfig.editPageUrlGenerator(query.shoulderId)
                },
                {
                    title: editShouldersOfferConfig.header(query.entityId),
                },
            ],
        })
    }
}