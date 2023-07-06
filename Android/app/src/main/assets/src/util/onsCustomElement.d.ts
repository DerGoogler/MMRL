import React from "react";
interface CustomElementOptions {
    notAttributes?: string[];
    deprecated?: {
        [name: string]: string;
    };
}
export default function onsCustomElement<E = HTMLElement, P = {}>(WrappedComponent: React.ComponentType<any> | keyof JSX.IntrinsicElements, options?: CustomElementOptions): React.ForwardRefExoticComponent<React.PropsWithoutRef<React.ClassAttributes<P> & React.HTMLAttributes<P> & P> & React.RefAttributes<E>>;
export {};
