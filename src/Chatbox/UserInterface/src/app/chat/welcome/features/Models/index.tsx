import { useModelsStore } from "@/store/models";
import { DraggablePanel, SearchBar } from "@lobehub/ui";
import { memo, useEffect } from "react";
import { Flexbox } from 'react-layout-kit';
import ModelItem from "./ModelItem";
import { useChatStore } from "@/store/chat";
import WindowContext from "@/service/WindowContext";
import useModel from "@/hooks/useModel";

const Models = memo(() => {
    const models = useModel()
    const [search, setSearchValue, initModels, navExpanded, updateNavExpanded, model] =
        useModelsStore((state) => [state.search, state.setSearchValue, state.initModels, state.navExpanded, state.updateNavExpanded, state.model]);

    const { updateSessionId } = useChatStore((s) => ({
        updateSessionId: s.updateSessionId
    }));

    useEffect(() => {
        handleInitModels();
    }, [models])

    async function handleInitModels() {
        if (models.length > 0) {
            initModels(models);
        }
    }

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
            <Flexbox style={{
                overflow: 'auto',
                height: 'calc(100vh - 65px)',
                // 添加以下样式来隐藏滚动条
                // @ts-ignore
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
                msOverflowStyle: 'none',  // IE 和 Edge
                scrollbarWidth: 'none',    // Firefox
            }}>

                {models.map((model) => (
                    <ModelItem key={model.id} {...model} />
                ))}
            </Flexbox>
        </Flexbox>
    </DraggablePanel>)
})

Models.displayName = 'Models';

export default Models;


