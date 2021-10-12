import HomeIcon from '@mui/icons-material/Home';
import {Collection} from "../../services/types";
import React from "react";

export type IconsCollection = Collection<React.ComponentType<any>>
export const Icons = <Collection<React.ComponentType<any>>>{
    home: HomeIcon,
};