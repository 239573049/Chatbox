import { memo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Flexbox } from 'react-layout-kit';
import Nav from "../@nav";
import { useUserStore } from "@/store/user";

const MobileLayout = memo(() => {
    const [signIn] = useUserStore((s) => [s.signIn]);
    useEffect(() => {
        // 检查是否存在 token

        const token = localStorage.getItem('token') ?? "None"
        signIn(token!)
    });

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
