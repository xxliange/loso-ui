import * as React from 'react';

export const { isValidElement } = React;

type AnyObject = Record<any, any>;

type RenderProps = undefined | AnyObject | ((originProps: AnyObject) => AnyObject | undefined);

export function replaceElement(
    element: React.ReactNode,
    replaceement: React.ReactNode,
    props: RenderProps
): React.ReactNode {
    if (!isValidElement(element)) return replaceement;
    return React.cloneElement(
        element,
        typeof props === 'function' ? props(element.props || {}) : props,
    );
}

export function cloneElement(element: React.ReactNode, props?: RenderProps): React.ReactElement {
    return replaceElement(element, element, props) as React.ReactElement;
}