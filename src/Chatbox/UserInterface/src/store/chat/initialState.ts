
export interface ChatState {
    message: {
        loading: boolean,
        value: string
    },
    isAIGenerating:boolean,

}

export const initialState: ChatState = {
    message: {
        loading: false,
        value: ''
    },
    isAIGenerating: false,
};

