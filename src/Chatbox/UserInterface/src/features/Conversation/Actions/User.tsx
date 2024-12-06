import { ActionIconGroup } from '@lobehub/ui';
import { ActionIconGroupItems } from '@lobehub/ui/es/ActionIconGroup';
import { memo, useContext, useMemo } from 'react';

import { RenderAction } from '../types';
import { InPortalThreadContext } from '../components/ChatItem/InPortalThreadContext';
import { useChatListActionsBar } from '../hooks/useChatListActionsBar';

export const UserActionsBar: RenderAction = memo(({ onActionClick, id }) => {
    const { regenerate, edit, copy, divider, del } = useChatListActionsBar({});

    const inPortalThread = useContext(InPortalThreadContext);
    const inThread = inPortalThread;

    const items = useMemo(
        () => [regenerate, edit].filter(Boolean) as ActionIconGroupItems[],
        [inThread],
    );

    return (
        <ActionIconGroup
            dropdownMenu={[edit, copy, divider, regenerate, del]}
            items={items}
            onActionClick={onActionClick}
            type="ghost"
        />
    );
});
