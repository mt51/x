import { Typography } from 'antd';
import classnames from 'classnames';
import React from 'react';
import type { GetProp } from '../_util/type';
import { ConfigProviderProps } from 'antd/es/config-provider';

export interface GroupTitleProps {
  children?: React.ReactNode;
}

// User should not care about internal state.
// Which should pass by context instead.
export const GroupTitleContext = React.createContext<{
  prefixCls?: GetProp<ConfigProviderProps, 'prefixCls'>;
}>(null!);

const GroupTitle: React.FC<GroupTitleProps> = ({ children }) => {
  const { prefixCls } = React.useContext(GroupTitleContext);

  return (
    <div className={classnames(`${prefixCls}-group-title`)}>
      {children && <Typography.Text>{children}</Typography.Text>}
    </div>
  );
};

export default GroupTitle;
