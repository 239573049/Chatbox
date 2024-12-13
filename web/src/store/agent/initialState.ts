export interface AgentState {
  displayMode: 'chat' | 'doc';
  historyCount: number;
  enableHistoryCount: boolean;
}

export const initialAgentState: AgentState = {
  displayMode: 'chat',
  historyCount: 0,
  enableHistoryCount: false,
};

