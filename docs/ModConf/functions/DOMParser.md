# DOMParser

## Usage

```js
import React from "react";
import { Page } from "@mmrl/ui";
import { List, ListItem, ListItemText } from "@mui/material";

const dom = new DOMParser();

const configStore = dom.parseFromFile(
  "/data/misc/apexdata/com.android.wifi/WifiConfigStoreSoftAp.xml"
);

const softap = configStore.getElementsByTagName("SoftAp")[0];

const ssidName = softap
  .querySelector('string[name="WifiSsid"]')
  .innerHTML.replace(/"(.+)"/g, "$1");
const passwd = softap.querySelector('string[name="Passphrase"]').innerHTML;

export default () => {
  return (
    <Page>
      <List>
        <ListItem>
          <ListItemText primary="Name" secondary={ssidName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Password" secondary={passwd} />
        </ListItem>
      </List>
    </Page>
  );
};
```
