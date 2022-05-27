import * as React from "react";
import ons from "onsenui";
import axios from "axios";
import Properties from "@js.properties/properties";
import { Card } from "react-onsenui";
import { Chip } from "@mui/material";
import tools from "@Utils/tools";
import ViewModuleActivity from "@Activitys/ViewModuleActivity";
import VerifiedIcon from "@Components/icons/VerfifiedIcon";
import Constants from "@Native/Constants";
import Log from "@Builders/Log";

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

class ExploreModule extends React.Component<Props, States> {
  private searchedCard: React.RefObject<Card>;
  private cardName: React.RefObject<HTMLSpanElement>;
  private log: Log;

  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      props: {},
    };
    this.searchedCard = React.createRef();
    this.cardName = React.createRef();
    this.log = new Log(this.constructor.name);
  }

  public componentDidMount = () => {
    const { propsUrl } = this.props;
    axios.get(propsUrl).then((response) => {
      this.setState({
        props: Properties.parseToProperties(response.data),
      });
    });
  };

  public componentDidUpdate() {
    const { searchState } = this.props;
    tools.ref(this.cardName, (ref) => {
      if (searchState != "") {
        const search = ref.textContent || ref.innerText;
        if (search.toLowerCase().indexOf(searchState) > -1) {
          tools.ref(this.searchedCard, (ref) => {
            ref.style.display = "";
          });
        } else {
          tools.ref(this.searchedCard, (ref) => {
            ref.style.display = "none";
          });
        }
      } else {
        tools.ref(this.searchedCard, (ref) => {
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
      const modul = tools.getUrlParam("module");
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

  public render = () => {
    const { notesUrl, downloadUrl, pushPage, moduleOptions, stars, last_update, getId } = this.props;
    const { props } = this.state;
    const isLQModule = moduleOptions[getId]?.low;
    const isVerified = moduleOptions[getId]?.verified;
    const _display = moduleOptions[getId]?.display;
    const getMagiskVersion = Constants.isAndroid ? android.getMagiskVersionCode() : 0;

    return (
      <>
        <div
          ref={this.openReadmeFromParam}
          onClick={() => {
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
                  low: isLQModule,
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
                {(() => {
                  if (isLQModule) {
                    if (tools.getSettingsSwitch("disable_lq_modules")) {
                      return null;
                    } else {
                      return (
                        <>
                          <Chip
                            onClick={() => {
                              ons.notification.alert("This module has a bad module.prop");
                            }}
                            variant="outlined"
                            color="warning"
                            size="small"
                            label="Low-quality module"
                          />{" "}
                        </>
                      );
                    }
                  } else {
                    return null;
                  }
                })()}
                <item-module-name ref={this.cardName}>{props.name}</item-module-name>
                {(() => {
                  if (isVerified) {
                    return (
                      <>
                        {" "}
                        <VerifiedIcon color="#4a148c" />
                      </>
                    );
                  } else {
                    return null;
                  }
                })()}
              </item-title>
              <div className="content">
                <item-version-author
                  style={{
                    marginTop: isLQModule && !tools.getSettingsSwitch("disable_lq_modules") ? "4px" : "",
                  }}
                >
                  {props.version} / {props.author}
                </item-version-author>
                <item-description>{props.description}</item-description>
                <item-last-update>Last update: {this.formatDate(new Date(last_update))}</item-last-update>
              </div>
            </item-card-wrapper>
          </Card>
        </div>
      </>
    );
  };
}

export default ExploreModule;
