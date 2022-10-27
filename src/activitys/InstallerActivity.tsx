import * as React from 'react';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import {Activity} from '../Manifest';
import {Magisk, MagiskModuleProps} from '../native/Magisk';
import {Shell} from '../native/Shell';
import SuFile from '../native/SuFile';
import {readProps} from '../utils/readProps';

export const InstallerActivity: React.FC<
  Activity<'InstallerActivity'>
> = () => {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [result, setResult] = React.useState<string[]>([]);

  const id = '0_MARS_SOM_CLEANER-GEAR_ZERO';
  React.useEffect(() => {
    const zip = new SuFile(`/data/local/tmp/zip`);

    if (!zip.exist()) {
      Magisk.busybox(
        'wget',
        `-O /data/local/tmp/zip https://github.com/Magisk-Modules-Repo/zipsigner/raw/master/bin/zip`,
      );
      Shell.exec('chmod +x /data/local/tmp/zip');
    }
  }, []);

  const addLine = (str: string) => {
    setResult(p => [...p, str]);
  };

  React.useEffect(() => {
    addLine(`* Downloading module`);
    Magisk.busybox(
      'wget',
      `-O /data/local/tmp/${id}.zip https://github.com/Magisk-Modules-Alt-Repo/0_MARS_SOM_CLEANER-GEAR_ZERO/archive/main.zip`,
    );

    const module = new SuFile(`/data/local/tmp/${id}.zip`);
    if (module.exist()) {
      addLine('* Unpack module');
      Magisk.busybox(
        'unzip',
        `/data/local/tmp/${id}.zip -d /data/local/tmp/${id}-unpacked`,
      );

      const unpackedModule = new SuFile(`/data/local/tmp/${id}-unpacked`);
      if (unpackedModule.exist()) {
        addLine('* Re-pack module');
        Shell.exec(
          `/data/local/tmp/zip -r ${id}-repacked.zip /data/local/tmp/${id}-unpacked/*`,
        );

        addLine('* Using Magisk-Install');
        Shell.execWithEvent(
          `magisk --install-module "/data/local/tmp/${id}-repacked.zip"`,
        );
      } else {
        addLine(`! No unpacked module found!`);
      }
    } else {
      addLine(`! Module "${id}" was not found!`);
    }
    return () => {
      setResult([]);
    };
  }, []);

  React.useEffect(() => {
    Shell.addEventListener(result => {
      addLine(result);
      console.log(result);
    });
  }, []);

  return (
    <ScrollView
      style={{padding: 8}}
      ref={scrollViewRef}
      onContentSizeChange={(width, height) =>
        scrollViewRef.current?.scrollTo({y: height})
      }>
      {result.map((r, i) => (
        <Text key={i}>{r}</Text>
      ))}
    </ScrollView>
  );
};
