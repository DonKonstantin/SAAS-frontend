import {Home} from "@material-ui/icons";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import CommentIcon from '@material-ui/icons/Comment';
import {Collection} from "../../services/types";
import React from "react";

export type IconsCollection = Collection<React.ComponentType<any>>
export const Icons = <Collection<React.ComponentType<any>>>{
    home: Home,
    geo: LocationCityIcon,
    tnved: CommentIcon,
};