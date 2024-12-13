import { ActionIconGroup } from '@lobehub/ui';
import { ActionIconGroupItems } from '@lobehub/ui/es/ActionIconGroup';
import { memo, useContext, useMemo } from 'react';

import { InPortalThreadContext } from '../components/ChatItem/InPortalThreadContext';
import { useChatListActionsBar } from '../hooks/useChatListActionsBar';
import { RenderAction } from '../types';
import { ErrorActionsBar } from './Error';

//@ts-ignore
export const AssistantActionsBar: RenderAction = memo(({ onActionClick, error, tools, id }) => {
  const { regenerate, edit, delAndRegenerate, copy, divider, del } =
    useChatListActionsBar({  });

  const hasTools = !!tools;

  const inPortalThread = useContext(InPortalThreadContext);
  const inThread =  inPortalThread;

  const items = useMemo(() => {
    if (hasTools) return [delAndRegenerate, copy];

    return [edit, copy].filter(Boolean) as ActionIconGroupItems[];
  }, [inThread, hasTools]);

  if (error) return <ErrorActionsBar onActionClick={onActionClick} />;

  return (
    <ActionIconGroup
      dropdownMenu={[
        edit,
        copy,
        divider,
        divider,
        regenerate,
        delAndRegenerate,
        del,
      ]}
      items={items}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
});
