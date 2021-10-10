import EntityEdit from "../../../containers/EntityEdit";

export default class extends EntityEdit<{}> {
    static async getInitialProps({query}: any): Promise<{}> {
        return this.getEntityEditProps("transport_unit", undefined, {}, {
            defaultValues: {
                default_name: query.default_name,
            },
            isNeedCloseWindowAfterExit: !!query.close_on_exit,
        })
    }
}