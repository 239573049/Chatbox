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
        setModels(cachedModels);

        // 从远程获取数据
        const result = await getServiceModels();

        // 如果远程数据和本地缓存不一致，则覆盖
        if (JSON.stringify(result) !== JSON.stringify(cachedModels)) {
            setModels(result);
            localStorage.setItem('models', JSON.stringify(result));
        }
        
        result.forEach(model => {
            if (model.icon) {
                model.icon = getIconByName(model.icon).icon;
            }
        });

    }

    return models;
}

export default useModel;