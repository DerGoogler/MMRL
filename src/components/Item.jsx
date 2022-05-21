import * as React from "react";
import ViewModuleActivity from "../activitys/ViewModuleActivity";
import axios from "axios";
const Properties = require("@js.properties/properties");
import { ListItem } from "react-onsenui";
import TextEllipsis from "react-text-ellipsis";
import { ref } from "./../utils";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props: {},
    };
    this.searchedCard = React.createRef();
    this.cardName = React.createRef();
  }

  componentDidMount() {
    const { propsUrl } = this.props;
    axios.get(propsUrl).then((response) => {
      this.setState({
        props: Properties.parseToProperties(response.data),
      });
    });
  }

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

  render() {
    const { notesUrl, downloadUrl, pushPage } = this.props;
    const { props } = this.state;
    return (
      <>
        <ListItem
          ref={this.searchedCard}
          tappable
          id={props.id}
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
              <span ref={this.cardName}>{props.name}</span>
            </TextEllipsis>
            <TextEllipsis lines={3} tag={"span"} tagClass={"list-item__subtitle"} ellipsisChars={"..."} debounceTimeoutOnResize={200}>
              {props.description}
            </TextEllipsis>
          </div>
        </ListItem>
      </>
    );
  }
}

export default Item;
