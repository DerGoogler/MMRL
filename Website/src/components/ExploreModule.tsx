import { RefObject, createRef } from "react";
import axios from "axios";
import Properties from "@js.properties/properties";
import { Card, Col } from "react-onsenui";
import ViewModuleActivity from "@Activitys/ViewModuleActivity";
import Log from "@Native/Log";
import { VerifiedRounded } from "@mui/icons-material";
import { os } from "@Native/os";
import { isDesktop, isTablet } from "react-device-detect";
import { link } from "googlers-tools";
import ViewX from "./ViewX";
import { string } from "@Strings";
import ModuleProps from "@Types/ModuleProps";

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

class ExploreModule extends ViewX<Props, States> {
  private searchedCard: RefObject<Card>;
  private cardName: RefObject<HTMLSpanElement>;
  private log: Log;

  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      props: {},
    };
    this.searchedCard = createRef();
    this.cardName = createRef();
    this.log = new Log(this.constructor.name);
  }

  public componentDidMount = () => {
    const { propsUrl, props } = this.props;
    if (typeof props == "object") {
      this.setState({ props: props });
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
        this.setState({
          props: tmp,
        });
      });
    }
  };

  private formatDate(date: Date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // @ts-ignore
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
  }

  private openReadmeFromParam = (e: any) => {
    this.componentDidMount;
    const { getId } = this.props;
    try {
      const modul = os.getSchemeParam("module");
      if (modul == getId) {
        setTimeout(() => {
          this.log.i(`Module found! Open ${this.state.props.name}`);
          e.click();
        }, 2000);
      }
    } catch (error) {
      this.log.w("Failed to open given module");
    }
  };

  private checkDeviceSize(element: JSX.Element): JSX.Element {
    if (isTablet) {
      return <Col style={{ width: "50%", height: "50%" }}>{element}</Col>;
    } else {
      return element;
    }
  }

  public createView(): JSX.Element {
    const { notesUrl, downloadUrl, pushPage, moduleOptions, stars, last_update, getId, fullItem } = this.props;
    const { props } = this.state;
    const isVerified = moduleOptions[getId]?.verified;
    const _display = moduleOptions[getId]?.display;

    return this.checkDeviceSize(
      <div
        ref={this.openReadmeFromParam}
        onClick={() => {
          // Make an fake path. Note: The page should not refreshed!
          link.setURL((set, currentPath) => {
            set(`view_${props.id}`, `view_${props.id}`, `${currentPath}/?module=${props.id}`);
          });

          pushPage({
            key: `view_${props.id}`,
            activity: ViewModuleActivity,
            extra: {
              name: props.name,
              download: downloadUrl,
              id: getId,
              author: props.author,
              notes: notesUrl,
              stars: stars,
              moduleOptions: {
                verified: isVerified,
              },
              moduleProps: props,
            },
          });
        }}
      >
        {/*
        // @ts-ignore */}
        <Card
          id={getId}
          ref={this.searchedCard}
          key={getId}
          //@ts-ignore
          style={{ display: _display, marginTop: "4px", marginBottom: "4px" }}
        >
          <item-card-wrapper>
            <item-title className="title">
              <item-module-name ref={this.cardName}>
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
                  {props.name}

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
                {props.version} ({props.versionCode}) / {props.author}
              </item-version-author>
              <item-description>{props.description}</item-description>
              <item-last-update>
                {string.formatString(string.last_updated, {
                  date: this.formatDate(new Date(last_update)),
                })}
              </item-last-update>
            </div>
          </item-card-wrapper>
        </Card>
      </div>
    );
  }
}

export default ExploreModule;
