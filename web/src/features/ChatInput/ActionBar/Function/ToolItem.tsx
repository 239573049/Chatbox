import { Checkbox } from 'antd';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import PluginTag from '@/features/PluginStore/PluginItem/PluginTag';
import { useToolStore } from '@/store/tool';
import { customPluginSelectors,
    isCustomPlugin
 } from '@/store/tool/selectors';

const ToolItem = memo<{ identifier: string; label: string }>(({ identifier, label }) => {
  const [checked, togglePlugin] = useToolStore((s) => [
    customPluginSelectors(identifier)(s),
    s.togglePlugin,
  ]);

  const isCustom = useToolStore((s) => isCustomPlugin(identifier)(s));

  return (
    <Flexbox
      gap={40}
      horizontal
      justify={'space-between'}
      onClick={(e) => {
        e.stopPropagation();
        togglePlugin(identifier);
      }}
      padding={'8px 12px'}
    >
      <Flexbox align={'center'} gap={8} horizontal>
        {label}
        {isCustom && <PluginTag identifier={identifier} showText={false} />}
      </Flexbox>
      <Checkbox
        checked={checked}
        onClick={(e) => {
          e.stopPropagation();
          togglePlugin(identifier);
        }}
      />
    </Flexbox>
  );
});

export default ToolItem;
