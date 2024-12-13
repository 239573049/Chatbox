import { memo } from 'react';

import ActionBar from '@/features/ChatInput/ActionBar';
import { ActionKeys } from '../ActionBar/config';

interface HeaderProps {
  leftActions: ActionKeys[];
  rightActions: ActionKeys[];
}

const Header = memo<HeaderProps>(({ leftActions, rightActions }) => (
  <ActionBar
    leftActions={leftActions}
    rightActions={rightActions}
  />
));

export default Header;
