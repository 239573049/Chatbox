import { FC, PropsWithChildren, useEffect, useState } from 'react';

import { isMobileDevice } from '@/utils/server/responsive';

interface ServerLayoutProps<T> {
  Desktop: FC<T>;
  Mobile: FC<T>;
}

const ServerLayout =
  <T extends PropsWithChildren>({ Desktop, Mobile }: ServerLayoutProps<T>): FC<T> =>
  (props: T) => {
    const [mobile, setMobile] = useState(isMobileDevice());

    // 监听宽度变化
    useEffect(() => {
        function handleResize() {
            // 如果宽度没有变化，则不更新状态
            if(mobile === isMobileDevice()){
                return;
            }
            setMobile(isMobileDevice());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[])

    return mobile ? <Mobile {...props} /> : <Desktop {...props} />;
  };

ServerLayout.displayName = 'ServerLayout';

export default ServerLayout;
