import { SideNav } from "@lobehub/ui";
import { memo } from "react";
import BottomActions from "./BottomActions";
import TopActions from "./TopActions";
import UserAvatar from "@/features/User/UserAvatar";
import UserPanel from "@/features/User/UserPanel";

const Nav = memo(() => {

    return (<SideNav
        avatar={<UserPanel>
            <UserAvatar
                clickable
            />
        </UserPanel>}
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
