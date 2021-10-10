import {GraphQLClient} from "./GraphQLClient";
import {Client} from "./Client";
import getConfig from 'next/config';
import {authorizationSelector} from "../../reduxStore/selectors/AuthorizationSelectors";
import {store} from "../../reduxStore/system";
import {loggerFactory} from "../logger";
import {clientServerDetector} from "../clientServerDetector";
import {
    ApolloLink,
    ApolloClient,
    createHttpLink,
    NormalizedCacheObject,
    InMemoryCache,
    split,
} from "@apollo/client";
import * as ws from 'ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import {getMainDefinition} from "@apollo/client/utilities";
import {MainClient} from "./MainClient";
import {SubscriptionClient} from "subscriptions-transport-ws";
import {ReduxStore} from "../../reduxStore/ReduxStore";

// Получение токена авторизации
export const getToken: {(token?:string): string} = token => {
    let headersToken: string = authorizationSelector(store()?.getState() || {} as ReduxStore).token;
    if (token) {
        headersToken = token
    }

    return headersToken
};

// Генерация ссылки для клиента GraphQL
const getLink: {(): ApolloLink} = () => {
    const {publicRuntimeConfig, serverRuntimeConfig} = getConfig();
    const graphQlUrl = clientServerDetector().isServer() ? serverRuntimeConfig.env.SSR_GRAPHQL_SERVER : publicRuntimeConfig.graphQlEndpoint;

    return createHttpLink({
        uri: graphQlUrl,
        fetch: fetch,
    });
};

// Генерация ссылки для WS для клиента GraphQL
const getWsLink: {(token?: string): ApolloLink} = (token?: string) => {
    const {publicRuntimeConfig, serverRuntimeConfig} = getConfig();
    const wsGraphQlUrl = clientServerDetector().isServer() ? serverRuntimeConfig.env.SSR_GRAPHQL_WS_SERVER : publicRuntimeConfig.wsGraphQlEndpoint;

    return new WebSocketLink({
        uri: wsGraphQlUrl,
        options: {
            reconnect: true,
            lazy: true,
            connectionParams: {
                authToken: getToken(token),
            },
        },
        webSocketImpl: clientServerDetector().isServer() ? ws : undefined,
    })
};

// Фабрика клиента
export const graphQLClient: {(token?: string): GraphQLClient} = (token?: string) => {
    const mainLink = getLink();
    const wsLink = getWsLink(token);

    return new MainClient(
        new Client(
            loggerFactory(),
            () => ({
                client: new ApolloClient<NormalizedCacheObject>({
                    link: split(
                        ({ query }) => {
                            const definition = getMainDefinition(query);
                            return (
                                definition.kind === 'OperationDefinition' &&
                                definition.operation === 'subscription'
                            );
                        },
                        wsLink,
                        mainLink,
                    ),
                    cache: new InMemoryCache({
                        addTypename: false
                    }),
                    defaultOptions: {
                        watchQuery: {
                            fetchPolicy: 'no-cache',
                            errorPolicy: 'ignore',
                        },
                        query: {
                            fetchPolicy: 'no-cache',
                            errorPolicy: 'all',
                        },
                    },
                }),
                onClear: async (client: ApolloClient<NormalizedCacheObject>) => {
                    await client.clearStore();
                    client.stop();

                    const wssClient = (wsLink as any).subscriptionClient as SubscriptionClient;
                    wssClient.unsubscribeAll();
                    wssClient.close(true);
                }
            }),
        ),
        getToken(token),
    )
};
