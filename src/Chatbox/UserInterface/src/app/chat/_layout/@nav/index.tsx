import { Avatar, SideNav } from "@lobehub/ui";
import { memo } from "react";
import BottomActions from "./BottomActions";
import TopActions from "./TopActions";
import { useChatStore } from "@/store/chat";

const Nav = memo(() => {
    const [meta] = useChatStore((s)=>[s.meta])

    return (<SideNav
        avatar={<Avatar
            avatar={meta.avatar}
            title={meta.nickname}
            animation={true}
        />}
        bottomActions={<BottomActions />}
        style={{ height: '100%', zIndex: 100, minHeight: '0' }}
        topActions={
            <>
                <TopActions />
            </>
        }
    />)
})

Nav.displayName = 'Nav'

export default Nav;
