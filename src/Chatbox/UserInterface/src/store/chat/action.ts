import { StateCreator } from "zustand";
import { ChatStore } from "./store";
import { ChatMessage, CreateMessageParams, SendMessageParams, SendThreadMessageParams } from "@/types/message";
import { nanoid } from "@/utils/uuid";
import Chat from "@/service/OpenAIService";
import SettingContext from "@/service/SettingContext";
import { message } from "antd";

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

    /**
     * 重新生成
     * @param id 
     * @returns 
     */
    regenerateMessage: (id: string) => Promise<void>;
    translateMessage: (id: string, lang: string) => Promise<void>;
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

    /**
     * 更新对话内容
     * @param id 
     * @param content 
     * @returns 
     */
    modifyMessageContent: (id: string, content: string) => Promise<void>;
    sendThreadMessage: (params: SendThreadMessageParams) => Promise<void>;
    sendMessage: (params: SendMessageParams) => Promise<void>;

    /**
     * 更新会话id
     * @param id 
     * @returns 
     */
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
            isAIGenerating: false,
            isCreatingThreadMessage: false,
            content: {
                ...get().content,
                loading: false
            }
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
        const {
            activeSessionId,
            content: {
                messagesMap,
                chatMessages
            }
        } = get();

        if (!activeSessionId) return;

        // 找到要重新生成的消息的索引位置
        const messageIndex = messagesMap[activeSessionId].findIndex(msg => msg.id === id);
        if (messageIndex === -1) return;

        // 获取目标消息及其之前的所有消息
        const previousMessages = messagesMap[activeSessionId]
            .slice(0, messageIndex + 1)
            .map(msg => ({
                role: msg.role,
                content: msg.content
            }));

        // 更新消息列表，删除目标消息之后的所有消息
        messagesMap[activeSessionId] = messagesMap[activeSessionId].slice(0, messageIndex + 1);

        // 创建新的AI消息
        const newMessage: ChatMessage = {
            content: '',
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

        // 更新状态
        set({
            isAIGenerating: true,
            content: {
                ...get().content,
                messagesMap: {
                    ...messagesMap,
                    [activeSessionId]: [...messagesMap[activeSessionId], newMessage]
                },
                chatMessages: [...chatMessages.filter(msg =>
                    msg.sessionId !== activeSessionId ||
                    messagesMap[activeSessionId].some(m => m.id === msg.id)
                ), newMessage],
                loading: true
            }
        });

        // 调用AI服务重新生成回复
        await Chat({
            messages: previousMessages,
            handleMessageUpdate: (msg) => {
                const updatedChatMessages = get().content.chatMessages.map((message) => {
                    if (message.id === newMessage.id) {
                        return { ...message, content: message.content + msg };
                    }
                    return message;
                });

                const updatedMessagesMap = {
                    ...get().content.messagesMap,
                    [activeSessionId]: get().content.messagesMap[activeSessionId].map((message) => {
                        if (message.id === newMessage.id) {
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
                    isAIGenerating: false,
                    content: {
                        ...get().content,
                        loading: false
                    }
                });
            }
        });
    },
    async translateMessage(id, lang) {

    },
    async openThreadCreator(id) {

    },
    async resendThreadMessage(id) {

    },
    async delAndResendThreadMessage(id) {

    },
    async toggleMessageEditing(id, editing) {
        set({
            messageEditingIds: editing ? [...get().messageEditingIds, id] : get().messageEditingIds.filter(item => item !== id)
        });
    },
    async copyMessage(id, content) {
        try {
            console.log(id)
            await navigator.clipboard.writeText(content);
            message.success('复制成功');
        } catch (error) {
            message.error('复制失败');
            console.error('复制失败:', error);
        }
    },
    async delAndRegenerateMessage(id) {
        const {
            activeSessionId,
            content: {
                messagesMap,
                chatMessages
            }
        } = get();

        if (!activeSessionId) return;

        // 找到要删除的消息的索引位置
        const messageIndex = messagesMap[activeSessionId].findIndex(msg => msg.id === id);
        if (messageIndex === -1) return;

        // 删除目标消息及其后的所有消息
        const previousMessages = messagesMap[activeSessionId]
            .slice(0, messageIndex)
            .map(msg => ({
                role: msg.role,
                content: msg.content
            }));

        // 更新消息列表，删除目标消息及其后的所有消息
        messagesMap[activeSessionId] = messagesMap[activeSessionId].slice(0, messageIndex);

        // 创建新的AI消息
        const newMessage: ChatMessage = {
            content: '',
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

        // 更新状态
        set({
            isAIGenerating: true,
            content: {
                ...get().content,
                messagesMap: {
                    ...messagesMap,
                    [activeSessionId]: [...messagesMap[activeSessionId], newMessage]
                },
                chatMessages: [...chatMessages.filter(msg =>
                    msg.sessionId !== activeSessionId ||
                    messagesMap[activeSessionId].some(m => m.id === msg.id)
                ), newMessage],
                loading: true
            }
        });

        // 调用AI服务重新生成回复
        await Chat({
            messages: previousMessages,
            handleMessageUpdate: (msg) => {
                const updatedChatMessages = get().content.chatMessages.map((message) => {
                    if (message.id === newMessage.id) {
                        return { ...message, content: message.content + msg };
                    }
                    return message;
                });

                const updatedMessagesMap = {
                    ...get().content.messagesMap,
                    [activeSessionId]: get().content.messagesMap[activeSessionId].map((message) => {
                        if (message.id === newMessage.id) {
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
                    isAIGenerating: false,
                    content: {
                        ...get().content,
                        loading: false
                    }
                });
            }
        });
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
        console.log(id);
    },
    async modifyMessageContent(id, content) {
        const {
            activeSessionId,
            content: {
                messagesMap,
                chatMessages
            }
        } = get();

        if (!activeSessionId) return;

        // 更新 messagesMap 中的消息
        const updatedMessagesMap = {
            ...messagesMap,
            [activeSessionId]: messagesMap[activeSessionId].map(message =>
                message.id === id
                    ? { ...message, content, updatedAt: Date.now() }
                    : message
            )
        };

        // 更新 chatMessages 中的消息
        const updatedChatMessages = chatMessages.map(message =>
            message.id === id
                ? { ...message, content, updatedAt: Date.now() }
                : message
        );

        set({
            content: {
                ...get().content,
                messagesMap: updatedMessagesMap,
                chatMessages: updatedChatMessages
            }
        });
    },
    async sendThreadMessage({
        message
    }) {

        if (!message) {
            return;
        }

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

            // 判断有没有设置apikey
            const token = (await SettingContext.GetSetting()).apiKey;
            if (!token) {
                message.error('请先设置apikey');
                return;
            }

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

            // 判断有没有设置apikey
            const token = (await SettingContext.GetSetting()).apiKey;
            if (!token) {
                message.error('请先设置apikey');
                return;
            }

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