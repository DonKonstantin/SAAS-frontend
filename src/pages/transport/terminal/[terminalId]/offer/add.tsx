import EntityEdit from "../../../../../containers/EntityEdit";
import {TransportTerminalEdit} from "../../../../../settings/pages/edit/terminal";
import {TransportTerminalOfferEdit} from "../../../../../settings/pages/edit/terminalOffer";

export default class extends EntityEdit<{}> {
    static async getInitialProps({query}: any): Promise<{}> {
        const editTermConfig = new TransportTerminalEdit();
        const editTermOfferConfig = new TransportTerminalOfferEdit();
        return this.getEntityEditProps("transport_terminal_offer", undefined, {}, {
            defaultValues: {
                terminal_id: query.terminalId,
            },
            isNeedCloseWindowAfterExit: false,
            closeUrl: editTermConfig.editPageUrlGenerator(query.terminalId),
            customBreadcrumbs: [
                {
                    icon: 'home',
                    title: "Главная",
                    link: {
                        href: "/",
                    }
                },
                {
                    title: editTermConfig.listPageConfig.header,
                    link: editTermConfig.listPageUrl,
                },
                {
                    title: editTermConfig.header(query.terminalId),
                    link: editTermConfig.editPageUrlGenerator(query.terminalId)
                },
                {
                    title: editTermOfferConfig.header(undefined),
                },
            ],
        })
    }
}