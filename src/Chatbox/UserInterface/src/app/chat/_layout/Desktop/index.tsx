import { memo } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../@nav";
import { Flexbox } from 'react-layout-kit';

const DesktopLayout = memo(() => {
    return (
        <Flexbox
            height={'100%'}
            horizontal
            width={'100%'}
        >
            <Nav />
            <Outlet />
        </Flexbox>)
})

DesktopLayout.displayName = 'DesktopLayout'

export default DesktopLayout;
