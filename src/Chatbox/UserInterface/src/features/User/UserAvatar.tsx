
import { Avatar, type AvatarProps } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { forwardRef } from 'react';

import { useUserStore } from '@/store/user';

const useStyles = createStyles(({ css, token }) => ({
    clickable: css`
    position: relative;
    transition: all 200ms ease-out 0s;

    &::before {
      content: '';

      position: absolute;
      transform: skewX(-45deg) translateX(-400%);

      overflow: hidden;

      box-sizing: border-box;
      width: 25%;
      height: 100%;

      background: rgba(255, 255, 255, 50%);

      transition: all 200ms ease-out 0s;
    }

    &:hover {
      box-shadow: 0 0 0 2px ${token.colorPrimary};

      &::before {
        transform: skewX(-45deg) translateX(400%);
      }
    }
  `,
}));

export interface UserAvatarProps extends AvatarProps {
    clickable?: boolean;
}

const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
    ({ size = 40, background, clickable, className, style, ...rest }, ref) => {
        const { styles, cx } = useStyles();
        const { userInfo,
            isSignIn,
        } = useUserStore((state) => ({
            userInfo: state.userInfo,
            isSignIn: state.isSignIn,
        }));
        
        return (
            <Avatar
                alt={userInfo?.avatar}
                avatar={userInfo?.avatar}
                background={isSignIn && userInfo?.avatar ? background : undefined}
                className={cx(clickable && styles.clickable, className)}
                ref={ref}
                size={size}
                style={{ flex: 'none', ...style }}
                unoptimized
                {...rest}
            />
        );
    },
);

UserAvatar.displayName = 'UserAvatar';

export default UserAvatar;
