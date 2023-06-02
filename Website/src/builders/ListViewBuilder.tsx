import { Component, isValidElement } from "react";
import { ListItem, ListTitle, Select, Switch } from "react-onsenui";
import ons from "onsenui";
import Gesture from "@Components/Gesture";
import { PushProps } from "@Activitys/MainActivity";
import { util } from "googlers-tools";
import React from "react";
import { useNativeStorage } from "@Hooks/useNativeStorage";

interface IProps {
  data: IListInterface[];
  pushPage: any;
}

export interface IListOptions {
  key?: string;
  disabled?: boolean;
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
  helper?: IListHelper;
  type: "switch" | "select" | "";
  text: string | JSX.Element;
  subtext?: string | JSX.Element;

  /**
   * Performs an onClick event to the current list item
   * @param key Get the key from the current list item
   */
  onClick?(key: string | undefined, pushPage: (props: PushProps) => void): void;
  selectValue?: IListSelectValue[];
  icon?: string | JSX.Element;
  selectDefaultValue?: string;
  selectDefaultText?: string;
  switchDefaultValue?: boolean;
  /**
   *
   * @param {Event} e Event
   * @param {String} key Returns the key
   * @param {Void} keepDefaultFuntion This will keep the default function
   */
  callback?(e?: any, key?: string | undefined, keepDefaultFuntion?: void): void;
}

export interface IListHelper {
  /**
   * Hold the current list item text to open the dialog
   */
  text: string;
  /**
   * @default true
   */
  cancelable?: boolean;
}

export interface IListSelectValue {
  text: string;
  value: string;
  disabled?: boolean;
}

export interface IListInterface {
  title: string;
  id?: string;
  unTyped?: any;
  style?: React.CSSProperties;
  className?: string;
  content: IListOptions[];
}

const PushContext = React.createContext(() => {});

const Header = ({ header }: any) => {
  return (
    <>
      <section id={header.id} className={header.className} style={header.style}>
        <ListTitle>{header.title}</ListTitle>
        <List header={header} />
      </section>
    </>
  );
};

const List = ({ header }: any) => {
  const pushPage = React.useContext(PushContext);

  return header.content.map((item: IListOptions) => (
    <>
      <ListItem
        modifier={util.typeCheck(item.modifier, "")}
        // @ts-ignore
        tappable={util.typeCheck(item.tappable, false)}
        id={item.key + "-ListItem"}
        style={item.style}
        onClick={() => {
          if (typeof item.onClick == "function") {
            const key = item.key;
            item.onClick(key, pushPage);
          }
        }}
      >
        {item.icon === (null || "" || undefined) ? null : isValidElement(item.icon) ? <div className="left">{item.icon}</div> : null}
        <Gesture
          event="hold"
          callback={() => {
            if (item.helper?.text) {
              ons.notification.alert({
                message: item.helper?.text,
                title: "Info",
                buttonLabels: ["Ok"],
                animation: "default",
                primaryButtonIndex: 1,
                cancelable: util.typeCheck(item.helper?.cancelable, true),
              });
            }
          }}
        >
          <div className="center">
            {item.subtext === (null || "" || undefined) ? (
              item.text
            ) : (
              <>
                <span className="list-item__title">{item.text}</span>
                <span className="list-item__subtitle" style={{ display: "block" }}>
                  {item.subtext}
                </span>
              </>
            )}
          </div>
        </Gesture>
        <div className="right">
          {(() => {
            const [switchState, setSwitchState] = useNativeStorage(`${item.key!}_switch`, false);
            const [selectState, setSelectState] = useNativeStorage(`${item.key}_select`, item.selectDefaultValue);
            switch (item.type) {
              case "switch":
                return (
                  <Switch
                    //@ts-ignore
                    checked={switchState}
                    disabled={item.disabled}
                    onChange={(e: any) => {
                      /**
                       * This will keep the default funtion
                       */
                      const keepDefaultFuntion = (): void => setSwitchState(e.target.checked);
                      if (typeof item.callback == "function") {
                        const key = item.key;
                        item.callback(e, key, keepDefaultFuntion());
                      } else {
                        keepDefaultFuntion();
                      }
                    }}
                    modifier="material3"
                  ></Switch>
                );
              case "select":
                return (
                  <Select
                    disabled={item.disabled}
                    // @ts-ignore --> Argument of type 'string | undefined' is not assignable to parameter of type 'string'. Type 'undefined' is not assignable to type 'string'.ts(2345)
                    value={selectState}
                    onChange={(e: any) => {
                      const keepDefaultFuntion = () => setSelectState(e.target.value);
                      if (typeof item.callback == "function") {
                        const key = item.key;
                        item.callback(e, key, keepDefaultFuntion());
                      } else {
                        keepDefaultFuntion();
                      }
                    }}
                  >
                    <option defaultValue={item.selectDefaultValue} selected disabled hidden>
                      {item.selectDefaultText ? item.selectDefaultText : "Choose"}
                    </option>
                    {item.selectValue?.map((select: IListSelectValue) => (
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
  ));
};

const ListViewBuilder = ({ data, pushPage }: IProps) => {
  return (
    <PushContext.Provider value={pushPage}>
      {data.map((header: IListInterface) => (
        <Header header={header} pushPage={pushPage} />
      ))}
    </PushContext.Provider>
  );
};

export default ListViewBuilder;
