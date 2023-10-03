export const configureSample = `<TabContext value={tabValue}>
<AppBar position="sticky"  elevation={0}>     
    <TabList onChange={handleTabChange()} indicatorColor="secondary" textColor="inherit" variant="fullWidth">
        <Tab label="General" value="1" />
        <Tab label="Changelog" value="2" />
    </TabList>
</AppBar>
<TabPanel sx={{p:1}} value="1">
    <Box sx={{p:1}}>
        <Alert severity="info">
            <AlertTitle>Still in development!</AlertTitle>
            This configure screen is still in development, the api may change in future
    </Alert>
    </Box>      

    <List subheader={<ListSubheader>Settings</ListSubheader>}>
      <ListItemDialogEditText
          id="rootfs"
          scope="mkshrc"
          inputLabel="Path"
          type="text"
          title="Change ROOTFS"
          initialValue="/data/mkuser"
          description="Changing this path will move/create a new environment">
        <ListItemText primary="Default ROOTFS" />
      </ListItemDialogEditText>
      <ListItem>
        <ListItemText primary="Show service notification" />
        <Switch id="show_service_notify" defaultState={true} />
      </ListItem>
    </List>

    <Divider/>

    <List subheader={<ListSubheader>Project</ListSubheader>}>
      <OnClick handler={openLink("https://github.com/Magisk-Modules-Alt-Repo/mkshrc/issues")}>
        <ListItemButton>
          <ListItemText primary="Report a issue" />
        </ListItemButton>
      </OnClick>
      <OnClick handler={openLink("https://github.com/Magisk-Modules-Alt-Repo/mkshrc")}>
        <ListItemButton>
          <ListItemText primary="Source code" />
        </ListItemButton>
      </OnClick>
      <OnClick handler={openLink("https://github.com/Magisk-Modules-Alt-Repo/node")}>
        <ListItemButton>
          <ListItemText primary="Try Node.js" />
        </ListItemButton>
      </OnClick>
    </List>
</TabPanel>
<TabPanel sx={{p:1}} value="2">
    <Import file={modpath("/system/usr/share/mmrl/config/mmrl_install_tools_changelog.mdx")}/>
    {/* <Markdown fetch="https://raw.githubusercontent.com/wiki/DerGoogler/MMRL/Changelog.md" /> */}
</TabPanel>
</TabContext>`