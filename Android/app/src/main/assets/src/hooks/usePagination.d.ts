declare function usePagination<T extends Array<any> = any>(data: T, itemsPerPage: number): {
    next: () => void;
    prev: () => void;
    jump: (page: number) => void;
    currentData: () => T;
    currentPage: number;
    maxPage: number;
};
export { usePagination };
