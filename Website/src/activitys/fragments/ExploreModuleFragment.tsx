import { Carousel, ProgressCircular, Row } from "react-onsenui";
import ExploreModule from "@Components/ExploreModule";
import { isTablet } from "react-device-detect";
import { Searchbar } from "@Components/Searchbar";
import React from "react";
import { ModuleProps, useActivity } from "@Hooks/useActivity";
import { useRepos } from "@Hooks/useRepos";
import FeaturedModulesHeader from "@Components/FeaturedModulesHeader";
import { Divider } from "@mui/material";
import { useText } from "@Hooks/useLanguage";

const ExploreModuleFragment = () => {
  const { context } = useActivity();

  const string = useText();

  const [searchValue, setSearchValue] = React.useState("");
  const [finalSearchValue, setFinalSearchValue] = React.useState("");

  const { modulesIndex, moduleOptions, featuredModules } = useRepos();
  // Slider
  const [index, setIndex] = React.useState(0);

  const filter = (e: any) => {
    setSearchValue(e.target.value);
  };

  const triggerSearch = () => {
    setFinalSearchValue(searchValue);
  };

  const handleChange = (e: any) => {
    setIndex(e.activeIndex);
  };

  const cardRender = (map: Array<ModuleProps.RootObject>) => {
    const filteredModules = map.filter((item) => item.id.toLowerCase().includes(finalSearchValue.toLowerCase()));

    return filteredModules
      .sort((a, b) => (a.id > b.id ? 1 : -1))
      .map((item, index) => {
        return (
          <ExploreModule
            key={item.id + index}
            fullItem={item}
            getId={item.id}
            propsUrl={item.prop_url}
            props={item.props}
            notesUrl={item.notes_url}
            downloadUrl={item.zip_url}
            moduleOptions={moduleOptions}
            last_update={item.last_update}
          />
        );
      });
  };

  const resultsRender: Array<any> = [];

  for (var i = 0; i < modulesIndex.length; i += 2) {
    resultsRender.push(<Row>{cardRender(modulesIndex.slice(i, i + 2))}</Row>);
  }

  return (
    <>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          padding: "0px",
          paddingBottom: "0px",
          flexDirection: "column",
        }}
      >
        {featuredModules && (
          <>
            <Divider>
              <h2>Featured</h2>
            </Divider>

            <Carousel
              // @ts-ignore
              onPostChange={handleChange}
              activeIndex={index}
              swipeable
              autoScroll
              overscrollable
              autoScrollRatio={0.2}
              // onOverscroll={() => {
              //   Toast.makeText("Sorry boi, there is the end", Toast.LENGTH_SHORT).show();
              // }}
            >
              {featuredModules.map((item, index) => (
                <FeaturedModulesHeader key={item.id + index} item={item} index={index} setIndex={setIndex} moduleOptions={moduleOptions} />
              ))}
            </Carousel>

            <Divider>
              <h2>Explore</h2>
            </Divider>
          </>
        )}

        <Searchbar placeholder={string("search_modules")} onButtonClick={triggerSearch} onInputChange={filter} />
        <module-container
          style={{
            paddingBottom: "4px",
          }}
        >
          {modulesIndex.length === 0 ? (
            <ProgressCircular
              indeterminate
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                WebkitTransform: "translate(-50%, -50%)",
                transform: "translate(-50%, -50%)",
              }}
            />
          ) : isTablet ? (
            resultsRender
          ) : (
            cardRender(modulesIndex)
          )}
        </module-container>
      </div>
    </>
  );
};

export default ExploreModuleFragment;
