import { memo } from 'react';

import { ChatMessage } from '@/types/message';

//@ts-ignore
export const UserMessageExtra = memo<ChatMessage>(({ extra, id, content }) => {

  const showExtra = !!extra;

  if (!showExtra) return;

  return (
    <div style={{ marginTop: 8 }}>
        
    </div>
  );
});
