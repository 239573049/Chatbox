import { PluginItem } from "@/types/tool/plugin";


export interface ToolState {
    open: boolean;
    plugins: string[];
    installedPluginMetaList: PluginItem[];
}

export const initialState: ToolState = {
    open: false,
    plugins: [],
    installedPluginMetaList: [
        {
            identifier: 'weather',
            name: '获取天气',
            avatar: '🌡️',
            description: '获取天气信息',
        },
        {
            identifier: 'date',
            name: '获取当前时间',
            avatar: '⏱️',
            description: '获取当前的时间信息',
        }
    ],
};
