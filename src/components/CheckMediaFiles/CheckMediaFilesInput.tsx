import {FC, useState} from "react";
import {TextField} from "@mui/material";
import {useCheckMediaFilesContext} from "./CheckMediaFilesContext";
import {styled} from "@mui/material/styles";

const StyledTextArea = styled(TextField)`
    & {
        height: 100%
    }
    & .MuiInputBase-root {
        height: 100%;
        align-items: flex-start;
        padding-left: 0
    }
    fieldset {
        border: none
    }
`;

const CheckMediaFilesInput: FC = props => {
    const {addFileRawData, rawData} = useCheckMediaFilesContext();

    const submitHandler = (event) => {
        event.preventDefault();
        event.persist();

        addFileRawData(event.target.value);
    }

    return (
        <form onSubmit={submitHandler} style={{height: "100%"}}>
            <StyledTextArea
                multiline
                fullWidth
                value={rawData}
                onChange={submitHandler}
            />
        </form>
    )
}

export default CheckMediaFilesInput;
