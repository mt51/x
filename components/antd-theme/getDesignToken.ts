import { createTheme, getComputedToken } from '@ant-design/cssinjs';

import type { AliasToken } from './interface';
import defaultTheme from './themes/default/theme';
import seedToken from './themes/seed';
import formatToken from './util/alias';

const getDesignToken = (config?: any): AliasToken => {
  const theme = config?.algorithm ? createTheme(config.algorithm) : defaultTheme;
  const mergedToken = {
    ...seedToken,
    ...config?.token,
  };
  return getComputedToken(mergedToken as any, { override: config?.token }, theme, formatToken);
};

export default getDesignToken;
