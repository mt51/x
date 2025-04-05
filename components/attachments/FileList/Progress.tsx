import { Progress as AntdProgress } from 'antd';
import React from 'react';

export interface ProgressProps {
  prefixCls: string;
  percent: number;
}

export default function Progress(props: ProgressProps) {
  const { percent } = props;

  return (
    <AntdProgress
      type="circle"
      percent={percent}
      strokeColor="#FFF"
      trailColor="rgba(255, 255, 255, 0.3)"
      format={(ptg) => (
        <span style={{ color: '#FFF' }}>{(ptg || 0).toFixed(0)}%</span>
      )}
    />
  );
}
