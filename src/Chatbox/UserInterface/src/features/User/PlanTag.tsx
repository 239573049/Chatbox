import { Tooltip } from '@lobehub/ui';
import { Tag } from 'antd';
import { useTheme } from 'antd-style';
import { CSSProperties, memo, useMemo } from 'react';

export enum PlanType {
  // 免费
  Free = 'free',
  // 专业版
  Pro = 'pro',
  // 企业版
  Enterprise = 'enterprise',
}

export interface PlanTagProps {
  type?: PlanType;
}

const PlanTag = memo<PlanTagProps>(({ type = PlanType.Free }) => {
  const theme = useTheme();
  const tag: {
    desc: string;
    style: CSSProperties;
    title: string;
  } = useMemo(() => {
    switch (type) {
      case PlanType.Free: {
        return {
          desc: '',
          style: {
            background: theme.colorFill,
          },
          title: '免费',
        };
      }
      case PlanType.Pro: {
        return {
          desc: '',
          style: {
            background: theme.colorFillAlter,
          },
          title: '专业版',
        };
      }
      case PlanType.Enterprise: {
        return {
          desc: '',
          style: {
            background: theme.colorError,
          },
          title: '企业版',
        };
      }
    }
  }, []);

  return (
    <Tooltip title={tag.desc}>
      <Tag bordered={false} style={{ ...tag.style, borderRadius: 12, cursor: 'pointer' }}>
        {tag.title}
      </Tag>
    </Tooltip>
  );
});

export default PlanTag;
