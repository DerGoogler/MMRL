declare function Deprecated(deprecationReason: string): (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
    get(): (...args: any[]) => void;
};
export { Deprecated };
