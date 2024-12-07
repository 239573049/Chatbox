import { StateCreator } from "zustand";
import { ChatStore } from "./store";
import { ChatMessage, CreateMessageParams, SendMessageParams, SendThreadMessageParams } from "@/types/message";
import { nanoid } from "@/utils/uuid";

export interface ChatStoreAction {
    updateInputMessage: (vaule: string) => void;
    stopGenerateMessage: () => Promise<void>;
    addAIMessage: () => Promise<void>;
    setChatLoading: (loading: boolean) => void;
    
    /**
     * 删除指定id的消息
     * @param id 
     * @returns 
     */
    deleteMessage: (id: string) => Promise<void>;
    regenerateMessage: (id: string) => Promise<void>;
    translateMessage: (id: string, lang: string) => Promise<void>;
    ttsMessage: (id: string) => Promise<void>;
    
    /**
     * 删除并重新生成
     * @param id 
     * @returns 
     */
    delAndRegenerateMessage: (id: string) => Promise<void>;
    copyMessage: (id: string, content: string) => Promise<void>;
    openThreadCreator: (id: string) => Promise<void>;
    resendThreadMessage: (id: string) => Promise<void>;

    /**
     * 
     * @param id 
     * @returns 
     */
    delAndResendThreadMessage: (id: string) => Promise<void>;
    toggleMessageEditing: (id: string, editing: boolean) => Promise<void>;
    reInvokeToolMessage: (id: string) => Promise<void>;
    deleteToolMessage: (id: string) => Promise<void>;
    deleteUserMessageRagQuery: (id: string) => Promise<void>;
    rewriteQuery: (id: string) => Promise<void>;
    openMessageDetail: (id: string) => Promise<void>;
    modifyMessageContent: (id: string, content: string) => Promise<void>;
    sendThreadMessage: (params: SendThreadMessageParams) => Promise<void>;
    sendMessage: (params: SendMessageParams) => Promise<void>;
    updateSessionId: (id: string | null) => void;
    
    /**
     * 清空当前对话
     */
    clearConversation: () => Promise<void>;
}


export const chatActionSlice: StateCreator<
    ChatStore,
    [['zustand/devtools', never]],
    [],
    ChatStoreAction
> = (set, get) => ({
    updateInputMessage(vaule) {
        set({
            message: {
                ...get().message,
                value: vaule
            }
        })
    },
    async stopGenerateMessage() {
        set({
            isAIGenerating: false
        })
    },
    async addAIMessage() {

        const {
            activeSessionId,
            message: {
                value
            },
            content: {
                messagesMap
            }
        } = get();

        if (!activeSessionId) return;

        if (!value) return;

        set({
            isCreatingThreadMessage: true,
        })

        const newMessage: ChatMessage = {
            content: value,
            role: 'assistant',
            id: nanoid(),
            meta: {
                avatar: '🤖'
            },
            traceId: nanoid(),
            threadId: null,
            sessionId: activeSessionId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        // 从messagesMap中获取当前sessionId的messages
        const messages = messagesMap[activeSessionId] || [];

        set({
            content: {
                ...get().content,
                messagesMap: {
                    ...get().content.messagesMap,
                    [activeSessionId]: [...messages, newMessage]
                }
            },
            message: {
                ...get().message,
                value: ''
            }
        })
    },
    setChatLoading(loading) {
        set({
            content: {
                ...get().content,
                loading
            }
        })
    },
    async deleteMessage(id) {

    },
    async regenerateMessage(id) {

    },
    async translateMessage(id, lang) {

    },
    async ttsMessage(id) {

    },
    async openThreadCreator(id) {

    },
    async resendThreadMessage(id) {

    },
    async delAndResendThreadMessage(id) {

    },
    async toggleMessageEditing(id, editing) {

    },
    async copyMessage(id, content) {

    },
    async delAndRegenerateMessage(id) {

    },
    async reInvokeToolMessage(id) {

    },
    async deleteToolMessage(id) {

    },
    async deleteUserMessageRagQuery(id) {

    },
    async rewriteQuery(id) {

    },
    async openMessageDetail(id) {

    },
    async modifyMessageContent(id, content) {

    },
    async sendThreadMessage({
        message
    }) {

        const {
            activeSessionId,
            message: {
                value
            },
            content: {
                messagesMap
            }
        } = get();

        if (!activeSessionId) return;

        if (!value || value.trim() === '') return;

        set({
            isCreatingThreadMessage: true,
        })

        const newMessage: ChatMessage = {
            content: value,
            role: 'assistant',
            id: nanoid(),
            meta: {
                avatar: '🤖'
            },
            traceId: nanoid(),
            threadId: null,
            sessionId: activeSessionId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        // 从messagesMap中获取当前sessionId的messages
        const messages = messagesMap[activeSessionId] || [];

        set({
            content: {
                ...get().content,
                messagesMap: {
                    ...get().content.messagesMap,
                    [activeSessionId]: [...messages, newMessage]
                }
            },
            message: {
                ...get().message,
                value: ''
            }
        })
    },
    async sendMessage(params) {
        if (params.onlyAddUserMessage) {
            const {
                activeSessionId,
                message: {
                    value
                }
            } = get();

            if (!activeSessionId) return;

            if (!value || value.trim() === '') return;

            const newMessage: ChatMessage = {
                content: value,
                role: 'user',
                sessionId: activeSessionId!,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                id: nanoid(),
                meta: {
                    avatar: '😄'
                },
                traceId: nanoid(),
                threadId: null,
            };

            set({
                content: {
                    ...get().content,
                    messagesMap: {
                        ...get().content.messagesMap,
                        [activeSessionId]: [...(get().content.messagesMap[activeSessionId] || []), newMessage]
                    },
                    chatMessages: [...get().content.chatMessages, newMessage]
                },
                message: {
                    ...get().message,
                    value: ''
                }
            })
        } else {

            const {
                activeSessionId,
                message: {
                    value
                }
            } = get();

            if (!activeSessionId) return;


            if (!value || value.trim() === '') return;

            const newMessage: ChatMessage = {
                content: value,
                role: 'user',
                sessionId: activeSessionId!,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                id: nanoid(),
                meta: {
                    avatar: '😄'
                },
                traceId: nanoid(),
                threadId: null,
            };

            set({
                content: {
                    ...get().content,
                    messagesMap: {
                        ...get().content.messagesMap,
                        [activeSessionId]: [...(get().content.messagesMap[activeSessionId] || []), newMessage]
                    },
                    chatMessages: [...get().content.chatMessages, newMessage]
                },
                message: {
                    ...get().message,
                    value: ''
                }
            })
        }
    },
    updateSessionId(id) {
        set({
            activeSessionId: id
        })
    },
    async clearConversation() {

        const {
            activeSessionId,
            content: {
                messagesMap
            }
        } = get();

        if (!activeSessionId) return;

        messagesMap[activeSessionId] = [];

        set({
            content: {
                ...get().content,
                messagesMap
            }
        })
    }
})