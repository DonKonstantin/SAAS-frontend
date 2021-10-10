import {ReduxFactory} from "./system/ReduxFactory";
import {ReduxSingletonFactory} from "./system/ReduxSingletonFactory";
import {baseReduxFactory} from "./system";
import {clientServerDetector} from "../services/clientServerDetector";

export const reduxFactory: {(): ReduxFactory} = () => new ReduxSingletonFactory(
    baseReduxFactory(),
    clientServerDetector().isServer(),
);
