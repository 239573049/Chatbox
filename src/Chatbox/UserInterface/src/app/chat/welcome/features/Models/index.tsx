import { useModelsStore } from "@/store/models";
import { DraggablePanel, SearchBar } from "@lobehub/ui";
import { memo, useEffect } from "react";
import { Flexbox } from 'react-layout-kit';
import ModelItem from "./ModelItem";
import { useChatStore } from "@/store/chat";
import WindowContext from "@/service/WindowContext";

const Models = memo(() => {
    const [search, setSearchValue, models, initModels, navExpanded, updateNavExpanded, model] =
        useModelsStore((state) => [state.search, state.setSearchValue, state.models, state.initModels, state.navExpanded, state.updateNavExpanded, state.model]);

    const { updateSessionId } = useChatStore((s) => ({
        updateSessionId: s.updateSessionId
    }));

    useEffect(() => {
        initModels();
    }, [initModels]);

    useEffect(() => {
        if (model) {
            updateSessionId(model.id);
            WindowContext.setTitle(model.name)
        }
    }, [model]);

    return (<DraggablePanel
        placement="left"
        expand={navExpanded}
        minWidth={200}
        maxWidth={330}
        defaultSize={{
            width: 280,
        }}
        onExpandChange={(expand) => {
            updateNavExpanded(expand)
        }}
    >
        <Flexbox style={{
            marginTop: 16,
            marginLeft: 16,
            marginRight: 16,
        }}>
            <SearchBar
                placeholder="搜索智能体"
                value={search}
                style={{
                    marginBottom: 16,
                }}
                onChange={(value) => setSearchValue(value.target.value)}
            />
            {models.map((model) => (
                <ModelItem key={model.id} {...model} />
            ))}
        </Flexbox>
    </DraggablePanel>)
})

Models.displayName = 'Models';

export default Models;


