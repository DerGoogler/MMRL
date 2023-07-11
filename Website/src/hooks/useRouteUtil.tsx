import React from "react";
/*
 * routeStack : [userRoute, userRoute2, ...]
 * processStack: [
 * { type: push | pop | reset, route: userRoute },
 * { type: push | pop | reset, route: userRoute2 },
 * ...
 * ]
 */

type RouteExtra<E = {}> = E & {
  param?: {
    name: string;
    value: string;
  };
};

interface RouteOptions<E = {}> {
  activity: React.ElementType;
  props: {
    key: string;
    extra: RouteExtra<E>;
  };
}

interface Route<E = {}> extends RouteOptions<E> {
  activity: React.ElementType;
  props: {
    key: string;
    extra: RouteExtra<E>;
    readonly popPage?: () => void;
    readonly pushPage?: (options: RouteExtra<E>) => void; //
  };
}

type ProcessStackTypes = "replace" | "reset" | "push" | "pop";

interface RouteProcessStack<E = {}> {
  type: ProcessStackTypes;
  route?: RouteOptions<E>;
  options: any;
  key: string | null;
}

type RouteProcessFunction<E = {}> = Omit<RouteProcessStack<E>, "type">;

interface RouteContextFace<E = {}> {
  context: {
    replace: ({ route, options, key }: RouteProcessFunction<E>) => void;
    reset: ({ route, options, key }: RouteProcessFunction<E>) => void;
    push: ({ route, options, key }: RouteProcessFunction<E>) => void;
    pop: ({ options, key }: RouteProcessFunction<E>) => void;
    postPush: () => void;
    postPop: () => void;
  };
}

const RouteContext = React.createContext<RouteContextFace<any>>({
  context: {
    replace: ({ route, options, key }: RouteProcessFunction<any>) => {},
    reset: ({ route, options, key }: RouteProcessFunction<any>) => {},
    push: ({ route, options, key }: RouteProcessFunction<any>) => {},
    pop: ({ options, key }: RouteProcessFunction<any>) => {},
    postPush: () => {},
    postPop: () => {},
  },
});

interface RouteContextProviderProps<E = {}> extends React.PropsWithChildren {
  initialRoutes: Route<E>[];
}

export function RouteContextProvider<E = {}>(props: RouteContextProviderProps<E>) {
  const [routeStack, setRouteStack] = React.useState<RouteOptions<E>[]>(props.initialRoutes);
  const [processStack, setProcessStack] = React.useState<RouteProcessStack<E>[]>([]);

  const replace = ({ route, options, key }: RouteProcessFunction<E>) => {
    if (key == null || processStack.filter((el) => el.key === key).length === 0) {
      setProcessStack((prev) => [
        ...prev,
        {
          type: "replace",
          route: route,
          options: options,
          key: key,
        },
      ]);
    }

    // return {
    //   routeStack,
    //   processStack,
    // };
  };

  const reset = ({ route, options, key }: RouteProcessFunction<E>) => {
    if (key == null || processStack.filter((el) => el.key === key).length === 0) {
      setProcessStack((prev) => [
        ...prev,
        {
          type: "reset",
          route: route,
          options: options,
          key: key,
        },
      ]);
    }

    // return {
    //   routeStack,
    //   processStack,
    // };
  };

  const push = ({ route, options, key }: RouteProcessFunction<E>) => {
    if (key == null || processStack.filter((el) => el.key === key).length === 0) {
      setProcessStack((prev) => [
        ...prev,
        {
          type: "push",
          route: route,
          options: options,
          key: key,
        },
      ]);
    }

    // return {
    //   routeStack,
    //   processStack,
    // };
  };

  const pop = ({ options, key }: RouteProcessFunction<E>) => {
    /**
     * Safegaurd to ensure that not
     * too many pages are popped from
     * the stack.
     */
    const pops = processStack.filter((x) => x.type === "pop").length;

    if (pops + 1 >= routeStack.length) {
      console.warn("Page stack is already empty");
      // return config;
    }

    setProcessStack((prev) => [
      ...prev,
      {
        type: "pop",
        key: key,
        options: options,
      },
    ]);

    // return {
    //   routeStack,
    //   processStack,
    // };
  };

  const postPush = () => {
    const next = processStack.shift() as unknown as RouteProcessStack<E>;

    const type = next.type;
    let route = next.route as RouteOptions<E>;

    if (type === "push") {
      if (route !== null) {
        setRouteStack((prev) => [...prev, route]);
      }
    } else if (type === "reset") {
      if (!Array.isArray(route)) setRouteStack([route]);

      // @ts-ignore
      setRouteStack(route);
    } else if (type === "replace") {
      // routeStack.pop();
      // routeStack.push(route);
      setRouteStack((prev) => {
        prev.pop();
        prev.push(route);

        return prev;
      });
    }

    // return {
    //   routeStack,
    //   processStack,
    // };
  };

  const postPop = () => {
    setRouteStack((prev) => prev.slice(0, prev.length - 1));
    setProcessStack((prev) => prev.slice(1));

    // return {
    //   routeStack,
    //   processStack,
    // };
  };

  return (
    <RouteContext.Provider
      value={{
        context: {
          replace,
          reset,
          push,
          pop,
          postPush,
          postPop,
        },
      }}
      children={props.children}
    />
  );
}

export function useRouteUtil<E = {}>() {
  return React.useContext<RouteContextFace<E>>(RouteContext);
}
