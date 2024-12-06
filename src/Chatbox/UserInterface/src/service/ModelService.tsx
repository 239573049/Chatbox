import { AgentModel } from "@/types/Model";
import { OpenAI,Claude } from "@lobehub/icons";


const getModels = async () => {
    const models = [] as AgentModel[];
    // 内置模型
    models.push({
        id: 'gpt-4o-mini',
        name: 'GPT 4o Mini',
        description: "GPT 免费模型",
        icon: <OpenAI.Avatar size={32} />,
        tags: ['GPT', 'Mini'],
        model: 'gpt-4o-mini',
        temperature: 0.5,
        max_tokens: 128000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    models.push({
        id: 'gpt-4o',
        name: 'GPT 4o',
        description: "GPT 4o 模型",
        icon: <OpenAI.Avatar  size={32} />,
        tags: ['GPT', '4o'],
        model: 'gpt-4o',
        temperature: 0.5,
        max_tokens: 128000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    models.push({
        id: 'claude-3-5-sonnet-20241022',
        name: 'Claude 3.5 Sonnet',
        description: "Claude 3.5 Sonnet 模型",
        icon: <Claude color="#D97757" size={32} />,
        tags: ['Claude', '3.5'],
        model: 'claude-3-5-sonnet-20241022',
        temperature: 0.5,
        max_tokens: 128000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    return models;
}


export default {
    getModels,
}


