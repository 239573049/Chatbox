import { StateCreator } from "zustand";
import { ChatStore } from "./store";
import { ChatMessage, CreateMessageParams, SendMessageParams, SendThreadMessageParams } from "@/types/message";
import { nanoid } from "@/utils/uuid";
import Chat from "@/service/OpenAIService";

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

    /**
     * 设置当前会话的元数据
     * @param meta 
     */
    setMeta: (meta: {
        avatar: string,
        nickname: string
    }) => void;
}


export const chatActionSlice: StateCreator<
    ChatStore,
    [['zustand/devtools', never]],
    [],
    ChatStoreAction
> = (set, get) => ({
    setMeta(meta) {
        set({
            meta: meta
        })
    },
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
                avatar: '🤖',
                name: '智能助手'
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
        const {
            activeSessionId,
            content: {
                messagesMap,
                chatMessages
            }
        } = get();

        if (!activeSessionId) return;

        messagesMap[activeSessionId] = messagesMap[activeSessionId].filter((message) => message.id !== id);

        const newChatMessages = chatMessages.filter((message) => message.id !== id);

        set({
            content: {
                ...get().content,
                messagesMap,
                chatMessages: newChatMessages
            }
        })

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
                avatar: '🤖',
                name: '智能助手'
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
                    avatar: get().meta.avatar,
                    name: get().meta.nickname
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
                    avatar: get().meta.avatar,
                    name: get().meta.nickname
                },
                traceId: nanoid(),
                threadId: null,
            };

            get().content.chatMessages.push(newMessage);
            if (!get().content.messagesMap[activeSessionId]) {
                get().content.messagesMap[activeSessionId] = [];
            }
            get().content.messagesMap[activeSessionId].push(newMessage);

            set({
                content: {
                    ...get().content,
                    messagesMap: {
                        ...get().content.messagesMap,
                        [activeSessionId]: [...(get().content.messagesMap[activeSessionId] || [])]
                    },
                    chatMessages: [...get().content.chatMessages]
                },
                message: {
                    ...get().message,
                    value: ''
                }
            })

            // 在添加一条AI消息
            const assistantMessage: ChatMessage = {
                content: '',
                role: 'assistant',
                sessionId: activeSessionId!,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                id: nanoid(),
                meta: {
                    avatar: '🤖',
                    name: '智能助手'
                },
                traceId: nanoid(),
                threadId: null,
            };

            const openAIMessage = [] as {
                role: string,
                content: string | {
                    type: string,
                    text: string,
                    image_url: string,
                }
            }[];

            get().content.messagesMap[activeSessionId].forEach((message) => {
                openAIMessage.push({
                    role: message.role,
                    content: message.content
                });
            });


            get().content.chatMessages.push(assistantMessage);
            if (!get().content.messagesMap[activeSessionId]) {
                get().content.messagesMap[activeSessionId] = [];
            }
            get().content.messagesMap[activeSessionId].push(assistantMessage);

            set({
                isAIGenerating: true,
                isCreatingThreadMessage: true,
                content: {
                    ...get().content,
                    messagesMap: {
                        ...get().content.messagesMap,
                        [activeSessionId]: [...(get().content.messagesMap[activeSessionId])]
                    },
                    chatMessages: [...get().content.chatMessages, assistantMessage],
                    loading: true
                },
            })

            await Chat({
                messages: openAIMessage,
                handleMessageUpdate: (msg) => {
                    const updatedChatMessages = get().content.chatMessages.map((message) => {
                        if (message.id === assistantMessage.id) {
                            return { ...message, content: message.content + msg };
                        }
                        return message;
                    });

                    const updatedMessagesMap = {
                        ...get().content.messagesMap,
                        [activeSessionId]: get().content.messagesMap[activeSessionId].map((message) => {
                            if (message.id === assistantMessage.id) {
                                return { ...message, content: message.content + msg };
                            }
                            return message;
                        })
                    };

                    set({
                        content: {
                            ...get().content,
                            chatMessages: updatedChatMessages,
                            messagesMap: updatedMessagesMap
                        }
                    });
                },
                handleMessageEnd: () => {
                    set({
                        isCreatingThreadMessage: false,
                        isAIGenerating: false,
                        content: {
                            ...get().content,
                            loading: false,

                        }
                    })
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
                messagesMap,
                chatMessages
            }
        } = get();

        if (!activeSessionId) return;

        const newChatMessages = chatMessages.filter((message) => message.sessionId !== activeSessionId);

        messagesMap[activeSessionId] = [];

        set({
            content: {
                ...get().content,
                messagesMap,
                chatMessages: newChatMessages
            }
        })
    }
})