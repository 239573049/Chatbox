import { Button } from 'antd';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

const UserLoginOrSignup = memo<{ onClick: () => void }>(({ onClick }) => {

  return (
    <>
      <Flexbox paddingBlock={12} paddingInline={16} width={'100%'}>
        <Button block onClick={onClick} type={'primary'}>
            登录
        </Button>
      </Flexbox>
    </>
  );
});

export default UserLoginOrSignup;
