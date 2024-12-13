import { useLocation } from 'react-router-dom';
import { useQuery } from '@/hooks/useQuery';
import { SettingsTabs } from '@/store/global/initialState';

/**
 * Returns the active setting page key (common/sync/agent/...)
 */
export const useActiveSettingsKey = () => {
  const location = useLocation();
  const { tab } = useQuery();

  const tabs = location.pathname.split('/').at(-1);

  if (tabs === 'settings') return SettingsTabs.Common;

  if (tabs === 'modal') return tab as SettingsTabs;

  return tabs as SettingsTabs;
};
