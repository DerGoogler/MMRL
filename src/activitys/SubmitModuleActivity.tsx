import React from "react";
import { TextField, Autocomplete, Chip, Stack, Avatar, Typography, Divider } from "@mui/material";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { useCategories } from "@Hooks/useCategories";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import { useTheme } from "@Hooks/useTheme";
import { MMRL } from "@Components/icons/MMRL";
import { MRepo } from "@Components/icons/MRepo";
import { useNativeFileStorage } from "@Hooks/useNativeFileStorage";
import { licenseTypes } from "@Util/licenseTypes";
import { CodeBlock } from "@Components/CodeBlock";
import { useModFS } from "@Hooks/useModFS";
import { path } from "@Util/path";
import { en_antifeatures } from "./../locales/antifeatures/en";

interface FormTypesTrack {
  id: string;
  enable: boolean;
  verified: boolean;
  update_to: string;
  source: string;
  antifeatures: string[];
}

interface FormTypesRepo {
  license: string;
  support: string;
  donate: string;
  cover: string;
  icon: string;
  categories: string[];
  require: string[];
  screenshots: string[];
  readme: string;
}

const INITIAL_TRACK_FORM: FormTypesTrack = {
  id: "",
  enable: true,
  verified: false,
  update_to: "",
  source: "",
  antifeatures: [],
};

const INITIAL_COM_REPO_FORM: FormTypesRepo = {
  license: "",
  support: "",
  donate: "",
  cover: "",
  icon: "",
  categories: [],
  require: [],
  screenshots: [],
  readme: "",
};

const antifeatures = en_antifeatures.map((af) => af.id);

const SupportedApp = React.memo<{ mmrl?: boolean; mrepo?: boolean }>((props) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      divider={
        <Divider sx={{ marginTop: "4px !important", marginBottom: "4px !important" }} orientation="vertical" variant="middle" flexItem />
      }
      spacing={1}
    >
      {props.mmrl && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
          <MMRL sx={{ fontSize: "unset" }} /> <span>MMRL</span>
        </Stack>
      )}
      {props.mrepo && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
          <MRepo sx={{ fontSize: "unset" }} /> <span>MRepo</span>
        </Stack>
      )}
    </Stack>
  );
});

