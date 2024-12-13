import { Icon } from '@lobehub/ui';
import { Settings2, Sparkles } from 'lucide-react';
import { useMemo } from 'react';

import type { MenuProps } from '@/components/Menu';
import { SettingsTabs } from '@/store/global/initialState';
import { Link } from 'react-router-dom';

export const useCategory = () => {
    const cateItems: MenuProps['items'] = useMemo(
        () =>
            [
                {
                    icon: <Icon icon={Settings2} />,
                    key: SettingsTabs.Common,
                    label: (
                        <Link to={'/settings/common'} onClick={(e) => e.preventDefault()}>
                            通用配置
                        </Link>
                    ),
                },
                {
                    icon: <Icon icon={Sparkles} />,
                    key: SettingsTabs.Agent,
                    label: (
                        <Link to={'/settings/agent'} onClick={(e) => e.preventDefault()}>
                            智能体
                        </Link>
                    ),
                },
            ].filter(Boolean) as MenuProps['items'],
        [],
    );

    return cateItems;
};
