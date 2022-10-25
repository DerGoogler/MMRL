import * as React from 'react';
import {ModuleProps} from './ModuleCard';
import {View} from 'react-native';
import {
  Button,
  Card,
  Checkbox,
  List,
  Paragraph,
  Switch,
  Text,
  Title,
} from 'react-native-paper';
import {readProps} from '../utils/readProps';
import SuFile from '../native/SuFile';

export interface DeviceModuleProps {
  module: string;
}

export const DeviceModule: React.FC<DeviceModuleProps> = props => {
  const [prop, setProp] = React.useState<ModuleProps>({} as any);
  const [isSwitchDisabled, setIsSwitchDisabled] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(true);

  React.useEffect(() => {
    const disable = new SuFile(`/data/adb/modules/${props.module}/disable`);
    setIsEnabled(!disable.exist());
  }, []);

  React.useEffect(() => {
    const remove = new SuFile(`/data/adb/modules/${props.module}/remove`);
    setIsSwitchDisabled(remove.exist());
  }, []);

  React.useEffect(() => {
    const read = new SuFile(
      `/data/adb/modules/${props.module}/module.prop`,
    ).read();
    setProp(readProps(read));
  }, []);

  const handleModuleStateChange = (checked: boolean) => {
    const disable = new SuFile(`/data/adb/modules/${props.module}/disable`);

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
                const remove = new SuFile(
                  `/data/adb/modules/${props.module}/remove`,
                );
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
                const file = new SuFile(
                  `/data/adb/modules/${props.module}/remove`,
                );
                if (file.create()) {
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
