import { Tooltip } from '@lobehub/ui';
import { Badge } from 'antd';
import { createStyles } from 'antd-style';
import { isNumber } from 'lodash-es';
import { memo, } from 'react';
import { Flexbox, FlexboxProps } from 'react-layout-kit';

import { isMobileDevice } from '@/utils/responsive';

const useStyles = createStyles(({ css, token }) => ({
  card: css`
    padding-block: 6px;
    padding-inline: 8px;
    background: ${token.colorFillTertiary};
    border-radius: ${token.borderRadius}px;
  `,
  count: css`
    font-size: 16px;
    font-weight: bold;
    line-height: 1.2;
  `,
  title: css`
    font-size: 12px;
    line-height: 1.2;
    color: ${token.colorTextDescription};
  `,
  today: css`
    font-size: 12px;
  `,
}));

const formatNumber = (num: any) => {
  if (!isNumber(num)) return num;
  // 使用Intl.NumberFormat来添加千分号
  const formattedWithComma = new Intl.NumberFormat('en-US').format(num);

  // 格式化为 K 或 M
  if (num >= 10_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  } else if (num >= 10_000) {
    return (num / 1000).toFixed(1) + 'K';
  } else if (num === 0) {
    return 0;
  } else {
    return formattedWithComma;
  }
};

const DataStatistics = memo<Omit<FlexboxProps, 'children'>>(({ style, ...rest }) => {
  const mobile = isMobileDevice();
  // sessions



  const { styles, theme } = useStyles();

  const items = [
    {
      count: 0,
      key: 'sessions',
      title: '会话',
    },
    {
      count: 0,
      key: 'topics',
      title: '主题',
    },
    {
      count: 0,
      countToady: 0,
      key: 'messages',
      title: '消息',
    },
  ];

  return (
    <Flexbox
      align={'center'}
      gap={4}
      horizontal
      paddingInline={8}
      style={{ marginBottom: 8, ...style }}
      width={'100%'}
      {...rest}
    >
      {items.map((item) => {
        if (item.key === 'messages') {
          const showBadge = Boolean(item.countToady && item.countToady > 0);
          return (
            <Flexbox
              align={'center'}
              className={styles.card}
              flex={showBadge && !mobile ? 2 : 1}
              gap={4}
              horizontal
              justify={'space-between'}
              key={item.key}
            >
              <Flexbox gap={2}>
                <div className={styles.count}>{formatNumber(item.count)}</div>
                <div className={styles.title}>{item.title}</div>
              </Flexbox>
              {showBadge && (
                <Tooltip title={'今日'}>
                  <Badge
                    count={`+${item.countToady}`}
                    style={{
                      background: theme.colorSuccess,
                      color: theme.colorSuccessBg,
                      cursor: 'pointer',
                    }}
                  />
                </Tooltip>
              )}
            </Flexbox>
          );
        }

        return (
          <Flexbox className={styles.card} flex={1} gap={2} key={item.key}>
            <Flexbox horizontal>
              <div className={styles.count}>{formatNumber(item.count)}</div>
            </Flexbox>
            <div className={styles.title}>{item.title}</div>
          </Flexbox>
        );
      })}
    </Flexbox>
  );
});

export default DataStatistics;
