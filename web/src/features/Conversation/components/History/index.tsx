import { memo } from 'react';
import { Flexbox } from 'react-layout-kit'

import HistoryDivider from './HistoryDivider';

const History = memo(() => {

  return (
    <Flexbox paddingInline={16} style={{ paddingBottom: 8 }}>
      <HistoryDivider enable />
    </Flexbox>
  );
});

export default History;
