import { Icon, Tooltip } from '@lobehub/ui';
import { ItemType } from 'antd/es/menu/interface';
import {
    Book,
    LifeBuoy,
    LogOut,
    Rocket
} from 'lucide-react';
import type { MenuProps } from '@/components/Menu';
import { useUserStore } from '@/store/user';
import { Link } from 'react-router-dom';
import useVersions from '@/hooks/useVersions';
import UpgradeBadge from './UpgradeBadge';
import { Dropdown } from 'antd';

export const useMenu = () => {
    const versions = useVersions();
    const [isSignIn] = useUserStore((s) => [
        s.isSignIn
    ]);

    const helps: MenuProps['items'] = [
        {
            children: [
                {
                    icon: <Icon icon={Book} />,
                    key: 'docs',
                    label: (
                        <Link to={'/docs/ai-agent/index'} target={'_blank'}>
                            文档
                        </Link>
                    ),
                },
            ],
            icon: <Icon icon={LifeBuoy} />,
            key: 'help',
            label: '帮助',
        },
        {
            type: 'divider',
        },
    ].filter(Boolean) as ItemType[];

    const mainItems = [
        {
            type: 'divider',
        }, versions.isNewVersion ? {
            icon: <Icon icon={Rocket} />,
            key: 'versions',
            label: <Tooltip title={versions.description}>
                <span>有新版本版本：{versions.version}</span>
            </Tooltip>,
        } : null,
        ...helps,
    ].filter(Boolean) as MenuProps['items'];



    const logoutItems: MenuProps['items'] = isSignIn
        ? [
            {
                icon: <Icon icon={LogOut} />,
                key: 'logout',
                label: <span>退出登录</span>,
            },
        ]
        : [];

    return { logoutItems, mainItems };
};
