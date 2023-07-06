namespace ModuleProps {
  export interface FoxProps {
    minApi?: int;
    maxApi?: int
    minMagisk?: string | int;
    needRamdisk?: boolean;
    support?: string;
    donate?: string;
    config?: string;
    changeBoot?: boolean;
  }

  export interface RootObject {
    id: string;
    last_update: number;
    zip_url: string;
    notes_url: string;
    prop_url: string;
  }
}

export default ModuleProps;
