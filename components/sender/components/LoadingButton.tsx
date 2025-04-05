import type { ButtonProps } from 'antd';
import classNames from 'classnames';
import * as React from 'react';
import StopLoadingIcon from '../StopLoading';
import ActionButton, { ActionButtonContext } from './ActionButton';

function LoadingButton(props: ButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const { prefixCls } = React.useContext(ActionButtonContext);
  const { className } = props;

  return (
    <ActionButton
      icon={null}
      color="primary"
      type="text"
      shape="circle"
      {...props}
      className={classNames(className, `${prefixCls}-loading-button`)}
      action="onCancel"
      ref={ref}
    >
      <StopLoadingIcon className={`${prefixCls}-loading-icon`} />
    </ActionButton>
  );
}

export default React.forwardRef(LoadingButton);
