import type { Manager, MimeType, ObjectScope } from "../types";
import { MMRLObjectAccessor } from "./MMRLObjectAccessor";

export interface MMRLInterfaceImpl {
  getManager(): string;
  getMMRL(): string;
  getHasAccessToFileSystem(): boolean;
  getHasAccessToAdvancedKernelSuAPI(): boolean;
  getWindowTopInset(): number;
  getWindowBottomInset(): number;
  isLightNavigationBars(): boolean;
  isDarkMode(): boolean;
  setLightNavigationBars(light: boolean): void;
  isLightStatusBars(): boolean;
  setLightStatusBars(light: boolean): void;
  getSdk(): number;
  shareText(text: string): void;
  shareText(text: string, type: MimeType): void;
}

export class MMRLInterface extends MMRLObjectAccessor<MMRLInterfaceImpl> {
  public constructor(scope: ObjectScope) {
    super(scope);
  }

  public injectStyleSheets() {
    if (!this.isMMRL) {
      return;
    }

    const stylesheets = ["/mmrl/insets.css", "/mmrl/colors.css"];

    stylesheets.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = href;
      document.head.appendChild(link);
    });
  }

  private readonly emptyManager: Manager = {
    name: "Unknown",
    versionName: "Unknown",
    versionCode: 0,
  };

  public get manager(): Manager | null {
    if (this.isMMRL) {
      return this.parseJSON<Manager>(this.interface.getManager());
    } else {
      return this.emptyManager;
    }
  }

  public get mmrl(): Manager | null {
    if (this.isMMRL) {
      return this.parseJSON<Manager>(this.interface.getMMRL());
    } else {
      return this.emptyManager;
    }
  }

  public get hasAccessToFileSystem(): boolean {
    if (this.isMMRL) {
      return this.interface.getHasAccessToFileSystem();
    } else {
      return false;
    }
  }

  public get hasAccessToAdvancedKernelSuAPI(): boolean {
    if (this.isMMRL) {
      return this.interface.getHasAccessToAdvancedKernelSuAPI();
    } else {
      return true;
    }
  }

  public get windowTopInset(): number {
    if (this.isMMRL) {
      return this.interface.getWindowTopInset();
    } else {
      return 0;
    }
  }

  public get windowBottomInset(): number {
    if (this.isMMRL) {
      return this.interface.getWindowBottomInset();
    } else {
      return 0;
    }
  }

  public get lightNavigationBars(): boolean {
    if (this.isMMRL) {
      return this.interface.isLightNavigationBars();
    } else {
      return false;
    }
  }

  public get darkMode(): boolean {
    if (this.isMMRL) {
      return this.interface.isDarkMode();
    } else {
      return false;
    }
  }

  public set lightNavigationBars(light: boolean) {
    if (this.isMMRL) {
      this.interface.setLightNavigationBars(light);
    }
  }

  public get lightStatusBars(): boolean {
    if (this.isMMRL) {
      return this.interface.isLightStatusBars();
    } else {
      return false;
    }
  }

  public set lightStatusBars(light: boolean) {
    if (this.isMMRL) {
      this.interface.setLightStatusBars(light);
    }
  }

  public get sdk(): number {
    if (this.isMMRL) {
      return this.interface.getSdk();
    } else {
      return 0;
    }
  }

  public shareText(text: string, type?: MimeType) {
    if (this.isMMRL) {
      if (type === undefined) {
        this.interface.shareText(text);
        return;
      }

      this.interface.shareText(text, type);
    }
  }
}

export function MMRLInterfaceFactory(scope: ObjectScope): MMRLInterface {
  return new MMRLInterface(scope);
}
