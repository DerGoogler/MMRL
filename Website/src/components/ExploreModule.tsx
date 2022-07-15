import { RefObject, createRef } from "react";
import axios from "axios";
import Properties from "@js.properties/properties";
import { Card, Col } from "react-onsenui";
import ViewModuleActivity from "@Activitys/ViewModuleActivity";
import Log from "@Native/Log";
import { VerifiedRounded } from "@mui/icons-material";
import { os } from "@Native/os";
import { isTablet } from "react-device-detect";
import { dom, link } from "googlers-tools";
import { ViewX, ViewXRenderData } from "react-onsenuix";

interface Props {
  notesUrl?: string;
  downloadUrl?: string;
  pushPage?: any;
  moduleOptions: ModuleOptions[];
  stars?: int;
  last_update?: any;
  getId: any;
  searchState?: string;
  propsUrl: string;
}

interface ModuleOptions {
  verified: boolean;
  low: boolean;
  display: string;
}

interface States {
  props: {
    id?: string;
    name?: string;
    version?: string;
    versionCode?: int;
    author?: string;
    description?: string;
    minApi?: int;
    maxApi?: int;
    minMagisk?: int;
    needRamdisk?: boolean;
    support?: string;
    donate?: string;
    config?: string;
    changeBoot?: boolean;
  };
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
    const { propsUrl } = this.props;
    const { props } = this.state;
    axios.get(propsUrl).then((response) => {
      this.setState({
        props: Properties.parseToProperties(response.data),
      });
    });
  };

  public componentDidUpdate() {
    const { searchState } = this.props;
    dom.findBy(this.cardName, (ref) => {
      if (searchState != "") {
        const search = ref.textContent || ref.innerText;
        if (search.toLowerCase().indexOf(searchState) > -1) {
          dom.findBy(this.searchedCard, (ref: HTMLElement) => {
            ref.style.display = "";
          });
        } else {
          dom.findBy(this.searchedCard, (ref: HTMLElement) => {
            ref.style.display = "none";
          });
        }
      } else {
        dom.findBy(this.searchedCard, (ref: HTMLElement) => {
          ref.style.display = "";
        });
      }
    });
  }

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

  public createView(data: ViewXRenderData<Props, States, HTMLElement>): JSX.Element {
    const { notesUrl, downloadUrl, pushPage, moduleOptions, stars, last_update, getId } = data.p;
    const { props } = data.s;
    const isVerified = moduleOptions[getId]?.verified;
    const _display = moduleOptions[getId]?.display;

    return this.checkDeviceSize(
      <>
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
                moduleProps: {
                  minMagisk: props.minMagisk,
                  minApi: props.minApi,
                  maxApi: props.maxApi,
                  needRamdisk: props?.needRamdisk,
                  changeBoot: props.changeBoot,
                },
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
                <item-last-update>Last update: {this.formatDate(new Date(last_update))}</item-last-update>
              </div>
            </item-card-wrapper>
          </Card>
        </div>
      </>
    );
  }
}

export default ExploreModule;
