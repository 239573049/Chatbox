import { memo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../@nav";
import { Flexbox } from 'react-layout-kit';

const DesktopLayout = memo(() => {

        useEffect(()=>{
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
    
            // 检查是否存在 token
            const token = localStorage.getItem('token');
            if (!token) {
                const currentUrl = window.location.href;
                const encodedReturnUrl = encodeURIComponent(currentUrl);
                window.location.href = `https://api.token-ai.cn/login?redirect_uri=${encodedReturnUrl}`;
            }
        },[]);

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
