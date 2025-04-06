import { createTheme, useCacheToken } from '@ant-design/cssinjs';
import antdTheme from '../antd-theme';
import { ignore, unitless } from '../antd-theme/useToken';
import formatToken from '../antd-theme/util/alias';
import React from 'react';

import version from '../version';

import type { Theme } from '@ant-design/cssinjs';
import type { DesignTokenProviderProps } from '../antd-theme/context';
import type { AliasToken, GlobalToken, SeedToken } from './cssinjs-utils';

const defaultTheme: Theme<SeedToken, AliasToken> = createTheme(antdTheme.defaultAlgorithm);

const preserve: {
  [key in keyof AliasToken]?: boolean;
} = {
  screenXS: true,
  screenXSMin: true,
  screenXSMax: true,
  screenSM: true,
  screenSMMin: true,
  screenSMMax: true,
  screenMD: true,
  screenMDMin: true,
  screenMDMax: true,
  screenLG: true,
  screenLGMin: true,
  screenLGMax: true,
  screenXL: true,
  screenXLMin: true,
  screenXLMax: true,
  screenXXL: true,
  screenXXLMin: true,
};

export const getComputedToken = (
  originToken: SeedToken,
  overrideToken: DesignTokenProviderProps['components'] & {
    override?: Partial<AliasToken>;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: Theme<any, any>,
) => {
  const derivativeToken = theme.getDerivativeToken(originToken);

  const { override, ...components } = overrideToken;

  // Merge with override
  let mergedDerivativeToken = {
    ...derivativeToken,
    override,
  };

  // Format if needed
  mergedDerivativeToken = formatToken(mergedDerivativeToken);

  if (components) {
    Object.entries(components).forEach(([key, value]) => {
      const { theme: componentTheme, ...componentTokens } = value;
      let mergedComponentToken = componentTokens;
      if (componentTheme) {
        mergedComponentToken = getComputedToken(
          {
            ...mergedDerivativeToken,
            ...componentTokens,
          },
          {
            override: componentTokens,
          },
          componentTheme,
        );
      }
      mergedDerivativeToken[key] = mergedComponentToken;
    });
  }

  return mergedDerivativeToken;
};
export function useInternalToken(): [
  theme: Theme<SeedToken, AliasToken>,
  token: GlobalToken,
  hashId: string,
  realToken: GlobalToken,
  cssVar?: DesignTokenProviderProps['cssVar'],
] {
  const {
    token: rootDesignToken,
    hashed,
    theme = defaultTheme,
    override,
    cssVar,
  } = React.useContext(antdTheme._internalContext);

  const [token, hashId, realToken] = useCacheToken<GlobalToken, SeedToken>(
    theme,
    [antdTheme.defaultSeed, rootDesignToken],
    {
      salt: `${version}-${hashed || ''}`,
      override,
      getComputedToken,
      cssVar: cssVar && {
        prefix: cssVar.prefix,
        key: cssVar.key,
        unitless,
        ignore,
        preserve,
      },
    },
  );
  return [theme as Theme<SeedToken, AliasToken>, realToken, hashed ? hashId : '', token, cssVar];
}

export default function useToken() {
  const [theme, token, hashId] = useInternalToken();

  return { theme, token, hashId };
}
