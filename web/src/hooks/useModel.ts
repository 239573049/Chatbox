import { useEffect, useState } from "react"
import { getServiceModels } from '@/service/ModelService'
import { getIconByName } from "@/utils/iconutils";


const useModel = () => {
    const [models, setModels] = useState<any[]>([])

    useEffect(() => {
        loadModels();
    }, []);

    async function loadModels() {
        // 从本地缓存读取
        const cachedModels = JSON.parse(localStorage.getItem('models') || '[]');
        
        cachedModels.forEach((model:any) => {
            if (model.icon) {
                model.icon = getIconByName(model.icon).icon;
            }
        });

        setModels(cachedModels);

        // 从远程获取数据
        const result = await getServiceModels();
        
        // 处理远程数据的图标
        const processedResult = result.map(model => ({
            ...model,
            icon: model.icon ? getIconByName(model.icon).icon : null
        }));

        // 如果远程数据和本地缓存不一致，则覆盖
        if (JSON.stringify(result) !== JSON.stringify(cachedModels)) {
            setModels(processedResult);
            localStorage.setItem('models', JSON.stringify(result));
        }
    }

    return models;
}

export default useModel;