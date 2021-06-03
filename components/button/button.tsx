import React from 'react';

export type AnchorButtonProps = {
    href?: string
};

export type NativeButtonProps = {
    htmlType: HTMLButtonElement
};

export type ButtonTypes = AnchorButtonProps | NativeButtonProps;

const Button = () => {
    return (
        <div className='LOSO-button'>
            button components
        </div>
    )
};

export default Button;