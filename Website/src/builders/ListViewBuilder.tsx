import * as React from "react";
import { ListItem, ListTitle, Select, Switch } from "react-onsenui";
import ons from "onsenui";
import tools from "@Utils/tools";
import MDIcon from "@Components/MDIcon";
import Gesture from "@Components/Gesture";
import PreferencesManager from "@Native/PreferencesManager";
import { PushProps } from "@Activitys/MainActivity";

interface Props {
  data: ListInterface[];
  pushPage: any;
}

interface ListOptions {
  key?: string;
  disabled?: boolean | any;
  id?: string;
  style?: React.CSSProperties;
  /**
   * @deprecated This element slow down the rendering
   */
  expandableContent?: JSX.Element | HTMLElement | string | undefined;
  /**
   * @deprecated This element slow down the rendering
   */
  expandable?: boolean;
  tappable?: boolean;
  unTyped?: any;
  modifier?: string;
  /**
   * Makes an dialog
   */
  helper?: Helper;
  type: "switch" | "select" | "";
  text: string | JSX.Element;

  /**
   * Performs an onClick event to the current list item
   * @param key Get the key from the current list item
   */
  onClick?(key: string | undefined, pushPage: (props: PushProps) => void): void;
  selectValue?: SelectValue[];
  icon?: string | JSX.Element;
  selectDefaultValue?: string;
  switchDefaultValue?: boolean;
  /**
   *
   * @param {Event} e Event
   * @param {String} key Returns the key
   * @param {Void} keepDefaultFuntion This will keep the default function
   */
  callback?(e?: any, key?: string | undefined, keepDefaultFuntion?: void): void;
}

interface Helper {
  /**
   * Hold the current list item text to open the dialog
   */
  text: string;
  /**
   * @default true
   */
  cancelable?: boolean;
}

interface SelectValue {
  text: string;
  value: string;
  disabled?: boolean;
}

interface ListInterface {
  title: string;
  id?: string;
  unTyped?: any;
  style?: React.CSSProperties;
  className?: string;
  content: ListOptions[];
}

class ListViewBuilder extends React.Component<Props> {
  private prefManager: PreferencesManager;

  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.prefManager = new PreferencesManager();
  }

  /**
   * Check if an key is there
   * @param key
   * @returns {Boolean}
   */
  private getSettingSwitch(key: string): boolean {
    var get = this.getPref(key);
    if (get === undefined || get === null || get === "" || get === "false") {
      return false;
    } else {
      return true;
    }
  }

  private getSettingSelect(key: string): string | String {
    var get = this.getPref(key);
    if (get === undefined || get === null || get === "") {
      return "en";
    } else {
      return get;
    }
  }

  private getPref(key: string): string | null | undefined {
    return this.prefManager.getPref(key);
  }

  private setPref(key: string, content: string): void {
    this.prefManager.setPref(key, content);
  }

  private setSetting(key: string, data: any): void {
    this.setPref(key, data);
  }

  private default(_: any, __: any, ___: any) {
    if (_ === undefined || _ === null) {
      return __;
    } else if (_ === undefined || _ === null) {
      return ___;
    }
  }

  public render() {
    const { data, pushPage } = this.props;

    const list = data.map((header: ListInterface) => (
      <>
        <section id={header.id} className={header.className} style={header.style}>
          {/**
            // @ts-ignore */}
          <ListTitle>{header.title}</ListTitle>
          {header.content.map((item: ListOptions) => (
            <>
              <ListItem
                modifier={tools.typeCheck(item.modifier, "")}
                tappable={tools.typeCheck(item.tappable, false)}
                id={item.key + "-ListItem"}
                style={item.style}
                onClick={() => {
                  if (typeof item.onClick == "function") {
                    const key = item.key;
                    item.onClick(key, pushPage);
                  }
                }}
              >
                {(() => {
                  if (item.icon === (null || "" || undefined)) {
                    return;
                  } else {
                    if (React.isValidElement(item.icon)) {
                      return <div className="left">{item.icon}</div>;
                    } else {
                      return (
                        <div className="left">
                          <MDIcon icon={item.icon} size="24" isInList={true}></MDIcon>
                        </div>
                      );
                    }
                  }
                })()}
                <Gesture
                  event="hold"
                  callback={() => {
                    ons.notification.alert({
                      message: item.helper?.text,
                      title: "Info",
                      buttonLabels: ["Ok"],
                      animation: "default",
                      primaryButtonIndex: 1,
                      cancelable: tools.typeCheck(item.helper?.cancelable, true),
                    });
                  }}
                >
                  <div className="center">{item.text}</div>
                </Gesture>
                <div className="right">
                  {(() => {
                    switch (item.type) {
                      case "switch":
                        return (
                          <Switch
                            checked={this.default(item.switchDefaultValue, this.getSettingSwitch(item.key!), false)}
                            disabled={Boolean(item.disabled)}
                            onChange={(e: any) => {
                              /**
                               * This will keep the default funtion
                               */
                              const keepDefaultFuntion = (): void => this.setSetting(item.key!, e.target.checked);
                              if (typeof item.callback == "function") {
                                const key = item.key;
                                item.callback(e, key, keepDefaultFuntion());
                              } else {
                                keepDefaultFuntion();
                              }
                            }}
                          ></Switch>
                        );
                      case "select":
                        return (
                          <Select
                            id="choose-sel"
                            disabled={Boolean(item.disabled)}
                            value={tools.typeCheck(this.getSettingSelect(item.key!), tools.typeCheck(item.selectDefaultValue, ""))}
                            onChange={(e: any) => {
                              /**
                               * This will keep the default funtion
                               */
                              const keepDefaultFuntion = () => this.setSetting(item.key!, e.target.value);
                              if (typeof item.callback == "function") {
                                const key = item.key;
                                item.callback(e, key, keepDefaultFuntion());
                              } else {
                                keepDefaultFuntion();
                              }
                            }}
                          >
                            <option value="" selected disabled hidden>
                              Choose
                            </option>
                            {item.selectValue?.map((select: SelectValue) => (
                              <>
                                <option value={select.value} disabled={select.disabled}>
                                  {select.text}
                                </option>
                              </>
                            ))}
                          </Select>
                        );
                      default:
                        return;
                    }
                  })()}
                </div>
              </ListItem>
            </>
          ))}
        </section>
      </>
    ));

    return list;
  }
}

export { ListViewBuilder, ListOptions, ListInterface, SelectValue };
