import { ActionIcon } from '@lobehub/ui';
import { Gift, Settings } from 'lucide-react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const BottomActions = memo(() => {
    const navigate = useNavigate();

    return (
        <>
            <ActionIcon
                icon={Settings}
                placement={'right'}
                title={'设置'}
                onClick={() => navigate('/settings')}
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
