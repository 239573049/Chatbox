import { Icon} from '@lobehub/ui';
import { Button, Dropdown, } from 'antd';
import { createStyles } from 'antd-style';
import { BotMessageSquare,  LucideChevronDown, MessageSquarePlus } from 'lucide-react';
import { memo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Flexbox } from 'react-layout-kit';

import HotKeys from '@/components/HotKeys';
import { useChatStore } from '@/store/chat';

const useStyles = createStyles(({ css, prefixCls }) => {
  return {
    arrow: css`
      &.${prefixCls}-btn.${prefixCls}-btn-icon-only {
        width: 28px;
      }
    `,
  };
});

interface SendMoreProps {
  disabled?: boolean;
  isMac?: boolean;
}

const SendMore = memo<SendMoreProps>(({ disabled }) => {

  const { styles } = useStyles();

  const addAIMessage = useChatStore((s) => s.addAIMessage);


  const hotKey = ['alt', 'enter'].join('+');
  useHotkeys(
    hotKey,
    (keyboardEvent, hotkeysEvent) => {
      console.log(keyboardEvent, hotkeysEvent);
    //   sendMessage({ onlyAddUserMessage: true });
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
    },
  );

  return (
    <Dropdown
      disabled={disabled}
      menu={{
        items: [
        //   { type: 'divider' },
          {
            icon: <Icon icon={BotMessageSquare} />,
            key: 'addAi',
            label: '添加AI消息',
            onClick: () => {
              addAIMessage();
            },
          },
          {
            icon: <Icon icon={MessageSquarePlus} />,
            key: 'addUser',
            label: (
              <Flexbox gap={24} horizontal>
                    添加一条用户消息
                <HotKeys keys={hotKey} />
              </Flexbox>
            ),
            onClick: () => {
            //   sendMessage({ onlyAddUserMessage: true });
            },
          },
        ],
      }}
      placement={'topRight'}
      trigger={['hover']}
    >
      <Button
        aria-label={'发送消息'}
        className={styles.arrow}
        icon={<Icon icon={LucideChevronDown} />}
        type={'primary'}
      />
    </Dropdown>
  );
});

SendMore.displayName = 'SendMore';

export default SendMore;
