'use client';

import { createStyles } from 'antd-style';
import { Flexbox, FlexboxProps } from 'react-layout-kit';

import BrandWatermark from '@/components/BrandWatermark';
import PanelTitle from '@/components/PanelTitle';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding-block: 0 16px;
    padding-inline: 12px;
    background: ${token.colorBgContainer};
    border-inline-end: 1px solid ${token.colorBorder};
  `,
}));

interface SidebarLayoutProps extends FlexboxProps {
  desc?: string;
  title?: string;
}

const SidebarLayout = ({ children, className, title, desc, ...rest }: SidebarLayoutProps) => {
  const { cx, styles } = useStyles();
  return (
    <Flexbox
      className={cx(styles.container, className)}
      flex={'none'}
      gap={20}
      width={280}
      {...rest}
    >
      <PanelTitle desc={desc} title={title} />
      {children}
      <BrandWatermark paddingInline={12} />
    </Flexbox>
  );
};

export default SidebarLayout;
