import { StateCreator } from "zustand";
import { ChatStore } from "./store";
import { CreateMessageParams, SendThreadMessageParams } from "@/types/message";

export interface ChatStoreAction {
    updateInputMessage: (vaule: string) => void;
    stopGenerateMessage: () => Promise<void>;
    addAIMessage: () => Promise<void>;
    setChatLoading: (loading: boolean) => void;
    deleteMessage: (id: string) => Promise<void>;
    regenerateMessage: (id: string) => Promise<void>;
    translateMessage: (id: string, lang: string) => Promise<void>;
    ttsMessage: (id: string) => Promise<void>;
    delAndRegenerateMessage: (id: string) => Promise<void>;
    copyMessage: (id: string, content: string) => Promise<void>;
    openThreadCreator: (id: string) => Promise<void>;
    resendThreadMessage: (id: string) => Promise<void>;
    delAndResendThreadMessage: (id: string) => Promise<void>;
    toggleMessageEditing: (id: string, editing: boolean) => Promise<void>;
    reInvokeToolMessage: (id: string) => Promise<void>;
    deleteToolMessage: (id: string) => Promise<void>;
    deleteUserMessageRagQuery: (id: string) => Promise<void>;
    rewriteQuery: (id: string) => Promise<void>;
    openMessageDetail: (id: string) => Promise<void>;
    modifyMessageContent: (id: string, content: string) => Promise<void>;
    sendThreadMessage: (params: SendThreadMessageParams) => Promise<void>;
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
            activeId,
            message: {
                value
            },
            content: {
                messagesMap
            }
        } = get();

        if (!activeId) return;

        if (!message) return;

        set({
            isCreatingThreadMessage: true,
        })


        const newMessage: CreateMessageParams = {
            content: message,
            role: 'user',
            sessionId: activeId,
        };
        
        const newMessages = [...(messagesMap[activeId] || []), newMessage];

        set({
            content: {
                ...get().content,
                messagesMap: {
                    ...get().content.messagesMap,
                    [activeId]: newMessages
                }
            }
        })
    }
})