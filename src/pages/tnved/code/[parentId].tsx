import EntityList from "..././../containers/EntityList";
import Router from 'next/router'
import {Breadcrumb} from "../../../components/Breadcrumbs";
import {tnvedCodeBranchLoader} from "../../../services/tnvedCodeBranchLoader";
import {TnvedCode} from "../../../services/tnvedCodeBranchLoader/interface";

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
                res.writeHead(307, {Location: '/tnved/code'});
                res.end()
            } else {
                // On the client, we'll use the Router-object
                // from the 'next/router' module.
                Router.replace('/tnved/code')
            }

            return {}
        }

        const breadcrumbs: Breadcrumb[] = [
            {
                icon: 'home',
                title: "Главная",
                link: {
                    href: "/",
                }
            },
            {
                icon: 'tnved',
                title: 'Управление кодами ТНВЭД',
                link: {
                    href: "/tnved/code",
                },
            },
        ];

        let tnvedCodes: TnvedCode[] = [];
        try {
            tnvedCodes = await tnvedCodeBranchLoader().LoadBranchesByIds([parentId]);
        } catch (e) {
        }

        const currentCode = tnvedCodes.find(c => c.id === parentId);
        if (!!currentCode) {
            tnvedCodes
                .filter(c => c.path.split(".").length <= currentCode.path.split(".").length)
                .sort((a, b) => {
                    return a.path.split(".").length < b.path.split(".").length
                        ? -1
                        : 1
                })
                .map(code => {
                    breadcrumbs.push({
                        title: code.name,
                        link: {
                            href: `/tnved/code/${code.id}`,
                        },
                    })
                })
            ;
        }

        return await this.getEntityListProps(
            "tnved_code",
            {},
            {
                parent: `{_equals: ${parentId}}`,
            },
            breadcrumbs,
        )
    }
}