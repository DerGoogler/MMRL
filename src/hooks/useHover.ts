import { useState } from "react";

import type { RefObject } from "react";

import { useEventListener } from "usehooks-ts";

export function useHover<T extends HTMLElement = HTMLElement>(elementRef: RefObject<T>): boolean {
  const [value, setValue] = useState<boolean>(false);

  const handleEnter = () => {
    setValue(true);
  };
  const handleLeave = () => {
    setValue(false);
  };

  useEventListener("touchstart", handleEnter, elementRef);
  useEventListener("touchend", handleLeave, elementRef);
  useEventListener("mouseenter", handleEnter, elementRef);
  useEventListener("mouseleave", handleLeave, elementRef);

  return value;
}
