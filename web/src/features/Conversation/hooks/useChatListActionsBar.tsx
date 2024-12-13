import { ActionIconGroupItems } from '@lobehub/ui/es/ActionIconGroup';
import { Copy, Edit, ListRestart, RotateCcw,  Trash } from 'lucide-react';
import { useMemo } from 'react';


interface ChatListActionsBar {
    copy: ActionIconGroupItems;
    del: ActionIconGroupItems;
    delAndRegenerate: ActionIconGroupItems;
    divider: { type: 'divider' };
    edit: ActionIconGroupItems;
    regenerate: ActionIconGroupItems;
}

export const useChatListActionsBar = ({
    hasThread,
}: { hasThread?: boolean } = {}): ChatListActionsBar => {
    return useMemo(
        () => ({
            copy: {
                icon: Copy,
                key: 'copy',
                label: '复制',
            },
            del: {
                danger: true,
                disable: hasThread,
                icon: Trash,
                key: 'del',
                label: hasThread ? '删除' : '删除',
            },
            delAndRegenerate: {
                disable: hasThread,
                icon: ListRestart,
                key: 'delAndRegenerate',
                label: '删除并重新生成',
            },
            divider: {
                type: 'divider',
            },
            edit: {
                icon: Edit,
                key: 'edit',
                label: '编辑',
            },
            regenerate: {
                icon: RotateCcw,
                key: 'regenerate',
                label: '重新生成',
            },
        }),
        [hasThread],
    );
};
