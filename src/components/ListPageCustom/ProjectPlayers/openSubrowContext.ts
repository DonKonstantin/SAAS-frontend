import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";

export const [openRowsChange$, setOpenRows] = createSignal<string[]>();

export const [useOpenRows] = bind(openRowsChange$, []);
