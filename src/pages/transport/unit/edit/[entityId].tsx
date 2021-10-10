import EntityEdit from "../../../../containers/EntityEdit";

export default class extends EntityEdit<{}> {
    static async getInitialProps({query}: any): Promise<{}> {
        return this.getEntityEditProps("transport_unit", query.entityId, {}, {
            isNeedCloseWindowAfterExit: !!query.close_on_exit,
        })
    }
}