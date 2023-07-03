#!/bin/bash

#ID бота и чата
BOT_ID="1914871945:AAGRC7vgWUKDJZb_aQI1TWuiY4d_NWCUZps"
CHAT_ID="-519110018"

TIME="10"
URL="https://api.telegram.org/bot$BOT_ID/sendMessage"
TEXT="☣ CI/CD Job #$CI_PIPELINE_ID%0ADeploy status: $1 $2%0A%0A🔗 Pipeline: $CI_PIPELINE_URL%0A🔗 Project: $CI_PROJECT_URL%0A%0A🆔 Branch: https://gitlab.systems-fd.com/saas/saas-crm/-/tree/$CI_COMMIT_REF_NAME%0A📝 Task: $CI_COMMIT_REF_NAME%0A🔥 Version: $CI_COMMIT_TAG%0A%0A☘️ App URL: $3"

curl -s --max-time $TIME -d "chat_id=$CHAT_ID&disable_web_page_preview=1&text=$TEXT" $URL > /dev/null