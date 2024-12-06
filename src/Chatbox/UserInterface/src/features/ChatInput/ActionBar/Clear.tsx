import { ActionIcon } from '@lobehub/ui';
import { Popconfirm } from 'antd';
import { Eraser } from 'lucide-react';
import { memo, useCallback, useState } from 'react';

const Clear = memo(() => {
  const [confirmOpened, updateConfirmOpened] = useState(false);

  const resetConversation = useCallback(async () => {
    
  }, []);

  return (
    <Popconfirm
      arrow={false}
      okButtonProps={{ danger: true, type: 'primary' }}
      onConfirm={resetConversation}
      onOpenChange={updateConfirmOpened}
      open={confirmOpened}
      placement={'topRight'}
      title={
        <div style={{ marginBottom: '8px', whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
            确定清空当前对话吗？
        </div>
      }
    >
      <ActionIcon
        icon={Eraser}
        overlayStyle={{ maxWidth: 'none' }}
        placement={'bottom'}
        title={'清空'}
      />
    </Popconfirm>
  );
});

export default Clear;
