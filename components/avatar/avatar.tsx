import React from 'react';
import { AvatarSize } from './SizeContext';
import { composeRef } from 'rc-util/lib/ref';
import { getPrefixCls } from '../_util/base';
import classNames from 'classnames';
import SizeContext from './SizeContext';

export type AvatarProps = {
    shape?: 'circle' | 'square'; // 头像形状
    size?: AvatarSize;
    gap?: number;
    src?: string;
    srcSet?: string;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    children?: React.ReactNode;
    alt?: string;
    draggable?: boolean;
    onError?: () => boolean;
}

const InternalAvatar: React.ForwardRefRenderFunction<unknown, AvatarProps> = (props, ref) => {
    const groupSize = React.useContext(SizeContext);
    const [scale, setScale] = React.useState<number>(1);
    const [mounted, setMoundted] = React.useState<boolean>(false);
    const [isImgExist, setIsImgExist] = React.useState<boolean>(true);

    const avatarNodeRef = React.useRef<HTMLElement>();
    const avatarChildrenRef = React.useRef<HTMLElement>();

    const avatarNodeMergeRef = composeRef(ref, avatarNodeRef);
    const setScaleParam = () => {
        if (!avatarChildrenRef.current || !avatarNodeRef.current) return;
        const childrenWidth = avatarChildrenRef.current.offsetWidth;
        const nodeWidth = avatarNodeRef.current.offsetWidth;
        if (childrenWidth !== 0 && nodeWidth !== 0) {
            const { gap = 4 } = props;
            if (gap * 2 < nodeWidth) {
                setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1);
            }
        }
    };

    React.useEffect(() => {
        setMoundted(true);
    }, []);

    React.useEffect(() => {
        setIsImgExist(true);
        setScale(1);
    }, [props.src]);
    React.useEffect(() => {
        setScaleParam();
    }, [props.gap]);
    const handleImgLoadError = () => {
        const { onError } = props;
        const errorFlag = onError ? onError() : undefined;
        if (errorFlag !== false) {
            setIsImgExist(false);
        };
    };

    const {
        prefixCls: customizePrefixCls,
        size: customSize,
        src,
        shape,
        className,
        srcSet,
        draggable,
        alt,
        children,
        ...others
    } = props;
    const size = customSize === 'default' ? groupSize : customSize;
    const prefixCls = getPrefixCls('avatar', customizePrefixCls);

    const sizeCls = classNames({
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small'
    });

    const hasImageElement = React.isValidElement(src);
    const classes = classNames(
        prefixCls,
        sizeCls,
        {
            [`${prefixCls}-${shape}`]: !!shape,
            [`${prefixCls}-image`]: hasImageElement || (src && isImgExist),
        },
        className
    );
    console.log(scale);
    const sizeStyle: React.CSSProperties = typeof size === 'number' ? {
        width: size,
        height: size,
        lineHeight: `${size}px`,
        fontSize: size/2
    } : {};
    let childrenToRender;
    if (typeof src === 'string' && isImgExist) {
        childrenToRender = (
            <img src={src} srcSet={srcSet} draggable={draggable} onError={handleImgLoadError} alt={alt} />
        );
    } else if (hasImageElement) {
        childrenToRender = src;
    } else if (mounted || scale !== 1) {
        const transformString = `scale(${scale}) translateX(-50%)`;
        const childrenStyle: React.CSSProperties = {
            msTransform: transformString,
            WebkitTransform: transformString,
            transform: transformString
        };
        const sizeChildrenStyle: React.CSSProperties =
            typeof size === 'number' ? { lineHeight: `${size}px`, } : {};
        childrenToRender = (
            <span
                className={`${prefixCls}-string`}
                ref={(node: HTMLElement) => {
                    avatarChildrenRef.current = node;
                }}
                style={{ ...sizeChildrenStyle, ...childrenStyle }}
            >
                {children}
            </span>
        )
    } else {
        childrenToRender = (
            <span
                className={`${prefixCls}-string`}
                style={{ opacity: 0 }}
                ref={(node: HTMLElement) => {
                    avatarChildrenRef.current = node
                }}
            >
                {children}
            </span>
        )
    }
    console.log(avatarChildrenRef);
    delete others.gap;
    delete others.onError;

    return (
        <span
            {...others}
            style={{ ...sizeStyle, ...others.style }}
            className={classes}
            ref={avatarNodeMergeRef as any}
        >
            {childrenToRender}
        </span>
    )
};
const Avatar = React.forwardRef<unknown, AvatarProps>(InternalAvatar);
Avatar.displayName = 'Avatar';

Avatar.defaultProps = {
    shape: 'circle' as AvatarProps['shape'],
    size: 'default' as AvatarProps['size'],
};
export default Avatar;