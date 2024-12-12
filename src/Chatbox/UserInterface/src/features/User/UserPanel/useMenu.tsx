import { Icon } from '@lobehub/ui';
import { ItemType } from 'antd/es/menu/interface';
import {
    Book,
    LifeBuoy,
    LogOut,
} from 'lucide-react';
import type { MenuProps } from '@/components/Menu';
import { useUserStore } from '@/store/user';
import { Link } from 'react-router-dom';

export const useMenu = () => {
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
        },
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
