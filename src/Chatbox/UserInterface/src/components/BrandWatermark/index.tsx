import { LobeHub } from '@lobehub/ui/brand';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox, FlexboxProps } from 'react-layout-kit';

import { ORG_NAME } from '@/const/branding';
import { UTM_SOURCE } from '@/const/url';
import { isCustomORG } from '@/const/version';
import { Link } from 'react-router-dom';

const useStyles = createStyles(({ token, css }) => ({
  logoLink: css`
    line-height: 1;
    color: inherit;

    &:hover {
      color: ${token.colorLink};
    }
  `,
}));

const BrandWatermark = memo<Omit<FlexboxProps, 'children'>>(({ style, ...rest }) => {
  const { styles, theme } = useStyles();
  return (
    <Flexbox
      align={'center'}
      dir={'ltr'}
      flex={'none'}
      gap={4}
      horizontal
      style={{ color: theme.colorTextDescription, fontSize: 12, ...style }}
      {...rest}
    >
      <span>Powered by</span>
      {isCustomORG ? (
        <span>{ORG_NAME}</span>
      ) : (
        <Link
          className={styles.logoLink}
          to={`https://token-ai.cn?utm_source=${UTM_SOURCE}&utm_content=brand_watermark`}
          target={'_blank'}
        >
          TokenAI
        </Link>
      )}
    </Flexbox>
  );
});

export default BrandWatermark;
