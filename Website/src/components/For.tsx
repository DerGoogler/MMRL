import React from "react";

export type ForProps<T, U extends JSX.Element> = {
  each: readonly T[];
  fallback: () => JSX.Element;
  catch: (e: Error | undefined) => JSX.Element;
  render: (item: T, index: number) => U;
  renderTop?: () => JSX.Element;
};

export function For<T, U extends JSX.Element>(props: ForProps<T, U>) {
  const handler = () => {
    try {
      if (props.each.length !== 0) {
        return props.each.map(props.render);
      } else {
        return props.fallback();
      }
    } catch (e) {
      if (e instanceof Error) {
        return props.catch(e);
      } else {
        return props.catch(undefined);
      }
    }
  };

  return (
    <React.Fragment>
      {props.each.length !== 0 && props.renderTop && props.renderTop()}
      {handler()}
    </React.Fragment>
  );
}
