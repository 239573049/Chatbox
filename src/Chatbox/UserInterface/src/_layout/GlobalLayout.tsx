import { useGlobalStore } from "@/store/global"
import { ThemeProvider } from "@lobehub/ui"
import { useEffect, useRef } from "react";
import styled from 'styled-components';
import WindowContext from "@/service/WindowContext";

const ResizeHandle = styled.div`
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: transparent;
    z-index: 10;

    &.top{
        width: 100%;
        cursor: ns-resize;
        height: 2px;
        z-index: 100000;
        top: 1px;
        position: absolute;
    }
    &.bottom {
        width: 100%;
        cursor: ns-resize;
        height: 2px;
        z-index: 100000;
        bottom: 1px;
        position: absolute;
    }

    &.left{
        height: 100%;
        width: 5px;
        z-index: 9999;
        cursor: ew-resize;
    }
    &.right {
        height: 100%;
        width: 5px;
        cursor: ew-resize;
        right: 1px;
        position: absolute !important;
        z-index:9999;
    }

    &.top-left{
        cursor: nwse-resize;
        z-index: 100000;
        top: 1px;
        left: 1px;
        position: absolute;
    }
    &.bottom-right {
        cursor: nwse-resize;
        z-index: 100000;
        bottom: 1px;
        left: 1px;
        position: absolute;
    }

    &.top-right{
        cursor: nesw-resize;
        z-index: 100000;
        top: 1px;
        right: 1px;
        position: absolute;
    }
    &.bottom-left {
        cursor: nesw-resize;
        z-index: 100000;
        bottom: 1px;
        right: 1px;
        position: absolute;
    }
`;

export default function GlobalLayout({
    children
}: {
    children: React.ReactNode
}) {
    const isResizing = useRef(false);
    const currentDirection = useRef<string>('');
    const startX = useRef(0);
    const startY = useRef(0);
    const startWidth = useRef(0);
    const startHeight = useRef(0);

    useEffect(() => {
        // @ts-ignore
        window.external.sendMessage(`__bwv:["AttachPage","${window.location.origin + "/"}","${window.location.origin + "/"}"]`)
        console.log("发送成功");
    }, []);

    const handleMouseDown = (direction: string, event: React.MouseEvent) => {
        isResizing.current = true;
        currentDirection.current = direction;
        startX.current = event.clientX;
        startY.current = event.clientY;
        startWidth.current = window.innerWidth;
        startHeight.current = window.innerHeight;

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizing.current) return;

        const deltaX = event.clientX - startX.current;
        const deltaY = event.clientY - startY.current;

        let newWidth = startWidth.current;
        let newHeight = startHeight.current;
        let fromLeft = false;
        let fromBottom = false;
        switch (currentDirection.current) {
            case 'right':
                newWidth = startWidth.current + deltaX;
                fromLeft = false;
                fromBottom = false;
                break;
            case 'left':
                newWidth = startWidth.current - deltaX;
                fromLeft = true;
                fromBottom = false;
                break;
            case 'bottom':
                newHeight = startHeight.current + deltaY;
                fromLeft = false;
                fromBottom = true;
                break;
            case 'top':
                newHeight = startHeight.current - deltaY;
                fromLeft = false;
                fromBottom = false;
                break;
            case 'top-left':
                newWidth = startWidth.current - deltaX;
                newHeight = startHeight.current - deltaY;
                fromLeft = true;
                fromBottom = false;
                break;
            case 'top-right':
                newWidth = startWidth.current + deltaX;
                newHeight = startHeight.current - deltaY;
                fromLeft = false;
                fromBottom = false;
                break;
            case 'bottom-left':
                newWidth = startWidth.current - deltaX;
                newHeight = startHeight.current + deltaY;
                fromLeft = true;
                fromBottom = true;
                break;
            case 'bottom-right':
                newWidth = startWidth.current + deltaX;
                newHeight = startHeight.current + deltaY;
                fromLeft = false;
                fromBottom = true;
                break;
            default:
                break;
        }

        // 设置最小宽度和高度
        newWidth = Math.max(newWidth, 300);
        newHeight = Math.max(newHeight, 200);

        WindowContext.resizeWindow(newWidth, newHeight, fromLeft, fromBottom);
    }

    const handleMouseUp = () => {
        isResizing.current = false;
        currentDirection.current = '';
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }

    const [theme, switchTheme] = useGlobalStore((state) => [state.theme, state.switchTheme]);

    return (
        <ThemeProvider
            style={{
                height: '100vh',
                overflow: 'hidden',
                position: 'relative'
            }}
            themeMode={theme}
            onThemeModeChange={(theme) => switchTheme(theme)}
        >
            <ResizeHandle className="top" onMouseDown={(e) => handleMouseDown('top', e)} />
            <ResizeHandle className="left" onMouseDown={(e) => handleMouseDown('left', e)} />
            <ResizeHandle className="right" onMouseDown={(e) => handleMouseDown('right', e)} />
            <ResizeHandle className="top-left" onMouseDown={(e) => handleMouseDown('top-left', e)} />
            <ResizeHandle className="top-right" onMouseDown={(e) => handleMouseDown('top-right', e)} />
            {children}
            <ResizeHandle className="bottom-left" onMouseDown={(e) => handleMouseDown('bottom-left', e)} />
            <ResizeHandle className="bottom-right" onMouseDown={(e) => handleMouseDown('bottom-right', e)} />
            <ResizeHandle className="bottom" onMouseDown={(e) => handleMouseDown('bottom', e)} />
        </ThemeProvider>
    )
}