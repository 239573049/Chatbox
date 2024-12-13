import { Icon, Tag } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import {  Package } from 'lucide-react';
import { rgba } from 'polished';
import { memo } from 'react';

import { InstallPluginMeta } from '@/types/tool/plugin';

const useStyles = createStyles(({ css, token }) => ({
    community: css`
    color: ${rgba(token.colorInfo, 0.75)};
    background: ${token.colorInfoBg};

    &:hover {
      color: ${token.colorInfo};
    }
  `,
    custom: css`
    color: ${rgba(token.colorWarning, 0.75)};
    background: ${token.colorWarningBg};

    &:hover {
      color: ${token.colorWarning};
    }
  `,
    official: css`
    color: ${rgba(token.colorSuccess, 0.75)};
    background: ${token.colorSuccessBg};

    &:hover {
      color: ${token.colorSuccess};
    }
  `,
}));

interface PluginTagProps extends Pick<InstallPluginMeta, 'identifier'> {
    showIcon?: boolean;
    showText?: boolean;
}

const PluginTag = memo<PluginTagProps>(({ showIcon = true,  showText = true, identifier }) => {
    const { styles, cx } = useStyles();

    return (
        <Tag
            className={cx(styles.custom)}
            icon={showIcon && <Icon icon={Package} />}
        >
            {showText && (identifier)}
        </Tag>
    );
});

export default PluginTag;
