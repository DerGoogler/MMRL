import axios from "axios";
import Properties from "@js.properties/properties";
import { Card, Col } from "react-onsenui";
import ViewModuleActivity from "@Activitys/ViewModuleActivity";
import Log from "@Native/Log";
import { VerifiedRounded } from "@mui/icons-material";
import { os } from "@Native/os";
import { isDesktop, isTablet } from "react-device-detect";
import { link } from "googlers-tools";
import { string } from "@Strings";
import ModuleProps from "@Types/ModuleProps";
import React from "react";

interface Props {
  notesUrl?: string;
  downloadUrl?: string;
  pushPage?: any;
  moduleOptions: ModuleOptions[];
  stars?: int;
  last_update?: any;
  fullItem: any;
  getId: any;
  propsUrl: string;
  props: ModuleProps.PropUrl;
}

interface ModuleOptions {
  verified: boolean;
  low: boolean;
  display: string;
}

interface States {
  props: Partial<ModuleProps.PropUrl>;
}

const ExploreModule = (props_: Props) => {
  const { notesUrl, downloadUrl, pushPage, moduleOptions, stars, last_update, getId, fullItem, propsUrl, props } = props_;
  const isVerified = moduleOptions[getId]?.verified;
  const _display = moduleOptions[getId]?.display;

  const [moduleProps, setModuleProps] = React.useState<any>({});

  const searchedCard = React.useRef(null);
  const cardName = React.useRef(null);
  const log = new Log("ExploreModule");

  React.useEffect(() => {
    if (typeof props == "object") {
      setModuleProps(props);
    } else {
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
        setModuleProps(tmp);
      });
    }
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

  // const openReadmeFromParam = (e: any) => {
  //   try {
  //     const modul = os.getSchemeParam("module");
  //     if (modul == getId) {
  //       setTimeout(() => {
  //         log.i(`Module found! Open ${moduleProps.name}`);
  //         e.click();
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     log.w("Failed to open given module");
  //   }
  // };

  const checkDeviceSize = (element: JSX.Element): JSX.Element => {
    if (isTablet) {
      return <Col style={{ width: "50%", height: "50%" }}>{element}</Col>;
    } else {
      return element;
    }
  };

  return checkDeviceSize(
    <div
      // ref={openReadmeFromParam}
      onClick={() => {
        // Make an fake path. Note: The page should not refreshed!
        // link.setURL((set, currentPath) => {
        //   set(`view_${moduleProps.id}`, `view_${moduleProps.id}`, `${currentPath}/?module=${moduleProps.id}`);
        // });

        pushPage({
          key: `view_${moduleProps.id}`,
          activity: ViewModuleActivity,
          extra: {
            name: moduleProps.name,
            download: downloadUrl,
            id: getId,
            author: moduleProps.author,
            notes: notesUrl,
            stars: stars,
            moduleOptions: {
              verified: isVerified,
            },
            moduleProps: moduleProps,
          },
        });
      }}
    >
      {/*
      // @ts-ignore */}
      <Card
        id={getId}
        ref={searchedCard}
        //@ts-ignore
        style={{ display: _display, marginTop: "4px", marginBottom: "4px" }}
      >
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
              {string.formatString(string.last_updated, {
                date: formatDate(new Date(last_update)),
              })}
            </item-last-update>
          </div>
        </item-card-wrapper>
      </Card>
    </div>
  );
};

export default ExploreModule;
