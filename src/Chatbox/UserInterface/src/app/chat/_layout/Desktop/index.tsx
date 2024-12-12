import { memo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../@nav";
import { Flexbox } from 'react-layout-kit';
import { useUserStore } from "@/store/user";

const DesktopLayout = memo(() => {

    const [signIn] = useUserStore((s) => [s.signIn]);

    useEffect(() => {
        // 检查 URL 中是否存在 token 参数
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        // 如果 URL 中存在 token，则保存到 localStorage
        if (urlToken) {
            localStorage.setItem('token', urlToken);
            // 可选：清除 URL 中的 token 参数
            const newUrl = window.location.pathname + window.location.hash;
            window.history.replaceState({}, '', newUrl);
        }

        const token = localStorage.getItem('token') ?? "None"
        signIn(token!)
    }, []);

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
