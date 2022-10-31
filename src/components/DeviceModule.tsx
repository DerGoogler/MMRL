import * as React from 'react';
import {View} from 'react-native';
import {Button, Card, Switch, Text} from 'react-native-paper';
import {Magisk} from '../native/Magisk';

export interface DeviceModuleProps {
  module: string;
}

export const DeviceModule: React.FC<DeviceModuleProps> = props => {
  const [isSwitchDisabled, setIsSwitchDisabled] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(true);

  const disable = Magisk.disableModule(props.module);
  const remove = Magisk.removeModule(props.module);
  const prop = Magisk.readModuleProps(props.module);

  React.useEffect(() => {
    setIsEnabled(!disable.exist());
  }, []);

  React.useEffect(() => {
    setIsSwitchDisabled(remove.exist());
  }, []);

  const handleModuleStateChange = (checked: boolean) => {
    if (checked) {
      if (disable.exist()) {
        if (disable.delete()) {
          setIsEnabled(true);
        }
      }
    } else {
      if (!disable.exist()) {
        if (disable.create()) {
          setIsEnabled(false);
        }
      }
    }
  };

  return (
    <View style={{marginTop: 5, flex: 1}}>
      <Card>
        <Card.Title
          title={prop.name}
          subtitle={`${prop.author} / ${prop.version} (${prop.versionCode})`}
          rightStyle={{marginRight: 8, padding: 8}}
          right={props => (
            <Switch
              value={isEnabled}
              disabled={isSwitchDisabled}
              onValueChange={handleModuleStateChange}
            />
          )}
        />
        <Card.Content>
          <Text variant="labelMedium" children={prop.description} />
        </Card.Content>
        <Card.Actions>
          <Button
            mode="text"
            onPress={() => {
              // Can be improved, but not now
              if (isSwitchDisabled) {
                if (remove.exist()) {
                  if (remove.delete()) {
                    setIsSwitchDisabled(false);
                    console.log(`${props.module} has been recovered`);
                  } else {
                    console.log(`Failed to restore ${props.module}`);
                  }
                } else {
                  console.log(
                    `This remove file don't exists for ${props.module}`,
                  );
                }
              } else {
                if (remove.create()) {
                  setIsSwitchDisabled(true);
                } else {
                  setIsSwitchDisabled(false);
                }
              }
            }}
            icon={isSwitchDisabled ? 'restore' : 'delete'}>
            {isSwitchDisabled ? 'Restore' : 'Remove'}
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};
