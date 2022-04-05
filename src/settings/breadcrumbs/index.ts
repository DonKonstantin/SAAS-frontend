import {BreadcrumbsStructure} from "./type";
import HomeIcon from '@mui/icons-material/Home';
import {getCurrentState} from "../../context/AuthorizationContext";

// Коллекция всех страниц хлебных крошек
export const breadcrumbs: { (): BreadcrumbsStructure } = () => {
    return {
        "/": {
            breadcrumb: "pages.main.breadcrumb",
            icon: HomeIcon,
            link: {href: "/"}
        },
        "/users": {
            breadcrumb: "pages.users.list.breadcrumb",
            link: {href: "/users"}
        },
        "/users/add": {
            breadcrumb: "pages.users.add.breadcrumb",
            link: {href: "/roles/add"}
        },
        "/users/edit/[entityId]": {
            breadcrumb: "pages.users.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => ({
                href: "/users/edit/[entityId]",
                as: `/users/edit/${entityEditPrimaryKey}`
            })
        },
        "/permission-category": {
            breadcrumb: "pages.permission_category.list.breadcrumb",
            link: {href: "/permission-category"}
        },
        "/permission-category/add": {
            breadcrumb: "pages.permission_category.add.breadcrumb",
            link: {href: "/permission-category/add"}
        },
        "/permission-category/edit/[entityId]": {
            breadcrumb: "pages.permission_category.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => ({
                href: "/permission-category/edit/[entityId]",
                as: `/permission-category/edit/${entityEditPrimaryKey}`
            })
        },
        "/permission": {
            breadcrumb: "pages.permission.list.breadcrumb",
            link: {href: "/permission"}
        },
        "/permission/add": {
            breadcrumb: "pages.permission.add.breadcrumb",
            link: {href: "/permission/add"}
        },
        "/permission/edit/[entityId]": {
            breadcrumb: "pages.permission.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => ({
                href: "/permission/edit/[entityId]",
                as: `/permission/edit/${entityEditPrimaryKey}`
            })
        },
        "/roles": {
            breadcrumb: "pages.role.list.breadcrumb",
            link: {href: "/roles"}
        },
        "/roles/add": {
            breadcrumb: "pages.role.add.breadcrumb",
            link: {href: "/roles/add"}
        },
        "/roles/edit/[entityId]": {
            breadcrumb: "pages.role.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => ({
                href: "/roles/edit/[entityId]",
                as: `/roles/edit/${entityEditPrimaryKey}`
            })
        },
        "/domain": {
            breadcrumb: "pages.domain.list.breadcrumb",
            link: {href: "/domain"}
        },
        "/domain/add": {
            breadcrumb: "pages.domain.add.breadcrumb",
            link: {href: "/domain/add"}
        },
        "/domain/[domainId]": {
            breadcrumb: () => {
                const {domain, domains} = getCurrentState()
                const currentDomain = domains.find(d => d.id === domain)

                return currentDomain?.name || "Unknown"
            },
            color: "success",
        },
        "/domain/[domainId]/edit": {
            breadcrumb: "pages.domain.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => ({
                href: "/domain/[domainId]/edit",
                as: `/domain/${entityEditPrimaryKey}/edit`
            })
        },
        "/domain/[domainId]/users": {
            breadcrumb: "pages.users.list.breadcrumb",
            link: () => {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/users",
                    as: `/domain/${domain}/users`
                }
            }
        },
        "/domain/[domainId]/users/add": {
            breadcrumb: "pages.users.add.breadcrumb",
            link: () => {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/users/add",
                    as: `/domain/${domain}/users/add`
                }
            }
        },
        "/domain/[domainId]/users/edit/[entityId]": {
            breadcrumb: "pages.users.edit.breadcrumb",
            link: ({entityEditPrimaryKey})=> {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/users/edit/[entityId]",
                    as: `/domain/${domain}/users/edit/${entityEditPrimaryKey}`
                }
            }
        },
        "/domain/[domainId]/roles": {
            breadcrumb: "pages.role.list.breadcrumb",
            link: () => {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/roles",
                    as: `/domain/${domain}/roles`
                }
            }
        },
        "/domain/[domainId]/roles/add": {
            breadcrumb: "pages.role.add.breadcrumb",
            link: () => {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/roles/add",
                    as: `/domain/${domain}/roles/add`
                }
            }
        },
        "/domain/[domainId]/roles/edit/[entityId]": {
            breadcrumb: "pages.role.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/roles/edit/[entityId]",
                    as: `/domain/${domain}/roles/edit/${entityEditPrimaryKey}`
                }
            }
        },
        "/domain/[domainId]/logs": {
            breadcrumb: "pages.SystemLogs.breadcrumb",
            link: () => {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/logs",
                    as: `/domain/${domain}/logs`
                }
            }
        },
        "/domain/[domainId]/project": {
            breadcrumb: "pages.project.list.breadcrumb",
            link: () => {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project",
                    as: `/domain/${domain}/project`,
                }
            }
        },
        "/domain/[domainId]/project/add": {
            breadcrumb: "pages.project.add.breadcrumb",
            link: () => {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project/add",
                    as: `/domain/${domain}/project/add`,
                }
            }
        },
        "/domain/[domainId]/project/[projectId]": {
            breadcrumb: () => {
                const {project, projects} = getCurrentState()
                const currentProject = projects.find(p => p.id === project)

                return currentProject?.name || "Unknown"
            },
            color: "warning",
        },
        "/domain/[domainId]/project/[projectId]/edit": {
            breadcrumb: "pages.project.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => {
                const {domain} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project/[projectId]/edit",
                    as: `/domain/${domain}/project/${entityEditPrimaryKey}/edit`,
                }
            }
        },
        "/domain/[domainId]/project/[projectId]/logs": {
            breadcrumb: "pages.project.logs.breadcrumb",
            link: () => {
                const {domain, project} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project/[projectId]/logs",
                    as: `/domain/${domain}/project/${project}/logs`,
                }
            }
        },
        "/domain/[domainId]/project/[projectId]/roles": {
            breadcrumb: "pages.role.list.breadcrumb",
            link: () => {
                const {domain, project} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project/[projectId]/roles",
                    as: `/domain/${domain}/project/${project}/roles`
                }
            }
        },
        "/domain/[domainId]/project/[projectId]/roles/add": {
            breadcrumb: "pages.role.add.breadcrumb",
            link: () => {
                const {domain, project} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project/[projectId]/roles/add",
                    as: `/domain/${domain}/project/${project}/roles/add`
                }
            }
        },
        "/domain/[domainId]/project/[projectId]/roles/edit/[entityId]": {
            breadcrumb: "pages.role.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => {
                const {domain, project} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project/[projectId]/roles/edit/[entityId]",
                    as: `/domain/${domain}/project/${project}/roles/edit/${entityEditPrimaryKey}`
                }
            }
        },
        "/domain/[domainId]/project/[projectId]/users": {
            breadcrumb: "pages.users.list.breadcrumb",
            link: () => {
                const {domain, project} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project/[projectId]/users",
                    as: `/domain/${domain}/project/${project}/users`
                }
            }
        },
        "/domain/[domainId]/project/[projectId]/users/add": {
            breadcrumb: "pages.users.add.breadcrumb",
            link: () => {
                const {domain, project} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project/[projectId]/users/add",
                    as: `/domain/${domain}/project/${project}/users/add`
                }
            }
        },
        "/domain/[domainId]/project/[projectId]/users/edit/[entityId]": {
            breadcrumb: "pages.users.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => {
                const {domain, project} = getCurrentState()
                return {
                    href: "/domain/[domainId]/project/[projectId]/users/edit/[entityId]",
                    as: `/domain/${domain}/project/${project}/users/edit/${entityEditPrimaryKey}`
                }
            }
        },
        "/notifications-template": {
            breadcrumb: "pages.notifications_template.list.breadcrumb",
            link: () => {
                return {
                    href: "/notifications-template",
                    as: `/notifications-template`,
                }
            }
        },
        "/notifications-template/add": {
            breadcrumb: "pages.notifications_template.add.breadcrumb",
            link: () => {
                return {
                    href: "/notifications-template/add",
                    as: `/notifications-template/add`,
                }
            }
        },
        "/notifications-template/edit/[entityId]": {
            breadcrumb: "pages.notifications_template.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => {
                return {
                    href: "/notifications-template/edit/[entityId]",
                    as: `/notifications-template/edit/${entityEditPrimaryKey}`,
                }
            }
        },
        "/notification-rules": {
            breadcrumb: "pages.notification_config.list.breadcrumb",
            link: () => {
                return {
                    href: "/notification-rules",
                    as: `/notification-rules`,
                }
            }
        },
        "/notification-rules/add": {
            breadcrumb: "pages.notification_config.add.breadcrumb",
            link: () => {
                return {
                    href: "/notification-rules/add",
                    as: `/notification-rules/add`,
                }
            }
        },
        "/notification-rules/edit/[entityId]": {
            breadcrumb: "pages.notification_config.edit.breadcrumb",
            link: ({entityEditPrimaryKey}) => {
                return {
                    href: "/notification-rules/edit/[entityId]",
                    as: `/notification-rules/edit/${entityEditPrimaryKey}`,
                }
            }
        },
        "/media": {
            breadcrumb: "pages.mediaLibrary.breadcrumb",
            link: () => {
                return {
                    href: "/media/storage",
                    as: `/media/storage`,
                }
            }
        },
        "/media/upload": {
            breadcrumb: "pages.mediaLibraryUpload.breadcrumb",
            link: () => {
                return {
                    href: "/media-rules/upload",
                    as: `/media-rules/upload`,
                }
            }
        },
        "/media/check": {
            breadcrumb: "pages.mediaLibraryCheck.breadcrumb",
            link: () => {
                return {
                    href: "/media-rules/check",
                    as: `/media-rules/check`,
                }
            }
        },
        "/logs": {
            breadcrumb: "pages.SystemLogs.breadcrumb",
            link: () => {
                return {
                    href: "/logs",
                    as: `/logs`,
                }
            }
        }
    }
}
