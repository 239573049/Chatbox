import { useModelsStore } from "@/store/models";
import { AgentModel } from "@/types/Model";
import { List, Tooltip } from "@lobehub/ui";
import { memo } from "react";

const { Item } = List;

const ModelItem = memo<AgentModel>((model) => {
    const [currentModel, switchModel] = useModelsStore((state) => [state.model, state.switchModel])
    return <>
        <Tooltip title={model.description}>
            <Item
                title={model.name}
                style={{
                    borderRadius: 8,
                    marginBottom: 8
                }}
                onClick={() => {
                    switchModel(model);
                }}
                active={currentModel?.id == model.id}
                avatar={model.icon}
                description={model.description}
            />
        </Tooltip>

    </>
})

export default ModelItem;