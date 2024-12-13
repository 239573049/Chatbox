import { Badge, ConfigProvider } from 'antd';
import { PropsWithChildren, memo } from 'react';
import { Flexbox } from 'react-layout-kit';
import useVersions from '@/hooks/useVersions';

const UpgradeBadge = memo(({ children, showBadge }: PropsWithChildren<{ showBadge?: boolean }>) => {
  if (!showBadge) return children;
  const versions = useVersions();

  return (
    <Flexbox>
      <ConfigProvider theme={{ components: { Badge: { dotSize: 8 } } }}>
        {
          versions.isNewVersion ? (
            <Badge
              dot offset={[-4, 4]}>
              {children}
            </Badge>) : (
            <>{children}</>
          )
        }
      </ConfigProvider>
    </Flexbox>
  );
});

export default UpgradeBadge;
