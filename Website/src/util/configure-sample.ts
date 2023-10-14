export const configureSample = `import React from "react"
import { Markdown, Page, Tabbar } from "mmrl-ui"
import { useNativeProperties, useNativeStorage } from "mmrl-hooks"

function GeneralTab(props) {
  const [curl, setCurl] = useNativeProperties("persist.mmrlini.curl", "/system/usr/share/mmrl/bin/curl");
  const [zip, setZip] = useNativeProperties("persist.mmrlini.zip", "/system/usr/share/mmrl/bin/zip");
  const [unzip, setUnzip] = useNativeProperties("persist.mmrlini.unzip", "/system/bin/unzip");
  const [installFolder, setInstallFolder] = useNativeProperties("persist.mmrlini.install_folder", "/data/local/tmp/<NAME>-<BRANCH>-moduled.zip");

  return (
    <Page sx={{ p: 0 }}>
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setCurl(val);
          }}
          inputLabel="Path"
          type="text"
          title="Change curl bin path"
          initialValue={curl}
        >
          <ListItemText primary="Change curl bin path" secondary={curl} />
        </ListItemDialogEditText>
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setZip(val);
          }}
          inputLabel="Path"
          type="text"
          title="Change zip bin path"
          initialValue={zip}
        >
          <ListItemText primary="Change zip bin path" secondary={zip} />
        </ListItemDialogEditText>
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setUnzip(val);
          }}
          inputLabel="Path"
          type="text"
          title="Change unzip bin path"
          initialValue={unzip}
        >
          <ListItemText primary="Change unzip bin path" secondary={unzip} />
        </ListItemDialogEditText>
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setInstallFolder(val);
          }}
          inputLabel="Path"
          type="text"
          title="Change install path"
          description="Edit with care!"
          initialValue={installFolder}
        >
          <ListItemText primary="Install folder/file" secondary={installFolder} />
        </ListItemDialogEditText>
      </List>

      <List subheader={<ListSubheader>Config</ListSubheader>}>
        <ListItem>
          <ListItemText primary="Swipeable tabs" secondary="Enables swipe between tabs" />
          <Switch checked={props.swipeable} onChange={(e) => props.setSwipeable(e.target.checked)} />
        </ListItem>
      </List>

      <Divider />

      <List subheader={<ListSubheader>Project</ListSubheader>}>
        <ListItemButton onClick={() => window.open("https://github.com/DerGoogler/MMRL/issues")}>
          <ListItemText primary="Report a issue" />
        </ListItemButton>
      </List>
    </Page>
  );
}

function TippsTab() {
  const data = \`# Enable Extended JSX Support

Create this file in your module folder

\\\`\\\`\\\`shell
touch $MODID/system/usr/share/mmrl/config/$MODID/index.jsx
\\\`\\\`\\\`

## Simple counter

\\\`\\\`\\\`jsx
import React from 'react'
 
function Counter() {
  const [counter, setCounter] = React.useState(0);
 
  //increase counter
  const increase = () => {
    setCounter(count => count + 1);
  };
 
  //decrease counter
  const decrease = () => {
    setCounter(count => count - 1);
  };
 
  //reset counter 
  const reset = () =>{
    setCounter(0)
  }
 
  return (
    <div className="counter">
      <h1>React Counter</h1>
      <span className="counter__output">{counter}</span>
      <div className="btn__container">
        <button className="control__btn" onClick={increase}>+</button>
        <button className="control__btn" onClick={decrease}>-</button>
        <button className="reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Counter
\\\`\\\`\\\`

\`;

  return (
    <Page sx={{ p: 1 }}>
      <Markdown children={data} />
    </Page>
  );
}

function InstallToolsConfig() {
  const [index, setIndex] = React.useState(0)
  const [swipeable, setSwipeable] = useNativeStorage("mmrlini_swipeable", false)

  const handlePreChange = (event) => {
    if (event.index != this.state.index) {
      setIndex(event.index)
    }
  };

  const renderTabs = () => {
    return [
      {
        content: <GeneralTab swipeable={swipeable} setSwipeable={setSwipeable} />,
        tab: <Tabbar.Tab label='General' />
      },
      {
        content: <TippsTab />,
        tab: <Tabbar.Tab label='JSX Support' />
      }
    ];
  }

  return (
    <Page>
      <Tabbar
        swipeable={swipeable}
        position='auto'
        index={index}
        onPreChange={handlePreChange}
        renderTabs={renderTabs}
      />
    </Page>
  );
}

export default InstallToolsConfig;
`;
