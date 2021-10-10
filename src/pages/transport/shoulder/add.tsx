import EntityEdit from "../../../containers/EntityEdit";

export default class extends EntityEdit<{}> {
    static async getInitialProps(): Promise<{}> {
        return this.getEntityEditProps("transport_shoulder", undefined, {})
    }
}