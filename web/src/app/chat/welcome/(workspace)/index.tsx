import { memo } from "react";
import { Flexbox } from 'react-layout-kit';
import ChatInput from "./features/ChatInput";
import Conversation from "./@conversation";
import ChatTop from "./ChatTop";

const Workspace = memo(() => {
    return <Flexbox style={{
        height: '100%',
        flexDirection: 'column'
    }}>
        <ChatTop/>
        <Conversation />
        <ChatInput />
    </Flexbox>
})

export default Workspace;
