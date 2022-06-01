import { Card, Toolbar } from "react-onsenui";
import AppCompatActivity from "./AppCompatActivity";
import AMOGUS from "./../utils/amogus.gif";

class NoRootActivity extends AppCompatActivity {
  protected onCreateToolbar = () => {
    return (
      // @ts-ignore
      <Toolbar>
        <div className="center">No Root</div>
        {/**
        // @ts-ignore */}
      </Toolbar>
    );
  };

  protected onCreate = () => {
    return (
      <>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            WebkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src={AMOGUS}
            style={{
              width: "100px",
              height: "100px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          {/*
          //@ts-ignore*/}
          <Card
            style={{
              marginTop: "0px",
            }}
          >
            <div className="content">
              It seems that this device has no root? Please check the Magisk app and enable root permission. If you don't have root, then
              search in the internet for your device.
            </div>
          </Card>
        </div>
      </>
    );
  };
}

export default NoRootActivity;
