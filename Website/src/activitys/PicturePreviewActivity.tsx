import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useActivity } from "@Hooks/useActivity";
import Box from "@mui/material/Box";

const PicturePreviewActivity = () => {
  const { context, extra } = useActivity<any>();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
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
      backgroundStyle={{
        backgroundColor: "black",
      }}
      renderToolbar={renderToolbar}
    >
      <TransformWrapper>
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{
            display: "flex",
            alignContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Box component="img" sx={{ width: "100%", height: "100%", objectFit: "contain" }} src={extra.picture} />
        </TransformComponent>
      </TransformWrapper>
    </Page>
  );
};

export default PicturePreviewActivity;
