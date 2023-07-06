import React from "react";
export declare const Context: React.Context<{}>;
export declare const Extra: React.Context<{}>;
export declare function useActivity<E = {}>(): {
    context: PushProps<E>;
    extra: E;
};
