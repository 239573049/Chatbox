import { Alert } from '@lobehub/ui';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { memo } from 'react';

import { MANUAL_UPGRADE_URL } from '@/const/url';
import { useGlobalStore } from '@/store/global';

const UpgradeAlert = memo(() => {
  const [hasNewVersion, latestVersion] = useGlobalStore((s) => [s.hasNewVersion, s.latestVersion]);

  if (!hasNewVersion) return null;

  return (
    <Alert
      action={
        <Link
          aria-label={'立即升级'}
          to={MANUAL_UPGRADE_URL}
          style={{ marginBottom: 12 }}
          target={'_blank'}
        >
          <Button block size={'small'} type={'primary'}>
            立即升级
          </Button>
        </Link>
      }
      closable
      message={`发现新版本${latestVersion}`}
      showIcon={false}
      type={'info'}
    />
  );
});

export default UpgradeAlert;
