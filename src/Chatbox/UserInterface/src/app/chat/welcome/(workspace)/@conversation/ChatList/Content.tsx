
import { memo, useCallback } from 'react';

import { VirtualizedList } from '@/features/Conversation';
import { useChatStore } from '@/store/chat';

import MainChatItem from './ChatItem';
import Welcome from './WelcomeChatItem';

interface ListProps {
  mobile?: boolean;
}

const Content = memo<ListProps>(({ mobile }) => {
    

  const data = useChatStore((s) => s.content.chatMessages);

  const itemContent = useCallback(
    (index: number, id: string) => <MainChatItem id={id} index={index} />,
    [mobile],
  );

  if (data.length === 0) return <Welcome />;

  return <VirtualizedList dataSource={data} itemContent={itemContent} mobile={mobile} />;
});

Content.displayName = 'ChatListRender';

export default Content;
