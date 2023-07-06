import { ProgressCircular } from "react-onsenui";
import { ExploreModule } from "@Components/ExploreModule";
import { Searchbar } from "@Components/Searchbar";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { useRepos } from "@Hooks/useRepos";
import { Box, Pagination, Stack } from "@mui/material";
import { StyledSection } from "@Components/StyledSection";
import { useStrings } from "@Hooks/useStrings";
import { usePagination } from "@Hooks/usePagination";
import { For } from "@Components/For";

const ExploreModuleFragment = () => {
  const { context } = useActivity();
  const { strings } = useStrings();

  const [search, setSearch] = React.useState("");

  const { modulesIndex, moduleOptions } = useRepos();

  const filteredModules = React.useMemo(
    () =>
      modulesIndex.filter(
        (module) =>
          module.prop_url.id.toLowerCase().includes(search.toLowerCase()) ||
          module.prop_url.name.toLowerCase().includes(search.toLowerCase()) ||
          module.prop_url.author.toLowerCase().includes(search.toLowerCase()) ||
          module.prop_url.description.toLowerCase().includes(search.toLowerCase())
      ),
    [modulesIndex, search]
  );
  const [page, setPage] = React.useState(1);

  const PER_PAGE = 20;
  const count = React.useMemo(() => Math.ceil(filteredModules.length / PER_PAGE), [filteredModules, search]);
  const _DATA = usePagination(filteredModules, PER_PAGE);

  return (
    <StyledSection>
      {/* <>
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
            <div>
              {featuredModules.map((item, index) => (
                <FeaturedModulesHeader key={item.id + index} item={item} index={index} setIndex={setIndex} moduleOptions={moduleOptions} />
              ))}
            </div>
          </Carousel>

          <Divider>
            <h2>Explore</h2>
          </Divider>
        </> */}

      <Searchbar placeholder={strings.search_modules} onChange={(e) => setSearch(e.target.value)} />

      <Stack style={{ marginBottom: 8 }} direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Pagination
          count={count}
          color="primary"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={(e, p) => {
            setPage(p);
            _DATA.jump(p);
          }}
        />
      </Stack>

      <For
        each={_DATA.currentData()}
        fallback={() => (
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
        )}
        catch={(e: Error | undefined) => <Box sx={(theme) => ({ color: theme.palette.text.primary })}>ERROR: {e?.message}</Box>}
      >
        {(item, index) => (
          <ExploreModule
            index={index}
            key={item.id + index}
            fullItem={item}
            getId={item.id}
            propsUrl={item.prop_url}
            notesUrl={item.notes_url}
            downloadUrl={item.zip_url}
            moduleOptions={moduleOptions}
            last_update={item.last_update}
          />
        )}
      </For>
    </StyledSection>
  );
};

export default ExploreModuleFragment;
