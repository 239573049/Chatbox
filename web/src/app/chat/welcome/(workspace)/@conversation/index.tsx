import { memo } from "react";
import { Flexbox } from 'react-layout-kit';
import ChatList from "./ChatList";


const Conversation = memo(()=>{
    return(<Flexbox style={{
        flex:1
    }}>
        <ChatList />
    </Flexbox>)
})

Conversation.displayName = 'Conversation'

export default Conversation;