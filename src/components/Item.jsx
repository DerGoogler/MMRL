import * as React from "react";
import ViewModuleActivity from "../activitys/ViewModuleActivity";
import axios from "axios";
const Properties = require("@js.properties/properties");
import { ListItem } from "react-onsenui";
import TextEllipsis from "react-text-ellipsis";
import { ref } from "./../utils";
import { Chip } from "@mui/material";
import ons from "onsenui";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props: {},
    };
    this.searchedCard = React.createRef();
    this.cardName = React.createRef();
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

  checkLow() {}

  render = () => {
    const { notesUrl, downloadUrl, pushPage, moduleOptions } = this.props;
    const { props } = this.state;
    return (
      <div style={{ display: moduleOptions[props.id]?.display }}>
        <ListItem
          ref={this.searchedCard}
          tappable
          id={props.id}
          disabled
          key={props.id}
          onClick={() => {
            pushPage({
              key: `view_${props.id}`,
              page: ViewModuleActivity,
              extra: {
                name: props.name,
                download: downloadUrl,
                id: props.id,
                author: props.author,
                notes: notesUrl,
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
          <div class="center">
            <TextEllipsis lines={1} tag={"span"} tagClass={"list-item__title"} ellipsisChars={"..."} debounceTimeoutOnResize={200}>
              {(() => {
                if (moduleOptions[props.id]?.low) {
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
                if (moduleOptions[props.id]?.verified) {
                  return (
                    <>
                      {" "}
                      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
                        <path
                          fill-rule="evenodd"
                          fill="#4a148c"
                          d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                        ></path>
                      </svg>
                    </>
                  );
                }
              })()}
            </TextEllipsis>
            <TextEllipsis
              lines={1}
              tag={"span"}
              tagClass={"list-item__subtitle"}
              ellipsisChars={"..."}
              debounceTimeoutOnResize={200}
              style={{ fontSize: "12px", marginBottom: "3px", matginTop: "0px" }}
            >
              {props.version + " / " + props.author}
            </TextEllipsis>
            <TextEllipsis lines={3} tag={"span"} tagClass={"list-item__subtitle"} ellipsisChars={"..."} debounceTimeoutOnResize={200}>
              {props.description}
            </TextEllipsis>
          </div>
        </ListItem>
      </div>
    );
  };
}

export default Item;
