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

const PicturePreviewActivity = () => {
  const { context, extra } = useActivity<any>();
  const [fullscreen, setFullscreen] = React.useState(false);

  const renderToolbar = () => {
    return (
      <Toolbar
        modifier="noshadow"
        sx={{
          backgroundColor: "transparent",
        }}
      >
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center></Toolbar.Center>
      </Toolbar>
    );
  };

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
          <Box component="img" sx={{ ...generalStyle, objectFit: "contain" }} src={extra.picture} />
        </TransformComponent>
      </TransformWrapper>
    </Page>
  );
};

export default PicturePreviewActivity;
