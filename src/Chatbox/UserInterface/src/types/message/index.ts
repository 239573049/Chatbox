import { BaseDataModel } from "../meta";

export type MessageRoleType = 'user' | 'system' | 'assistant' | 'tool';


export interface ChatFileItem {
    fileType: string;
    id: string;
    name: string;
    size: number;
    url: string;
}


export interface ChatFileChunk {
    fileId: string;
    fileType: string;
    fileUrl: string;
    filename: string;
    id: string;
    similarity?: number;
    text: string;
}

export interface ChatMessageError {
    error: string;
    code: string;
}


export interface ChatMessage extends BaseDataModel {
    chunksList?: ChatFileChunk[];
    error?: ChatMessageError | null;
    content: string;
    // 扩展字段
    extra?: {
        fromModel?: string;
        fromProvider?: string;
    } & Record<string, any>;
    fileList?: ChatFileItem[];
    /**
     * this is a deprecated field, only use in client db
     * and should be remove after migrate to pglite
     * this field is replaced by fileList and imageList
     * @deprecated
     */
    files?: string[];
    imageList?: ChatImageItem[];
    /**
     * observation id
     */
    observationId?: string;

    /**
     * parent message id
     */
    parentId?: string;
    plugin?: ChatPluginPayload;

    pluginState?: any;
    /**
     * quoted other message's id
     */
    quotaId?: string;
    ragQuery?: string | null;
    ragQueryId?: string | null;
    ragRawQuery?: string | null;
    /**
     * message role type
     */
    role: MessageRoleType;

    sessionId?: string;
    threadId?: string | null;

    tool_call_id?: string;
    tools?: ChatToolPayload[];
    /**
     * 保存到主题的消息
     */
    topicId?: string;
    /**
     * 观测链路 id
     */
    traceId?: string;
}

export interface ChatImageItem {
    alt: string;
    id: string;
    url: string;
}

export interface ChatPluginPayload {
    apiName: string;
    arguments: string;
    identifier: string;
    type: any;
}

export interface ChatToolPayload {
    apiName: string;
    arguments: string;
    id: string;
    identifier: string;
    type: any;
}




export interface SendThreadMessageParams {
    /**
     * create a thread
     */
    createNewThread?: boolean;
    // files?: UploadFileItem[];
    message: string;
    onlyAddUserMessage?: boolean;
}


export interface SendMessageParams {
    /**
     * create a thread
     */
    createThread?: boolean;
    /**
     *
     * https://github.com/lobehub/lobe-chat/pull/2086
     */
    isWelcomeQuestion?: boolean;
    message: string;
    onlyAddUserMessage?: boolean;
}


export interface CreateMessageParams extends Partial<Omit<ChatMessage, 'content' | 'role' | 'chunksList'>> {
  content: string;
  error?: ChatMessageError | null;
  files?: string[];
  fromModel?: string;
  fromProvider?: string;
  role: MessageRoleType;
  sessionId: string;
  threadId?: string | null;
  traceId?: string;
}