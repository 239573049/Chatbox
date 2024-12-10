import { useGlobalStore } from '@/store/global';
import { SideKey } from '@/store/global/initialState';
import { ActionIcon } from '@lobehub/ui';
import { MessageSquare, Search } from 'lucide-react';
import { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TopActions = memo(() => {
    const [switchSide, sideKey] = useGlobalStore((state) => [state.switchSide, state.sideKey]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.includes('search')) {
            switchSide(SideKey.Search);
        } else {
            switchSide(SideKey.Chat);
        }
    }, [location.pathname, switchSide]);

    /**
     * 切换菜单
     */
    const toggleMenu = (key: SideKey) => {
        switchSide(key);
        if (key === SideKey.Search) {
            navigate('/search');
        } else if (key === SideKey.Settings) {
            navigate('/settings')
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <ActionIcon
                icon={MessageSquare}
                active={sideKey === SideKey.Chat}
                placement={'right'}
                title={'对话'}
                onClick={() => toggleMenu(SideKey.Chat)}
            />

            <ActionIcon
                icon={Search}
                active={sideKey === SideKey.Search}
                placement={'right'}
                title={'搜索'}
                onClick={() => toggleMenu(SideKey.Search)}
            />
        </>
    );
});

export default TopActions;