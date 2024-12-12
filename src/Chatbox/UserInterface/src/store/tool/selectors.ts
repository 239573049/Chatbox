import { ToolState } from "./initialState";


export function customPluginSelectors(identifier: string) {
    return (state: ToolState) => state.plugins.find((plugin) => plugin === identifier) !== undefined;
}

export function isCustomPlugin(identifier: string) {
    return (state: ToolState) => state.plugins.find((plugin) => plugin === identifier);
}

export function pluginSelectors(identifier: string) {
    return (state: ToolState) => state.plugins.find((plugin) => plugin === identifier);
}

export function pluginListSelectors() {
    return (state: ToolState) => state.plugins;
}

