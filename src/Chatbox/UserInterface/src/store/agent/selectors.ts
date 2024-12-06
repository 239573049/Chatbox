


import type { AgentState } from './initialState';

const currentAgentChatConfig = (s: AgentState) => {
    return {
        displayMode: s.displayMode,
        historyCount: s.historyCount,
        enableHistoryCount: s.enableHistoryCount,
    };
}
export const agentSelectors = {
    currentAgentChatConfig
}


