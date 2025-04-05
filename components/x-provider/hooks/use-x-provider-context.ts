import { ConfigProvider } from 'antd';
import { defaultIconPrefixCls } from "antd/es/config-provider";
import React from 'react';

export const defaultPrefixCls = 'ant';

function useXProviderContext() {
  const { getPrefixCls, direction, csp, iconPrefixCls } = React.useContext(
    ConfigProvider.ConfigContext,
  );

  return {
    getPrefixCls,
    direction,
    csp,
    iconPrefixCls: iconPrefixCls || defaultIconPrefixCls,
  };
}

export default useXProviderContext;
