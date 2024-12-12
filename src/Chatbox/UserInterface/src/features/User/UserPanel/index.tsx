import { Popover } from 'antd';
import { createStyles } from 'antd-style';
import { PropsWithChildren, memo, useState } from 'react';

import PanelContent from './PanelContent';
import UpgradeBadge from './UpgradeBadge';

const useStyles = createStyles(({ css }) => ({
    popover: css`
    inset-block-start: 8px !important;
    inset-inline-start: 8px !important;
    position: absolute;
    width: 100%;
  `,
}));

const UserPanel = memo<PropsWithChildren>(({ children }) => {
    const [open, setOpen] = useState(false);
    const { styles } = useStyles();

    return (
        <UpgradeBadge showBadge={true}>
            <Popover
                arrow={false}
                content={<PanelContent closePopover={() => setOpen(false)} />}
                onOpenChange={setOpen}
                open={open}
                style={{
                    width: '100%',
                }}
                overlayInnerStyle={{
                    padding: 0,
                    position: 'absolute',
                    top: 55,
                }}
                rootClassName={styles.popover}
                trigger={['click']}
            >
                {children}
            </Popover>
        </UpgradeBadge>
    );
});

UserPanel.displayName = 'UserPanel';

export default UserPanel;
