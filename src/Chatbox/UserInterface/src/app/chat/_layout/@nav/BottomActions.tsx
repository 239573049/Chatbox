import { useGlobalStore } from '@/store/global';
import { SideKey } from '@/store/global/initialState';
import { ActionIcon } from '@lobehub/ui';
import { Gift, Settings } from 'lucide-react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const BottomActions = memo(() => {
    const navigate = useNavigate();
    const [switchSide, sideKey] = useGlobalStore((state) => [state.switchSide, state.sideKey]);

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
                icon={Settings}
                placement={'right'}
                active={sideKey === SideKey.Settings}
                title={'设置'}
                onClick={() => toggleMenu(SideKey.Settings)}
            />
            <ActionIcon
                color='#FF69B4'
                icon={Gift}
                placement={'right'}
                title={'邀请'}
            />
        </>
    );
});

export default BottomActions;
