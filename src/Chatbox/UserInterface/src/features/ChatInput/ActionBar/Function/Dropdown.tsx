import { Avatar } from '@lobehub/ui';
import { Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import type { ItemType } from 'antd/es/menu/interface';
import { PropsWithChildren, memo } from 'react';
import ToolItem from './ToolItem';
import { useToolStore } from '@/store/tool';

const useStyles = createStyles(({ css, prefixCls }) => ({
    menu: css`
    &.${prefixCls}-dropdown-menu {
      padding-block: 8px;
    }

    .${prefixCls}-dropdown-menu-item-group-list .${prefixCls}-dropdown-menu-item {
      padding: 0;
      border-radius: 4px;
    }
  `,
}));

const DropdownMenu = memo<PropsWithChildren>(({ children }) => {

    const [list] = useToolStore((s) => [s.installedPluginMetaList]);
    const { styles } = useStyles();

    const items: ItemType[] = [
        ({
            children: list.map((item) => ({
                icon: <Avatar avatar={item.avatar} size={24} />,
                key: item.identifier,
                label: (
                    <ToolItem identifier={item.identifier} label={item.name || item.identifier} />
                ),
            })),

            key: 'builtins',
            label: '插件',
            type: 'group',
        }) as ItemType,
    ].filter(Boolean);

    return (
        <>
            <Dropdown
                arrow={false}
                menu={{
                    className: styles.menu,
                    items,
                    onClick: (e) => {
                        e.domEvent.preventDefault();
                    },
                    style: {
                        maxHeight: 500,
                        overflowY: 'scroll',
                    },
                }}
                placement={'top'}
                trigger={['click']}
            >
                {children}
            </Dropdown>
        </>
    );
});

export default DropdownMenu;
