import EntityList from "../../containers/EntityList";

// Страница листинга
export default class extends EntityList<{}> {
    // Предварительная загрузка данных страницы
    static async getInitialProps(): Promise<{}> {
        return await this.getEntityListProps(
            "locations",
            {},
            {
                parent: `{_equals: "null"}`,
            },
        )
    }
}