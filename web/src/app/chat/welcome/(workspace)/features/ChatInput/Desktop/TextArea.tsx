import { memo } from 'react';

import InputArea from '@/features/ChatInput/Desktop/InputArea';

import { useChatStore } from '@/store/chat';

const TextArea = memo<{ onSend?: () => void }>(({ onSend }) => {
    const [loading, value, updateInputMessage, sendMessage] = useChatStore((s) => [s.message.loading, s.message.value, s.updateInputMessage, s.sendMessage]);

    return (
        <InputArea
            loading={loading}
            onChange={updateInputMessage}
            onSend={() => {
                sendMessage({
                    onlyAddUserMessage: false,
                    message: ''
                })
                onSend?.();
            }}
            value={value}
        />
    );
});

export default TextArea;
