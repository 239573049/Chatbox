import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';
import { useNavigate } from 'react-router-dom';

import BrandWatermark from '@/components/BrandWatermark';
import Menu from '@/components/Menu';
import { useUserStore } from '@/store/user';

import DataStatistics from '../DataStatistics';
import UserInfo from '../UserInfo';
import UserLoginOrSignup from '../UserLoginOrSignup';
import ThemeButton from './ThemeButton';
import { useMenu } from './useMenu';


const PanelContent = memo<{ closePopover: () => void }>(({ closePopover }) => {
    const navigate = useNavigate();

    const [isSignedIn, signOut] = useUserStore((s) => [s.isSignIn, s.signOut]);
    const { mainItems, logoutItems } = useMenu();

    const handleOpenProfile = () => {
        closePopover();
        navigate('/profile');
    };

    const handleSignIn = () => {
        closePopover();
        navigate('/login');
    };

    const handleSignOut = () => {
        signOut();
        closePopover();
        navigate('/login');
    };

    return (
        <Flexbox gap={2} style={{ minWidth: 300 }}>
            {isSignedIn ? (
                <>
                    <UserInfo onClick={handleOpenProfile} />
                    <DataStatistics />
                </>
            ) : (
                <UserLoginOrSignup onClick={handleSignIn} />
            )}

            <Menu items={mainItems} onClick={closePopover} />
            <Flexbox
                align={'center'}
                horizontal
                justify={'space-between'}
                style={isSignedIn ? { paddingRight: 6 } : { padding: '6px 6px 6px 16px' }}
            >
                {isSignedIn ? (
                    <Menu items={logoutItems} onClick={handleSignOut} />
                ) : (
                    <BrandWatermark />
                )}
                <Flexbox align={'center'} flex={'none'} gap={6} horizontal>
                    <ThemeButton />
                </Flexbox>
            </Flexbox>
        </Flexbox>
    );
});

export default PanelContent;
