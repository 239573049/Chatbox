import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Flexbox } from 'react-layout-kit';
import Nav from "../@nav";


const MobileLayout = memo(() => {
    return (
        <Flexbox
            height={'100%'}
            horizontal
            style={{
                position: 'relative',
            }}
            width={'100%'}
        >
            <Nav />
            <Outlet />
        </Flexbox>)
})

MobileLayout.displayName = 'MobileLayout'

export default MobileLayout;
