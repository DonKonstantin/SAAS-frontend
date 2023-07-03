import {FC, useMemo, useRef} from "react";
import {Grid, Stack} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import {usePreviewTemplateNotification} from "./$PreviewNotificationContext";

type Props = {};

/***
 * Фрейм для изолированного просмотра рассылки
 */
const NotificationTemplatePreviewIframe: FC<Props> = () => {
    const iframeRef = useRef<HTMLDivElement | null>(null);
    const {
        width,
        height
    } = useMemo(() => {
        if (!iframeRef) {
            return  {
                width: "100%",
                height: "100%"
            };
        }

        return {
            width: !!iframeRef?.current ? (iframeRef?.current?.offsetWidth - 48) : "100%",
            height: 300
        }
    }, [iframeRef]);

    const {
        renderResult,
        isUpdateRender
    } = usePreviewTemplateNotification();

    return (
        <Grid item>
            <div
                ref={iframeRef}
            />
            {isUpdateRender && (
                    <Stack spacing={1}>
                        <Skeleton animation="wave" variant={"rectangular"} width={"60%"}/>
                        <Skeleton animation="wave" variant={"rectangular"}/>
                        <Skeleton animation="wave" variant={"rectangular"} height={100}/>
                        <Skeleton animation="wave" variant={"rectangular"} height={90}/>
                        <Skeleton animation="wave" variant={"rectangular"}/>
                        <Skeleton animation="wave" variant={"rectangular"}/>
                    </Stack>
            )}
            {!isUpdateRender && (
                <iframe
                    srcDoc={renderResult}
                    frameBorder="0"
                    width={width}
                    height={height}
                />
            )}
        </Grid>
    )
}

export default NotificationTemplatePreviewIframe;
