import { memo } from 'react';

import { useChatStore } from '@/store/chat';
import { chatSelectors } from '@/store/chat/selectors';

import InboxWelcome from './InboxWelcome';

const WelcomeChatItem = memo(() => {
    const showInboxWelcome = useChatStore(chatSelectors.showInboxWelcome);

    if (showInboxWelcome) return <InboxWelcome />;

    return <InboxWelcome />;
});

export default WelcomeChatItem;
