
import { memo, useCallback } from 'react';

import { VirtualizedList } from '@/features/Conversation';
import { useChatStore } from '@/store/chat';

import MainChatItem from './ChatItem';
import Welcome from './WelcomeChatItem';

interface ListProps {
  mobile?: boolean;
}

const Content = memo<ListProps>(({ mobile }) => {


  const [messagesMap, activeSessionId,chatMessages] = useChatStore((s) => [s.content.messagesMap, s.activeSessionId,s.content.chatMessages]);

  const data = messagesMap[activeSessionId || ''];
  console.log(data,messagesMap,chatMessages);
  
  const itemContent = useCallback(
    (index: number, id: string) => <MainChatItem id={id} index={index} />,
    [mobile],
  );

  if (!data || data.length === 0) return <Welcome />;

  return <VirtualizedList dataSource={data?.map((m) => m.id)} itemContent={itemContent} mobile={mobile} />;
});

Content.displayName = 'ChatListRender';

export default Content;
