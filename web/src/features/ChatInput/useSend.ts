import { useChatStore } from "@/store/chat";


export const useSendMessage = () => {
    const [sendMessage, updateInputMessage, message] = useChatStore((s) => [
        s.sendMessage,
        s.updateInputMessage,
        s.message
    ]);

    return {
        sendMessage,
        updateInputMessage,
        message
    }
}

