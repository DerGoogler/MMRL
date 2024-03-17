import React from "react";
import {
  TextField,
  Autocomplete,
  Card,
  Chip,
  Stack,
  Avatar,
  Typography,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { useCategories } from "@Hooks/useCategories";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import FlatList, { FlatListProps } from "flatlist-react";
import { useTheme } from "@Hooks/useTheme";
import { MMRL } from "@Components/icons/MMRL";
import { MRepo } from "@Components/icons/MRepo";
import { useNativeFileStorage } from "@Hooks/useNativeFileStorage";
import Code from "@Components/dapi/Code";
import Pre from "@Components/dapi/Pre";
import hljs from "highlight.js";
import { StyledMarkdown } from "@Components/Markdown/StyledMarkdown";
import { licenseTypes } from "@Util/licenseTypes";
import { CodeBlock } from "@Components/CodeBlock";

interface FormTypes {
  id: string;
  enable: boolean;
  verified: boolean;
  license: string;
  update_to: string;
  source: string;
  support: string;
  donate: string;
  cover: string;
  icon: string;
  categories: string[];
  require: string[];
  screenshots: string[];
  antifeatures: string[];
  readme: string;
}

const INITIAL_FORM: FormTypes = {
  id: "",
  enable: true,
  verified: false,
  license: "",
  update_to: "",
  source: "",
  support: "",
  donate: "",
  cover: "",
  icon: "",
  categories: [],
  require: [],
  screenshots: [],
  antifeatures: [],
  readme: "",
};

const antifeatures = [
  "Ads",
  "Tracking",
  "Non-Free Network Services",
  "Non-Free Addons",
  "Non-Free Dependencies",
  "NSFW",
  "Upstream Non-Free",
  "NonßFree Assets",
  "Known Vulnerability",
  "Disabled Algorithm",
  "No Source Since",
];

const SubmitModuleActivity = () => {
  const { allCategories } = useCategories();
  const { context } = useActivity();
  const { strings } = useStrings();
  const { theme } = useTheme();

  const ref = React.useRef<HTMLDivElement | null>(null);

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
  const [formData, setFormData] = useNativeFileStorage("/data/adb/mmrl/submit-form.json", INITIAL_FORM, { loader: "json" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLicenseError = React.useMemo(() => !licenseTypes.includes(formData.license), [formData.license]);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.querySelectorAll<HTMLElement>("pre code").forEach((block) => {
        block.removeAttribute("data-highlighted");
        hljs.highlightBlock(block);
      });
    }
  }, [formData]);

  return (
    <Page sx={{ p: 1 }} renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <CodeBlock
          sx={{
            "& pre": {
              borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px `,
            },
          }}
          lang="json"
        >
          {JSON.stringify(formData, null, 4)}
        </CodeBlock>
        <Card sx={{ mb: 2, borderRadius: `0px 0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px` }}>
          <CardContent sx={{ pt: 0 }} component={Stack} direction="column" alignItems="flex-start" spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MMRL /> <Typography variant="body1">Available in MMRL</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MRepo /> <Typography variant="body1">Available in MRepo</Typography>
            </Stack>
          </CardContent>
        </Card>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2.2}>
          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <TextField placeholder="mkshrc" fullWidth label="Module ID" name="id" value={formData.id} onChange={handleChange} />
            <MMRL /> <MRepo />
          </Stack>

          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <TextField
              placeholder="https://..."
              fullWidth
              label="Module Source URL"
              name="source"
              value={formData.source}
              onChange={handleChange}
            />
            <MMRL /> <MRepo />
          </Stack>

          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <TextField
              fullWidth
              label="Update to"
              name="update_to"
              value={formData.update_to}
              onChange={handleChange}
              placeholder="Git repositores needs to end with '.git' or you pass a valid 'update.json'"
            />
            <MMRL /> <MRepo />
          </Stack>

          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <TextField
              error={handleLicenseError}
              helperText={handleLicenseError && "Invalid license!"}
              placeholder="MIT"
              fullWidth
              label="License"
              name="license"
              value={formData.license}
              onChange={handleChange}
            />
            <MMRL /> <MRepo />
          </Stack>

          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <TextField
              placeholder="https://..."
              fullWidth
              label="Support URL"
              name="support"
              value={formData.support}
              onChange={handleChange}
            />
            <MMRL /> <MRepo />
          </Stack>

          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <TextField
              placeholder="https://..."
              fullWidth
              label="Donate URL"
              name="donate"
              value={formData.donate}
              onChange={handleChange}
            />
            <MRepo />
          </Stack>

          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <Autocomplete
              multiple
              sx={{ width: "100%" }}
              value={formData.categories}
              options={allCategories}
              onChange={(e, value) => {
                setFormData((prevState) => ({ ...prevState, categories: value }));
              }}
              disableCloseOnSelect
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Categories" />}
            />
            <MMRL />
          </Stack>
          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <Autocomplete
              multiple
              sx={{ width: "100%" }}
              value={formData.antifeatures}
              options={antifeatures}
              onChange={(e, value) => {
                setFormData((prevState) => ({ ...prevState, antifeatures: value }));
              }}
              filterSelectedOptions
              disableCloseOnSelect
              renderInput={(params) => <TextField {...params} label="Anti-Features" />}
            />
            <MMRL />
          </Stack>

          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <TextField
              placeholder="https://..."
              fullWidth
              label="Module Cover"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
            />
            <MMRL />
          </Stack>

          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <TextField placeholder="https://..." fullWidth label="Module Icon" name="icon" value={formData.icon} onChange={handleChange} />
            <MMRL />
          </Stack>

          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <TextField
              placeholder="https://..."
              fullWidth
              label="Raw README.md URL"
              name="readme"
              value={formData.readme}
              onChange={handleChange}
            />
            <MMRL />
          </Stack>

          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
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
              value={formData.screenshots}
              onChange={(e, value) => {
                setFormData((prevState) => ({ ...prevState, screenshots: value }));
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
            <MMRL />
          </Stack>

          <Stack sx={{ width: "100%" }} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
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
              value={formData.require}
              onChange={(e, value) => {
                setFormData((prevState) => ({ ...prevState, require: value }));
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
            <MMRL />
          </Stack>
        </Stack>
      </Page.RelativeContent>
    </Page>
  );
};

export { SubmitModuleActivity };
