import EntityEdit from "../../../../containers/EntityEdit";

export default class extends EntityEdit<{}> {
    static async getInitialProps({query}: any): Promise<{}> {
        return this.getEntityEditProps("tnved_company_category", query.entityId, {}, {
            isNeedCloseWindowAfterExit: !!query.close_on_exit,
        })
    }
}