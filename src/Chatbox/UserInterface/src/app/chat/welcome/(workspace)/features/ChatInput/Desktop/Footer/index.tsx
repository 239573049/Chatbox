import { Button, Space } from 'antd';
import { createStyles } from 'antd-style';
import { rgba } from 'polished';
import { memo, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import StopLoadingIcon from '@/components/StopLoading';
import { useChatStore } from '@/store/chat';
import { isMacOS } from '@/utils/platform';

import SendMore from './SendMore';
import ShortcutHint from './ShortcutHint';

const useStyles = createStyles(({ css, prefixCls, token }) => {
  return {
    arrow: css`
      &.${prefixCls}-btn.${prefixCls}-btn-icon-only {
        width: 28px;
      }
    `,
    loadingButton: css`
      display: flex;
      align-items: center;
    `,
    overrideAntdIcon: css`
      .${prefixCls}-btn.${prefixCls}-btn-icon-only {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .${prefixCls}-btn.${prefixCls}-dropdown-trigger {
        &::before {
          background-color: ${rgba(token.colorBgLayout, 0.1)} !important;
        }
      }
    `,
  };
});

interface FooterProps {
  expand: boolean;
  onExpandChange: (expand: boolean) => void;
}

const Footer = memo<FooterProps>(({ 
    expand,
    onExpandChange
 }) => {

  const { styles } = useStyles();

  const [isAIGenerating, stopGenerateMessage] = useChatStore((s) => [s.isAIGenerating,s.stopGenerateMessage]);

  const [isMac, setIsMac] = useState<boolean>();

  useEffect(() => {
    setIsMac(isMacOS());
  }, [setIsMac]);

  return (
    <Flexbox
      align={'end'}
      className={styles.overrideAntdIcon}
      distribution={'space-between'}
      flex={'none'}
      gap={8}
      horizontal
      padding={'0 24px'}
    >
      <Flexbox align={'center'} gap={8} horizontal style={{ overflow: 'hidden' }}>
        {/* {expand && <LocalFiles />} */}
      </Flexbox>
      <Flexbox align={'center'} flex={'none'} gap={8} horizontal>
        <ShortcutHint />
        <Flexbox style={{ minWidth: 92 }}>
          {isAIGenerating ? (
            <Button
              className={styles.loadingButton}
              icon={<StopLoadingIcon />}
              onClick={stopGenerateMessage}
            >
                暂停
            </Button>
          ) : (
            <Space.Compact>
              <Button
                disabled={isAIGenerating}
                loading={isAIGenerating}
                onClick={() => {
                //   sendMessage();
                  onExpandChange?.(false);
                }}
                type={'primary'}
              >
                发送
              </Button>
              <SendMore disabled={isAIGenerating} isMac={isMac} />
            </Space.Compact>
          )}
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
});

Footer.displayName = 'Footer';

export default Footer;
