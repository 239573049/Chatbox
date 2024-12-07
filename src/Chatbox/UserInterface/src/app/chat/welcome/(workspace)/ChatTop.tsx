import { Flexbox } from 'react-layout-kit';
import { Divider } from 'antd';
import { memo } from 'react';
import { useTheme } from 'antd-style';
import { useModelsStore } from '@/store/models';
import { ActionIcon, Typography } from '@lobehub/ui';
import { PanelRightOpen, PanelLeftOpen } from 'lucide-react'

const ChatTop = memo(() => {
    const theme = useTheme();
    const [navExpanded, updateNavExpanded,model] =
        useModelsStore((state) => [state.navExpanded, state.updateNavExpanded,state.model]);

    return <>
        <Flexbox style={{
            height: 64,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 16,
            backgroundColor: theme.colorBgContainer
        }}
            horizontal
            gap={16}
        >
            {
                !navExpanded ? <ActionIcon icon={PanelLeftOpen}
                    onClick={() => updateNavExpanded(true)} /> : <ActionIcon
                    icon={PanelRightOpen} onClick={() => updateNavExpanded(false)} />
            }
            <Typography style={{
                fontSize: 18,
                fontWeight: 600,
            }}>{model?.name}</Typography>
        </Flexbox>
        <Divider style={{
            margin: 0
        }} />
    </>
})

ChatTop.displayName = 'ChatTop'

export default ChatTop;
