import React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/es/omit';

import type { FlexProps } from './interface';
import useStyle from './style';
import createFlexClassNames, { isPresetSize } from './utils';

const Flex = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    prefixCls = 'flex',
    rootClassName,
    className,
    style,
    flex,
    gap,
    children,
    vertical = false,
    ...othersProps
  } = props;

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const mergedVertical = vertical;

  const mergedCls = classNames(
    className,
    rootClassName,
    prefixCls,
    hashId,
    cssVarCls,
    createFlexClassNames(prefixCls, props),
    {
      [`${prefixCls}-gap-${gap}`]: isPresetSize(gap),
      [`${prefixCls}-vertical`]: mergedVertical,
    },
  );

  const mergedStyle: React.CSSProperties = { ...style };

  if (flex) {
    mergedStyle.flex = flex;
  }

  if (gap && !isPresetSize(gap)) {
    mergedStyle.gap = gap;
  }

  return wrapCSSVar(
    <div
      ref={ref}
      className={mergedCls}
      style={mergedStyle}
      {...omit(othersProps, ['justify', 'wrap', 'align'])}
    >
      {children}
    </div>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Flex.displayName = 'Flex';
}

export default Flex;
