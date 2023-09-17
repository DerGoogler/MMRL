import { ProgressCircular } from "react-onsenui";
import { Markup } from "@Components/Markdown";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { useTheme } from "@Hooks/useTheme";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

type Extra = {
  desc?: string;
  name: string;
  logo?: string;
};

function DescriptonActivity() {
  const { context, extra } = useActivity<Extra>();
  const { strings } = useStrings();
  const { theme } = useTheme();
  const { desc, name, logo } = extra;

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Center
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Avatar
              alt={name}
              sx={(theme) => ({
                bgcolor: theme.palette.primary.light,
                width: 40,
                height: 40,
                boxShadow: "0 -1px 5px rgba(0,0,0,.09), 0 3px 5px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.3), 0 1px 3px rgba(0,0,0,.15)",
                borderRadius: "20%",
                mr: 1.5,
                fontSize: 14,
              })}
              src={logo}
            >
              {name.charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ alignSelf: "center", ml: 0.5, mr: 0.5, width: "100%" }}>
              <Typography variant="body1" fontWeight="bold" noWrap>
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                About this module
              </Typography>
            </Box>
          </Box>
        </Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button icon={CloseIcon} onClick={context.popPage} />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <Page.RelativeContent zeroMargin>
        {!desc ? (
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
        ) : (
          <>
            <Markup
              sx={{
                px: {
                  xs: 1,
                  sm: 1,
                  md: 0,
                },
              }}
              children={desc}
            />
          </>
        )}
      </Page.RelativeContent>
    </Page>
  );
}

export default DescriptonActivity;
