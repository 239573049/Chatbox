
import urlJoin from 'url-join';

export const OFFICIAL_SITE = 'https://token-ai.cn/';

export const UTM_SOURCE = 'chat_preview';

export const MANUAL_UPGRADE_URL = urlJoin(OFFICIAL_SITE, '/upstream');

export const ModelUrl = urlJoin(OFFICIAL_SITE,"agent-model.json")

export const ChatUrl = urlJoin(OFFICIAL_SITE,"/api/chat")