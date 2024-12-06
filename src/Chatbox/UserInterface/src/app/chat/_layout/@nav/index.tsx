import { Avatar, SideNav } from "@lobehub/ui";
import { memo } from "react";
import BottomActions from "./BottomActions";
import TopActions from "./TopActions";


const Nav = memo(() => {
    return (<SideNav
        avatar={<Avatar
            avatar='🤖'
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
