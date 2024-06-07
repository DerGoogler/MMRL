import onsCustomElement from "@Util/onsCustomElement";
import { SxProps } from "@mui/material";

const CarouselItem = onsCustomElement<HTMLElement, HTMLCarouselItem>("ons-carousel-item")({});

interface HTMLCarouselItem extends React.PropsWithChildren {
  sx?: SxProps;
  modifier?: string;
}

export { HTMLCarouselItem, CarouselItem };