const SubmitModuleActivity = () => {
  const { allCategories } = useCategories();
  const { context } = useActivity();
  const { strings } = useStrings();
  const { theme } = useTheme();
  const { modFS } = useModFS();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{strings("submit_module")}</Toolbar.Center>
      </Toolbar>
    );
  };
  const [trackFormData, setTrackFormData] = useNativeFileStorage(
    path.resolve(modFS("MMRLFOL"), "submit-form-track.json"),
    INITIAL_TRACK_FORM,
    {
      loader: "json",
    }
  );
  const [repoFormData, setRepoFormData] = useNativeFileStorage(
    path.resolve(modFS("MMRLFOL"), "submit-form-repo.json"),
    INITIAL_COM_REPO_FORM,
    {
      loader: "json",
    }
  );

  const handleTrackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setTrackFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRepoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setRepoFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const isInvalidLicense = React.useMemo(() => !licenseTypes.includes(repoFormData.license), [repoFormData.license]);

  return (
    <Page sx={{ p: 1 }} renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <CodeBlock
          sx={{
            mb: 1,
          }}
          lang="json"
        >
          {JSON.stringify(
            {
              "track.json": trackFormData,
              "common/repo.json": repoFormData,
            },
            null,
            2
          )}
        </CodeBlock>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Typography sx={{ width: "100%" }} variant="h5">
            track.json
          </Typography>

          <TextField placeholder="mkshrc" fullWidth label="Module ID" name="id" value={trackFormData.id} onChange={handleTrackChange} />

          <TextField
            placeholder="https://..."
            fullWidth
            label="Module Source URL"
            name="source"
            value={trackFormData.source}
            onChange={handleTrackChange}
          />

          <TextField
            fullWidth
            label="Update to"
            name="update_to"
            value={trackFormData.update_to}
            onChange={handleTrackChange}
            placeholder="Git repositores needs to end with '.git' or you pass a valid 'update.json'"
          />

          <Autocomplete
            multiple
            sx={{ width: "100%" }}
            value={trackFormData.antifeatures}
            options={antifeatures}
            onChange={(e, value) => {
              setTrackFormData((prevState) => ({ ...prevState, antifeatures: value }));
            }}
            filterSelectedOptions
            disableCloseOnSelect
            renderInput={(params) => <TextField {...params} label="Anti-Features" />}
          />

          <Typography sx={{ width: "100%" }} variant="h5">
            common/repo.json
          </Typography>

          <TextField
            error={isInvalidLicense}
            placeholder="MIT"
            fullWidth
            label={isInvalidLicense ? "License (invalid)" : "License"}
            name="license"
            value={repoFormData.license}
            onChange={handleRepoChange}
          />

          <TextField
            placeholder="https://..."
            fullWidth
            label="Support URL"
            name="support"
            value={repoFormData.support}
            onChange={handleRepoChange}
          />

          <TextField
            placeholder="https://..."
            fullWidth
            label="Donate URL"
            name="donate"
            value={repoFormData.donate}
            onChange={handleRepoChange}
          />

          <Autocomplete
            multiple
            sx={{ width: "100%" }}
            value={repoFormData.categories}
            options={allCategories}
            onChange={(e, value) => {
              setRepoFormData((prevState) => ({ ...prevState, categories: value }));
            }}
            disableCloseOnSelect
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} label="Categories" />}
          />

          <TextField
            placeholder="https://..."
            fullWidth
            label="Module Cover"
            name="cover"
            value={repoFormData.cover}
            onChange={handleRepoChange}
          />

          <TextField
            placeholder="https://..."
            fullWidth
            label="Module Icon"
            name="icon"
            value={repoFormData.icon}
            onChange={handleRepoChange}
          />

          <TextField
            placeholder="https://..."
            fullWidth
            label="Raw README.md URL"
            name="readme"
            value={repoFormData.readme}
            onChange={handleRepoChange}
          />

          <Autocomplete
            style={{ width: "100%" }}
            sx={{
              "& .MuiInputBase-root": {
                flexDirection: "column-reverse",
                WebkitAlignItems: "stretch",
                alignItems: "stretch",
                width: "100% !important",
              },
              "& .MuiInputBase-input": {
                width: "100% !important",
              },
            }}
            multiple
            value={repoFormData.screenshots}
            onChange={(e, value) => {
              setRepoFormData((prevState) => ({ ...prevState, screenshots: value }));
            }}
            options={[]}
            freeSolo
            renderTags={(value, getTagProps) => (
              <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1} useFlexGap flexWrap="wrap">
                {value.map((option, index) => (
                  <Chip variant="outlined" label={option} avatar={<Avatar alt={option} src={option} />} {...getTagProps({ index })} />
                ))}
              </Stack>
            )}
            renderInput={(params) => <TextField {...params} fullWidth label="Screenshots" placeholder="https://..." />}
          />

          <Autocomplete
            style={{ width: "100%" }}
            sx={{
              "& .MuiInputBase-root": {
                flexDirection: "column-reverse",
                WebkitAlignItems: "stretch",
                alignItems: "stretch",
                width: "100% !important",
              },
              "& .MuiInputBase-input": {
                width: "100% !important",
              },
            }}
            multiple
            value={repoFormData.require}
            onChange={(e, value) => {
              setRepoFormData((prevState) => ({ ...prevState, require: value }));
            }}
            options={[]}
            freeSolo
            renderTags={(value, getTagProps) => (
              <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1} useFlexGap flexWrap="wrap">
                {value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))}
              </Stack>
            )}
            renderInput={(params) => <TextField {...params} fullWidth label="Require Modules" placeholder="mkshrc" />}
          />
        </Stack>
      </Page.RelativeContent>
    </Page>
  );
};

export default SubmitModuleActivity;
