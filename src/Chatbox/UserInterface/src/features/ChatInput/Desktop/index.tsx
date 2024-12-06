import { ReactNode, memo, useCallback, useState } from 'react';
import { Flexbox } from 'react-layout-kit';


import Head from './Header';
import { ActionKeys } from '../ActionBar/config';

export type FooterRender = (params: {
  expand: boolean;
  onExpandChange: (expand: boolean) => void;
}) => ReactNode;

interface DesktopChatInputProps {
  leftActions: ActionKeys[];
  renderFooter: FooterRender;
  renderTextArea: (onSend: () => void) => ReactNode;
  rightActions: ActionKeys[];
}

const DesktopChatInput = memo<DesktopChatInputProps>(
  ({
    leftActions,
    rightActions,
    renderTextArea,
    renderFooter,
  }) => {
    const [expand, setExpand] = useState<boolean>(false);

    const onSend = useCallback(() => {
      setExpand(false);
    }, []);

    return (
      <>
      <Flexbox
        gap={8}
        height={'100%'}
        padding={'12px 0 16px'}
        style={{ minHeight: 160, position: 'relative' }}
      >
        <Head
          expand={expand}
          leftActions={leftActions}
          rightActions={rightActions}
          setExpand={setExpand}
        />
        {renderTextArea(onSend)}
        {renderFooter({ expand, onExpandChange: setExpand })}
      </Flexbox>
      </>
    );
  },
);

DesktopChatInput.displayName = 'DesktopChatInput';

export default DesktopChatInput;
