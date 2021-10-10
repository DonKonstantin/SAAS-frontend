import EntityEdit from "../../containers/EntityEdit";

export default class extends EntityEdit<{}> {
    static async getInitialProps({query}: any): Promise<{}> {
        return this.getEntityEditProps("role", undefined, {}, {
            defaultValues: {
                name: query.name,
            },
            isNeedCloseWindowAfterExit: !!query.close_on_exit,
        })
    }
}