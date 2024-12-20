export interface AgentModel {
    id: string;
    name: string;
    description: string;
    icon: any;
    tags: string[];
    model: string;
    temperature: number;
    max_tokens: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
}