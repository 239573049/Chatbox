import { memo } from "react";
import { Flexbox } from 'react-layout-kit';
import Models from "./features/Models";
import Workspace from "./(workspace)";

const Welcome = memo(() => {
    return (<Flexbox
        horizontal
        style={{
            width:'100%'
        }}
    >
        <Models />
        <Flexbox style={{
            flex:1
        }}>
            <Workspace/>
        </Flexbox>
    </Flexbox>)
})

export default Welcome;