import axios from "axios";
import Properties from "@js.properties/properties";
import { Card, Col } from "react-onsenui";
import ViewModuleActivity from "@Activitys/ViewModuleActivity";
import Log from "@Native/Log";
import { VerifiedRounded } from "@mui/icons-material";
import { isTablet } from "react-device-detect";
import React from "react";
import { ModuleProps, useActivity } from "@Hooks/useActivity";
import { Text, useText } from "@Hooks/useLanguage";
import { os } from "@Native/os";

interface Props {
  notesUrl: string;
  downloadUrl?: string;
  moduleOptions: ModuleProps.Options[];
  stars?: int;
  last_update?: any;
  fullItem: any;
  getId: any;
  propsUrl: string;
  props?: ModuleProps.Props;
}

const ExploreModule = (props_: Props) => {
  const { context } = useActivity();
  const string = useText();

  const { notesUrl, downloadUrl, moduleOptions, stars, last_update, getId, fullItem, propsUrl, props } = props_;
  const isVerified = moduleOptions[getId]?.verified;
  const _display = moduleOptions[getId]?.display;

  const [moduleProps, setModuleProps] = React.useState<Partial<ModuleProps.Props>>({});

  const searchedCard = React.useRef(null);
  const cardName = React.useRef(null);
  const log = new Log("ExploreModule");

  React.useEffect(() => {
    axios.get(propsUrl as string).then((response) => {
      let tmp = Properties.parseToProperties(response.data);
      tmp.foxprops = {
        minApi: null as any,
        maxApi: null as any,
        minMagisk: null as any,
        needRamdisk: null as any,
        support: null as any,
        donate: null as any,
        config: null as any,
        changeBoot: null as any,
      };
      // @ts-ignore
      setModuleProps(tmp);
    });
  }, []);

  const formatDate = (date: Date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // @ts-ignore
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
  };

  const handleOpen = () => {
    context.pushPage<ModuleProps.Extra>({
      activity: ViewModuleActivity,
      props: {
        key: `view_${moduleProps.id}`,
        extra: {
          name: moduleProps.name,
          downloadUrl: downloadUrl,
          id: getId,
          author: moduleProps.author,
          notes: notesUrl,
          stars: stars,
          module_options: {
            verified: isVerified,
          },
          module_props: moduleProps as any,
        },
      },
    });
  };

  const modul = os.getSchemeParam("module");
  React.useEffect(() => {
    try {
      if (modul == getId) {
        setTimeout(() => {
          log.i(`Module found! Open ${moduleProps.name}`);
          handleOpen();
        }, 2000);
      }
    } catch (error) {
      log.w("Failed to open given module");
    }
  }, [modul]);

  const checkDeviceSize = (element: JSX.Element): JSX.Element => {
    if (isTablet) {
      return <Col style={{ width: "50%", height: "50%" }}>{element}</Col>;
    } else {
      return element;
    }
  };

  return checkDeviceSize(
    <div onClick={handleOpen}>
      {/*
      // @ts-ignore */}
      <Card
        id={getId}
        ref={searchedCard}
        //@ts-ignore
        style={{ display: _display, marginTop: "4px", marginBottom: "4px", padding: 0 }}
      >
        {moduleProps.image && <img src={moduleProps.image} alt={""} style={{ width: "100%" }} />}

        <item-card-wrapper>
          <item-title className="title">
            <item-module-name ref={cardName}>
              <span
                style={{
                  fontSize: "large",
                  overflow: "hidden",
                  textAlign: "start",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                }}
              >
                {moduleProps.name}

                {(() => {
                  if (isVerified) {
                    return (
                      <>
                        {" "}
                        <VerifiedRounded sx={{ fontSize: 16 }} />
                      </>
                    );
                  } else {
                    return null;
                  }
                })()}
              </span>
            </item-module-name>
          </item-title>
          <div className="content">
            <item-version-author>
              {moduleProps.version} ({moduleProps.versionCode}) / {moduleProps.author}
            </item-version-author>
            <item-description>{moduleProps.description}</item-description>
            <item-last-update>
              <Text string="last_udated" format={[formatDate(new Date(last_update))]} />
            </item-last-update>
          </div>
        </item-card-wrapper>
      </Card>
    </div>
  );
};

export default ExploreModule;
