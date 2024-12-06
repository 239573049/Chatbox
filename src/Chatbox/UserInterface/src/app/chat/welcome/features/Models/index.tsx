import { useModelsStore } from "@/store/models";
import { DraggablePanel, SearchBar } from "@lobehub/ui";
import { memo, useEffect } from "react";
import { Flexbox } from 'react-layout-kit';
import ModelItem from "./ModelItem";

const Models = memo(() => {
    const [search, setSearchValue, models, initModels,navExpanded,updateNavExpanded] =
        useModelsStore((state) => [state.search, state.setSearchValue, state.models, state.initModels,state.navExpanded,state.updateNavExpanded]);

    useEffect(() => {
        initModels();
    }, [initModels]);

    return (<DraggablePanel
        placement="left"
        expand={navExpanded}
        minWidth={200}
        maxWidth={330}
        defaultSize={{
            width: 280,
        }}
        onExpandChange={(expand)=>{
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


