import { Icon } from '@lobehub/ui';
import { Skeleton } from 'antd';
import { useTheme } from 'antd-style';
import { ChevronUp, CornerDownLeft, LucideCommand } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { isMacOS } from '@/utils/platform';

const ShortcutHint = memo(() => {
    const theme = useTheme();
    const [isMac, setIsMac] = useState<boolean>();

    useEffect(() => {
        setIsMac(isMacOS());
    }, []);

    const cmdEnter = (
        <Flexbox gap={2} horizontal>
            {typeof isMac === 'boolean' ? (
                <Icon icon={isMac ? LucideCommand : ChevronUp} />
            ) : (
                <Skeleton.Node active style={{ height: '100%', width: 12 }}>
                    {' '}
                </Skeleton.Node>
            )}
            <Icon icon={CornerDownLeft} />
        </Flexbox>
    );

    const enter = (
        <Center>
            <Icon icon={CornerDownLeft} />
        </Center>
    );

    const sendShortcut = enter;

    const wrapperShortcut = cmdEnter;

    return (
        <Flexbox
            gap={4}
            horizontal
            style={{ color: theme.colorTextDescription, fontSize: 12, marginRight: 12 }}
        >
            {sendShortcut}
            <span>发送</span>
            <span>/</span>
            {wrapperShortcut}
            <span>
                换行
            </span>
        </Flexbox>
    );
});

export default ShortcutHint;
