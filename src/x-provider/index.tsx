import { ConfigProvider as AntdConfigProvider } from 'antd';
import React from 'react';

import XProviderContext from './context';
import useXProviderContext, {
  defaultPrefixCls,
} from './hooks/use-x-provider-context';

import type { ConfigProviderProps as AntdConfigProviderProps } from 'antd/es/config-provider';
import type { XProviderProps } from './context';

const XProvider: React.FC<XProviderProps & AntdConfigProviderProps> = (
  props,
) => {
  const {
    attachments,
    bubble,
    conversations,
    prompts,
    sender,
    suggestion,
    thoughtChain,
    welcome,
    ...antdConfProps
  } = props;

  const xProviderProps = React.useMemo(() => {
    return {
      attachments,
      bubble,
      conversations,
      prompts,
      sender,
      suggestion,
      thoughtChain,
      welcome,
    };
  }, [
    attachments,
    bubble,
    conversations,
    prompts,
    sender,
    suggestion,
    thoughtChain,
    welcome,
  ]);

  return (
    <XProviderContext.Provider value={xProviderProps}>
      <AntdConfigProvider
        {...antdConfProps}
        // Note:  we can not set `cssVar` by default.
        //        Since when developer not wrap with XProvider,
        //        the generate css is still using css var but no css var injected.
        // Origin comment: antdx enable cssVar by default, and antd v6 will enable cssVar by default
        // theme={{ cssVar: true, ...antdConfProps?.theme }}
      />
    </XProviderContext.Provider>
  );
};

export { useXProviderContext, defaultPrefixCls };

export type { XProviderProps };

if (process.env.NODE_ENV !== 'production') {
  XProvider.displayName = 'XProvider';
}

export default XProvider;
