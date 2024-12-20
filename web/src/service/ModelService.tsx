import { ModelUrl } from "@/const/url";
import { AgentModel } from "@/types/Model";

async function getServiceModels(): Promise<AgentModel[]> {
    const cacheKey = 'agentModelsCache';
    try {
        const result = await fetch(ModelUrl);
        const text = await result.text();
        const models = JSON.parse(text) as AgentModel[];
        // 成功获取数据后，更新缓存
        localStorage.setItem(cacheKey, JSON.stringify(models));

        return models;
    } catch (error) {
        console.error('Fetch failed, using cached data:', error);
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData) as AgentModel[];
        } else {
            throw new Error('No cached data available');
        }
    }
}

export {
    getServiceModels
}


