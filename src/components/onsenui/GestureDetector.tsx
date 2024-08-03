import "onsenui/esm/elements/ons-gesture-detector";
import onsCustomElement from "@Util/onsCustomElement";

export type HTMLGestureDetectorEvent = (e?: Event) => void;

interface HTMLGestureDetector extends React.PropsWithChildren {
  onDrag?: HTMLGestureDetectorEvent;
  onDragLeft?: HTMLGestureDetectorEvent;
  onDragRight?: HTMLGestureDetectorEvent;
  onDragUp?: HTMLGestureDetectorEvent;
  onDragDown?: HTMLGestureDetectorEvent;
  onHold?: HTMLGestureDetectorEvent;
  onRelease?: HTMLGestureDetectorEvent;
  onSwipe?: HTMLGestureDetectorEvent;
  onSwipeLeft?: HTMLGestureDetectorEvent;
  onSwipeRight?: HTMLGestureDetectorEvent;
  onSwipeUp?: HTMLGestureDetectorEvent;
  onSwipeDown?: HTMLGestureDetectorEvent;
  onTap?: HTMLGestureDetectorEvent;
  onDoubleTap?: HTMLGestureDetectorEvent;
  onPinch?: HTMLGestureDetectorEvent;
  onPinchIn?: HTMLGestureDetectorEvent;
  onPinchOut?: HTMLGestureDetectorEvent;
  onTouch?: HTMLGestureDetectorEvent;
  onTransform?: HTMLGestureDetectorEvent;
  onRotate?: HTMLGestureDetectorEvent;
}

export const GestureDetector = onsCustomElement<HTMLElement, HTMLGestureDetector>("ons-gesture-detector")({});
