import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {DeviceModule} from '../components/DeviceModule';
import {Shell} from '../native/Shell';
import SuFile from '../native/SuFile';

const InstalledFragment: React.FC = () => {
  const [modules, setModules] = React.useState(
    new SuFile('/data/adb/modules').list(),
  );

  React.useEffect(() => {
    // Try to execute superuser
    Shell.exec('su');
  }, []);

  if (!Shell.isAppGrantedRoot()) {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text>Your device dosen't have root permissions</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{padding: 8}}>
        {modules.map((module, index) => (
          <DeviceModule key={index + '_' + module} module={module} />
        ))}
      </View>
    </ScrollView>
  );
};

export default InstalledFragment;
