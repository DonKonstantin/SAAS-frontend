import {ClientServerDetector} from "./ClientServerDetector";
import {BaseClientServerDetector} from "./BaseClientServerDetector";

export type ClientServerDetectorFactory = {(): ClientServerDetector}
export const clientServerDetector: ClientServerDetectorFactory = () => new BaseClientServerDetector();
