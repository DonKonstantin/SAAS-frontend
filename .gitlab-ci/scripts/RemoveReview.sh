#!/bin/bash

#ID бота и чата
BOT_ID="1914871945:AAGRC7vgWUKDJZb_aQI1TWuiY4d_NWCUZps"
CHAT_ID="-519110018"

TIME="10"
URL="https://api.telegram.org/bot$BOT_ID/sendMessage"
TEXT="☣ CI/CD Job #$CI_PIPELINE_ID%0ADeploy cleanup status: $1 $2%0A%0A🔗 Pipeline: $CI_PIPELINE_URL%0A🔗 Project: $CI_PROJECT_URL%0A%0A🚧Some URL is not available any more:%0A$3"

curl -s --max-time $TIME -d "chat_id=$CHAT_ID&disable_web_page_preview=1&text=$TEXT" $URL > /dev/null