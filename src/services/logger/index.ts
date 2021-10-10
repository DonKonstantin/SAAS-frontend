import {LoggerFactory} from "./Logger";
import {ConsoleLoggerFactory} from "./ConsoleLoggerFactory";
import getConfig from 'next/config';
import {clientServerDetector} from "../clientServerDetector";

const {publicRuntimeConfig} = getConfig();
let publicDebugState = publicRuntimeConfig.debug

export const loggerFactory: {(): LoggerFactory} = () => {
    const isDebug = clientServerDetector().isServer()
        ? publicRuntimeConfig.debug
        : publicDebugState
    ;

    return new ConsoleLoggerFactory(isDebug)
}

export const setDebugState = (state: boolean) => {
    publicDebugState = state
}
