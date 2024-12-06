import { ReactNode, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import BubblesLoading from '@/components/BubblesLoading';
import { ChatMessage } from '@/types/message';

import ImageFileListViewer from './ImageFileListViewer';

export const UserMessage = memo<
  ChatMessage & {
    editableContent: ReactNode;
  }
>(({ id, editableContent, content, ...res }) => {
  if (content === '...') return <BubblesLoading />;

  return (
    <Flexbox gap={8} id={id}>
      {editableContent}
      {res.imageList && res.imageList?.length > 0 && <ImageFileListViewer items={res.imageList} />}
    </Flexbox>
  );
});

export * from './BelowMessage';
export { MarkdownRender as UserMarkdownRender } from './MarkdownRender';
