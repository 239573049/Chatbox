import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox, FlexboxProps } from 'react-layout-kit';

import PlanTag from '@/features/User/PlanTag';
import { useUserStore } from '@/store/user';

import UserAvatar, { type UserAvatarProps } from './UserAvatar';

const useStyles = createStyles(({ css, token }) => ({
    email: css`
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
  `,
    username: css`
    line-height: 1;
    color: ${token.colorTextDescription};
  `,
}));

export interface UserInfoProps extends FlexboxProps {
    avatarProps?: Partial<UserAvatarProps>;
}

const UserInfo = memo<UserInfoProps>(({ avatarProps, ...rest }) => {
    const { styles, theme } = useStyles();
    const [isSignedIn, userInfo] = useUserStore((s) => [s.isSignIn, s.userInfo]);

    return (
        <Flexbox
            align={'center'}
            gap={12}
            horizontal
            justify={'space-between'}
            paddingBlock={12}
            paddingInline={12}
            {...rest}
        >
            <Flexbox align={'center'} gap={12} horizontal>
                <UserAvatar background={theme.colorFill} size={48} {...avatarProps} />
                <Flexbox flex={1} gap={6}>
                    <div className={styles.username}>{userInfo?.username}</div>
                    <div className={styles.email}>{userInfo?.email}</div>
                </Flexbox>
            </Flexbox>
            {isSignedIn && <PlanTag />}
        </Flexbox>
    );
});

export default UserInfo;
