import EntityList from "../../containers/EntityList";
import Router from 'next/router'
import {locationsBranchLoader} from "../../services/locationsBranchLoader";
import {LocationBranchData} from "../../services/locationsBranchLoader/interface";
import {Breadcrumb} from "../../components/Breadcrumbs";

// Сортируем ветку по вложенности
const orderLocationsTree = (locations: LocationBranchData[], parent: string | null = null): LocationBranchData[] => {
    const childrenLocations = locations.filter(l => l.parent === (parent ? parseInt(parent) : null));

    const result = [...childrenLocations];
    childrenLocations.map(loc => {
        if (!locations.find(l => l.parent === parseInt(loc.id))) {
            return
        }

        result.push(...orderLocationsTree(locations, loc.id));
    });

    return result
};

// Страница листинга
export default class extends EntityList<{}> {
    // Предварительная загрузка данных страницы
    static async getInitialProps({res, query}: any): Promise<{}> {
        const parentId = query.parentId as string;
        if (!parentId) {
            if (res) {
                // On the server, we'll use an HTTP response to
                // redirect with the status code of our choice.
                // 307 is for temporary redirects.
                res.writeHead(307, {Location: '/locations'});
                res.end()
            } else {
                // On the client, we'll use the Router-object
                // from the 'next/router' module.
                Router.replace('/locations')
            }

            return {}
        }

        const locations = await locationsBranchLoader().Load([parentId]);
        const breadcrumbs: Breadcrumb[] = [
            {
                icon: 'home',
                title: "Главная",
                link: {
                    href: "/",
                }
            },
            {
                icon: 'geo',
                title: 'Управление гео-объектами',
                link: {
                    href: "/locations",
                },
            },
        ];

        orderLocationsTree(locations).map(loc => {
            breadcrumbs.push({
                title: loc.default_name,
                link: {
                    href: `/locations/${loc.id}`,
                },
            },)
        });

        return await this.getEntityListProps(
            "locations",
            {},
            {
                parent: `{_equals: ${parentId}}`,
            },
            breadcrumbs,
        )
    }
}