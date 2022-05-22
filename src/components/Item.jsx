import * as React from "react";
import ViewModuleActivity from "../activitys/ViewModuleActivity";
import axios from "axios";
const Properties = require("@js.properties/properties");
import { ListItem, Card } from "react-onsenui";
import TextEllipsis from "react-text-ellipsis";
import { ref, getUrlParam } from "./../utils";
import { Chip } from "@mui/material";
import ons from "onsenui";
import VerifiedIcon from "./icons/VerfifiedIcon";
import Logger from "../utils/Logger";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props: {},
    };
    this.searchedCard = React.createRef();
    this.cardName = React.createRef();
    this.log = new Logger(this.constructor.name);
  }

  componentDidMount = () => {
    const { propsUrl } = this.props;
    axios.get(propsUrl).then((response) => {
      this.setState({
        props: Properties.parseToProperties(response.data),
      });
    });
  };

  componentDidUpdate() {
    const { searchState } = this.props;
    ref(this.cardName, (reff) => {
      if (searchState != "") {
        const search = reff.textContent || reff.innerText;
        if (search.toLowerCase().indexOf(searchState) > -1) {
          ref(this.searchedCard, (reff) => {
            reff.style.display = "";
          });
        } else {
          ref(this.searchedCard, (reff) => {
            reff.style.display = "none";
          });
        }
      } else {
        ref(this.searchedCard, (reff) => {
          reff.style.display = "";
        });
      }
    });
  }

  formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
  }

  openReadmeFromParam = (e) => {
    this.componentDidMount;
    const { getId } = this.props;
    try {
      const modul = getUrlParam("module");
      if (modul == getId) {
        setTimeout(() => {
          this.log.info(`Module found! Open ${this.state.props.name}`);
          e.click();
        }, 2000);
      }
    } catch (error) {
      this.log.warn("Failed to open given module");
    }
  };

  render = () => {
    const { notesUrl, downloadUrl, pushPage, moduleOptions, stars, last_update, getId } = this.props;
    const { props } = this.state;
    return (
      <div
        ref={this.openReadmeFromParam}
        onClick={() => {
          pushPage({
            key: `view_${props.id}`,
            page: ViewModuleActivity,
            extra: {
              name: props.name,
              download: downloadUrl,
              id: getId,
              author: props.author,
              notes: notesUrl,
              stars: stars,
              moduleOptions: {
                verified: moduleOptions[getId]?.verified,
                low: moduleOptions[getId]?.low,
              },
              moduleProps: {
                minMagisk: props.minMagisk,
                minApi: props.minApi,
                maxApi: props.maxApi,
                needsRamdisk: props.needsRamdisk,
                changeBoot: props.changeBoot,
              },
            },
          });
        }}
      >
        <Card id={getId} key={getId} style={{ display: moduleOptions[getId]?.display, marginTop: "4px", marginBottom: "4px" }}>
          <div className="item-card-wrapper" ref={this.searchedCard}>
            <div className="title item-title">
              {(() => {
                if (moduleOptions[getId]?.low) {
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
              })()}
              <span ref={this.cardName}>{props.name}</span>
              {(() => {
                if (moduleOptions[getId]?.verified) {
                  return (
                    <>
                      {" "}
                      <VerifiedIcon color="#4a148c" />
                    </>
                  );
                }
              })()}
            </div>
            <div class="content">
              <span className="item-version-author">{props.version + " / " + props.author}</span>
              <span className="item-description">{props.description}</span>
              <span className="item-last-update">Last update: {this.formatDate(new Date(last_update))}</span>
            </div>
          </div>
        </Card>
      </div>
    );
  };
}

export default Item;
