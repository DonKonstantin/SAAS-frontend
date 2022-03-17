import React, {FC, useState} from "react";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useTheme} from "@mui/system";

// Свойства компонента
type AccordionFilterItemProps = {
    title: string
    children: React.ReactNode
}

// Компонент вывода складывающегося пункта фильтрации
const AccordionFilterItem: FC<AccordionFilterItemProps> = props => {
    const {title, children} = props
    const [isOpen, setIsOpen] = useState(true)
    const theme = useTheme();

    return <>
        <MuiAccordion
            expanded={isOpen}
            onChange={() => setIsOpen(s => !s)}
        >
            <MuiAccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                sx={{
                    color: theme.palette.mode === 'dark' ? 'grey.500' : 'grey.800',
                    fontWeight: 500,
                    p: 0,
                }}
            >
                {title}
            </MuiAccordionSummary>
            <MuiAccordionDetails sx={{p: 0}}>
                {children}
            </MuiAccordionDetails>
        </MuiAccordion>
    </>
}

// Экспортируем компонент
export default AccordionFilterItem