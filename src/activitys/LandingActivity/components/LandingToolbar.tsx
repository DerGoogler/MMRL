import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import { os } from "@Native/Os";
import { StyledMenu } from "@Components/DropdownButton";
import { useTheme } from "@Hooks/useTheme";
import { alpha } from "@mui/material";
import { view } from "@Native/View";

interface LandingPageMenuItem {
  title: string;
  onClick?: React.MouseEventHandler<HTMLLIElement | HTMLButtonElement>;
}

interface LandigToolbarProps {
  menuItems: LandingPageMenuItem[];
}

function LandingToolbar(props: LandigToolbarProps) {
  const { theme } = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ paddingTop: `${view.getWindowTopInsets()}px`, backgroundImage: "none", backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CodeRoundedIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MMRL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <StyledMenu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.6),
                  backdropFilter: "saturate(180%) blur(20px)",
                  outlineOffset: -1,
                  outline: `1px solid ${theme.palette.divider} !important`,
                },
              }}
            >
              {props.menuItems.map((menuItem) => (
                <MenuItem
                  key={menuItem.title}
                  onClick={(e) => {
                    handleCloseNavMenu();
                    menuItem.onClick && menuItem.onClick(e);
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>{menuItem.title}</Typography>
                </MenuItem>
              ))}
            </StyledMenu>
          </Box>
          <CodeRoundedIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MMRL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {props.menuItems.map((menuItem) => (
              <Button
                key={menuItem.title}
                onClick={(e) => {
                  handleCloseNavMenu();
                  menuItem.onClick && menuItem.onClick(e);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {menuItem.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              onClick={() => {
                os.openURL("https://github.com/DerGoogler/MMRL", "_blank");
              }}
              sx={{ p: 0 }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export { LandingToolbar };
