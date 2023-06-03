import { Card, CarouselItem } from "react-onsenui";
import React from "react";
import { useDarkmode } from "@Hooks/useDarkmode";
import { ModuleProps, useActivity } from "@Hooks/useActivity";
import axios from "axios";
import Properties from "@js.properties/properties";
import { VerifiedRounded } from "@mui/icons-material";
import ViewModuleActivity from "@Activitys/ViewModuleActivity";

interface Props {
  item: ModuleProps.RootObject;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  moduleOptions: Array<ModuleProps.Options>;
}

const FeaturedModulesHeader = ({ item, index, setIndex, moduleOptions }: Props) => {
  const { context } = useActivity();
  const [moduleProps, setModuleProps] = React.useState<Partial<ModuleProps.Props>>({});

  const isVerified = moduleOptions[item.id as any]?.verified;
  const _display = moduleOptions[item.id as any]?.display;
  const isDarkmode = useDarkmode();

  React.useEffect(() => {
    axios.get(item.prop_url).then((resp) => {
      setModuleProps(Properties.parseToProperties(resp.data));
    });
  }, [index]);

  return (
    <>
      {/* @ts-ignore */}
      <CarouselItem key={index}>
        <Card
          //@ts-ignore
          style={{ display: _display, marginTop: "4px", marginBottom: "4px", height: 122, padding: 0 }}
          onClick={() => {
            context.pushPage<ModuleProps.Extra>({
              activity: ViewModuleActivity,
              props: {
                key: `view_${moduleProps.id}_featured`,
                extra: {
                  name: moduleProps.name,
                  downloadUrl: item.zip_url,
                  id: item.id,
                  author: moduleProps.author,
                  notes: item.notes_url,
                  // stars: stars,
                  module_options: {
                    verified: isVerified,
                  },
                  module_props: moduleProps as any,
                },
              },
            });
          }}
        >
          <item-card-wrapper>
            <item-title className="title">
              <item-module-name>
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
              <item-description
                style={{
                  width: 300,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                }}
              >
                {moduleProps.description}
              </item-description>
            </div>
          </item-card-wrapper>
        </Card>
      </CarouselItem>
    </>
  );
};

export default FeaturedModulesHeader;
