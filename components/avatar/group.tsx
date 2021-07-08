import * as React from 'react';
import { AvatarSize } from './SizeContext';
import toArray from 'rc-util/lib/Children/toArray';
import { cloneElement } from '../_util/reactNode';
import { SizeContextProvider } from './SizeContext';
import { getPrefixCls } from '../_util/base';
import classNames from 'classnames';

export interface GroupProps {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    prefixCls?: string;
    maxCount?: number;
    maxStyle?: React.CSSProperties;
    maxPopoverPlacement?: 'top' | 'bottom';
    size?: AvatarSize;
}

const Group: React.FC<GroupProps> = props => {
    const { children , size, prefixCls: customizePrefixCls, className = '' } = props;
    const childrenWidthProps = toArray(children).map((child, index) => cloneElement(child, {
        key: `avatar-key-${index}`,
    }));
    const prefixCls = getPrefixCls('avatar-group', customizePrefixCls);
    const classes = classNames(
        prefixCls,
        className
    )
    return (
        <SizeContextProvider size={size}>
            <div
                className={classes}
                style={props.style}
            >
                {childrenWidthProps}
            </div>

        </SizeContextProvider>
    )
};

export default Group;