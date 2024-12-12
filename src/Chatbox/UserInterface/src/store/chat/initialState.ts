import { ChatMessage } from "@/types/message";

export interface ChatState {
    message: {
        loading: boolean,
        value: string
    },
    isAIGenerating: boolean,
    isCreatingThreadMessage: boolean,
    content: {
        loading: boolean,
        chatMessages: ChatMessage[],
        messagesMap: Record<string, ChatMessage[]>;
    },
    thread: {
        activeThreadId: string | null,
        isCreatingThread: boolean
    },
    messageEditingIds: string[],
    messageGeneratingIds: string[],
    activeSessionId: string | null
}

export const initialState: ChatState = {
    message: {
        loading: false,
        value: ''
    },
    isAIGenerating: false,
    isCreatingThreadMessage: false,
    content: {
        loading: false,
        chatMessages: [],
        messagesMap: {}
    },
    thread: {
        activeThreadId: null,
        isCreatingThread: false
    },
    messageEditingIds: [],
    messageGeneratingIds: [],
    activeSessionId: null,
};

