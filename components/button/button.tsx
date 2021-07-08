import React from 'react';
import classNames from 'classnames';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import { Omit, tuple } from './../_util/type';
import { getPrefixCls } from '../_util/base';

const ButtonTypes = tuple('default', 'primary', 'ghost', 'link', 'text');
export type ButtonType = typeof ButtonTypes[number];
const ButtonShapes = tuple('circle', 'round');
export type ButtonShape = typeof ButtonShapes[number];
const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];


export type BaseButtonProps = {
    className?: string;
    disabled?: boolean;
    type?: ButtonType;
    shape?: ButtonShape;
    size?: SizeType;
    prefixCls?: string;
    hollow?: boolean;
    dashed?: boolean;
}

export type NativeButtonProps = {
    htmlType?: ButtonHTMLType;
    onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = NativeButtonProps;

interface CompoundedComponent extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> {
    _LOSO_BUTTON: boolean
};

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        children,
        className,
        type = "default",
        shape,
        size: customizeSize,
        disabled = false,
        hollow = false,
        dashed = false,
        htmlType = 'button' as ButtonProps['htmlType'],
        ...rest
    } = props;
    const size = React.useContext(SizeContext);

    const prefixCls = getPrefixCls('btn', customizePrefixCls);
    const buttonRef = (ref as any) || React.createRef<HTMLElement>();

    let sizeCls = '';
    switch (customizeSize || size) {
        case 'large':
            sizeCls = 'lg';
            break;
        case 'small':
            sizeCls = 'sm';
            break;
        default:
            break;
    };
    className
    const classes = classNames(
        prefixCls, {
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-${sizeCls}`]: sizeCls,
        [`${prefixCls}-${shape}`]: shape,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-hollow`]: hollow,
        [`${prefixCls}-dashed`]: dashed
    },
        className)
    const buttonNode = (
        <button
            {... (rest as NativeButtonProps)}
            type={htmlType}
            disabled={disabled}
            ref={buttonRef}
            className={classes}
        >
            {children}
        </button>
    );
    return buttonNode;
}


const Button = React.forwardRef<unknown, ButtonProps>(InternalButton) as CompoundedComponent;

Button.displayName = 'Button';
Button._LOSO_BUTTON = true;

export default Button;