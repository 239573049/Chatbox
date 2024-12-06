import { ReactNode, memo, useCallback, useState } from 'react';
import { Flexbox } from 'react-layout-kit';


import Head from './Header';
import { ActionKeys } from '../ActionBar/config';

export type FooterRender = () => ReactNode;

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

    const onSend = useCallback(() => {
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
          leftActions={leftActions}
          rightActions={rightActions}
        />
        {renderTextArea(onSend)}
        {renderFooter()}
      </Flexbox>
      </>
    );
  },
);

DesktopChatInput.displayName = 'DesktopChatInput';

export default DesktopChatInput;
