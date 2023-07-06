interface State<T> {
    data?: T;
    error?: Error;
}
declare type Options = RequestInit & {
    fetchType?: string;
};
export declare function useFetch<T = unknown>(url?: string, options?: Options): State<T>;
export {};
