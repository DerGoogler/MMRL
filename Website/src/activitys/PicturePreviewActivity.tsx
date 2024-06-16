import React from "react";
import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useActivity } from "@Hooks/useActivity";
import Box from "@mui/material/Box";

const generalStyle = {
  width: "100%",
  height: `100%`,
};

interface PicturePreviewActivityExtra {
  picture?: string;
  src: string;
}

const PicturePreviewActivity = () => {
  const { context, extra } = useActivity<PicturePreviewActivityExtra>();
  const { picture, src } = extra;
  const [fullscreen, setFullscreen] = React.useState(false);

  const renderToolbar = () => {
    return (
      <Toolbar
        modifier="noshadow"
        sx={{
          backgroundColor: "transparent",
          background: "linear-gradient(0deg, rgba(25,159,75,0) 0%, rgba(16,16,16,1) 150%)",
        }}
      >
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center></Toolbar.Center>
      </Toolbar>
    );
  };

  if (typeof (picture || src) !== "string") throw new TypeError("'src' is undefined in PicturePreviewActivity");

  return (
    <Page
      modifier="noshadow"
      renderToolbar={renderToolbar}
      backgroundStyle={{
        top: `0px !important`,
      }}
      sx={{
        top: `0px !important`,
        paddingBottom: 0,
      }}
    >
      <TransformWrapper>
        <TransformComponent
          wrapperStyle={{ ...generalStyle }}
          contentStyle={{
            display: "flex",
            alignContent: "center",
            ...generalStyle,
          }}
        >
          <Box component="img" sx={{ ...generalStyle, objectFit: "contain" }} src={picture || src} />
        </TransformComponent>
      </TransformWrapper>
    </Page>
  );
};

export default PicturePreviewActivity;
