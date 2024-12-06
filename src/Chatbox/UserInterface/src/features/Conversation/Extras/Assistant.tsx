import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ChatMessage } from '@/types/message';

import { RenderMessageExtra } from '../types';

export const AssistantMessageExtra: RenderMessageExtra = memo<ChatMessage>(
    ({ extra, id, content }) => {


        return (
            <Flexbox gap={8} style={{ marginTop: 8 }}>
            </Flexbox>
        );
    },
);
