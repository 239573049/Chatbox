
import { Divider } from 'antd';
import DesktopChatInput from './Desktop';
import { Flexbox } from 'react-layout-kit';

const ChatInput = () => {
  return <Flexbox style={{
    height: '220px'
  }}>
    <Divider style={{
      margin: 0
    }}/>
    <DesktopChatInput />
  </Flexbox>;
};

export default ChatInput;
