import { ActionIcon } from '@lobehub/ui';
import { Gift, Settings } from 'lucide-react';
import { memo } from 'react';


const BottomActions = memo(() => {
    return (
        <>
            <ActionIcon
                icon={Settings}
                placement={'right'}
                title={'设置'}
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
