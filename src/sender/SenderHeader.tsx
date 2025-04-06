import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import CSSMotion, { type MotionEventHandler } from 'rc-motion';
import * as React from 'react';

export interface SendHeaderContextProps {
  prefixCls: string;
}

export const SendHeaderContext = React.createContext<SendHeaderContextProps>({} as any);

export type SemanticType = 'header' | 'content';

export interface SenderHeaderProps {
  forceRender?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  classNames?: Partial<Record<SemanticType, string>>;
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;
  closable?: boolean;
}

const collapseHeight: MotionEventHandler = () => ({
  height: 0,
});
const expandedHeight: MotionEventHandler = (ele) => ({
  height: ele.scrollHeight,
});

export default function SenderHeader(props: SenderHeaderProps) {
  const {
    title,
    onOpenChange,
    open,
    children,
    className,
    style,
    classNames: classes = {},
    styles = {},
    closable,
    forceRender,
  } = props;

  const { prefixCls } = React.useContext(SendHeaderContext);

  const headerCls = `${prefixCls}-header`;

  return (
    <CSSMotion
      motionEnter
      motionLeave
      motionName={`${headerCls}-motion`}
      leavedClassName={`${headerCls}-motion-hidden`}
      onEnterStart={collapseHeight}
      onEnterActive={expandedHeight}
      onLeaveStart={expandedHeight}
      onLeaveActive={collapseHeight}
      visible={open}
      forceRender={forceRender}
    >
      {({ className: motionClassName, style: motionStyle }) => {
        return (
          <div
            className={classNames(headerCls, motionClassName, className)}
            style={{
              ...motionStyle,
              ...style,
            }}
          >
            {/* Header */}
            {(closable !== false || title) && (
              <div
                className={
                  // We follow antd naming standard here.
                  // So the header part is use `-header` suffix.
                  // Though its little bit weird for double `-header`.
                  classNames(`${headerCls}-header`, classes.header)
                }
                style={{
                  ...styles.header,
                }}
              >
                <div className={`${headerCls}-title`}>{title}</div>
                {closable !== false && (
                  <div className={`${headerCls}-close`}>
                    <Button
                      type="text"
                      icon={<CloseOutlined />}
                      size="small"
                      onClick={() => {
                        onOpenChange?.(!open);
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            {children && (
              <div
                className={classNames(`${headerCls}-content`, classes.content)}
                style={{
                  ...styles.content,
                }}
              >
                {children}
              </div>
            )}
          </div>
        );
      }}
    </CSSMotion>
  );
}
