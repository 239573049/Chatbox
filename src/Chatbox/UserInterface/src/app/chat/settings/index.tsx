import { useResponsive } from 'antd-style';
import { memo, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';

import Footer from '@/features/Setting/Footer';
import SettingContainer from '@/features/Setting/SettingContainer';

import Header from './Header';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import Category from './@category';

const Layout = memo(() => {
    const ref = useRef<any>(null);
    const { md = true } = useResponsive();
    return (
        <Flexbox
            height={'100%'}
            horizontal={md}
            ref={ref}
            style={{ position: 'relative' }}
            width={'100%'}
        >
            {md ? (
                <SideBar
                    title='系统设置'
                    desc='系统设置'
                    >
                    <Category/>
                </SideBar>
            ) : (
                <Header
                    getContainer={() => ref.current}
                    title={
                        <>
                            系统设置
                        </>
                    }
                >
                    <Category/>
                </Header>
            )}
            <SettingContainer addonAfter={<Footer />}>
                <Outlet />
            </SettingContainer>
        </Flexbox>
    );
});

Layout.displayName = 'DesktopSettingsLayout';

export default Layout;
