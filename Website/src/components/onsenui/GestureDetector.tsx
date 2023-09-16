import "onsenui/esm/elements/ons-gesture-detector";
import onsCustomElement from "@Util/onsCustomElement";

interface HTMLGestureDetector extends React.PropsWithChildren {
  onDrag?: () => void;
  onDragLeft?: () => void;
  onDragRight?: () => void;
  onDragUp?: () => void;
  onDragDown?: () => void;
  onHold?: () => void;
  onRelease?: () => void;
  onSwipe?: (ev?: any) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onPinch?: () => void;
  onPinchIn?: () => void;
  onPinchOut?: () => void;
  onTouch?: () => void;
  onTransform?: () => void;
  onRotate?: () => void;
}

export const GestureDetector = onsCustomElement<HTMLElement, HTMLGestureDetector>("ons-gesture-detector")({});
