import Sandbox from "@nyariv/sandboxjs";
import { transform, registerPlugin } from "@babel/standalone";
import { PluginObj } from "@babel/core";
import { SuFile } from "./SuFile";
import { View, view } from "./View";
import { Shell, ShellClass } from "./Shell";
import { OsClass, os } from "./Os";
import { BuildConfig, BuildConfigClass } from "./BuildConfig";
import { Build } from "./Build";
import { IScope } from "@nyariv/sandboxjs/dist/node/executor";
import { Native } from "./Native";

class IsolatedEval<T = any> {
  private readonly _sandbox: Sandbox = new Sandbox();
  private readonly _globals = {
    ...Sandbox.SAFE_GLOBALS,
    JSON: JSON,
    YAML: require("yaml"),
    INI: require("ini"),
    console: console,
    document: document,
    Toast: Toast,
    Object: Object,
    Document: Document,
    Response: Response,
    Element: Element,
    FileReader: FileReader,
    Blob: Blob,
    Event: Event,
    EventTarget: EventTarget,
    NamedNodeMap: NamedNodeMap,
    DOMParser: DOMParser,
    SuFile: SuFile,
    Shell: Shell,
    view: view,
    os: os,
    BuildConfig: BuildConfig,
    Build: Build,
    Native: Native,
  };
  private readonly _prototypeWhitelist = Sandbox.SAFE_PROTOTYPES;

  public constructor() {
    this._exportReplacerPlugin = this._exportReplacerPlugin.bind(this);
    this._parseCode = this._parseCode.bind(this);

    this._prototypeWhitelist.set(Node, new Set());
    this._prototypeWhitelist.set(Object, new Set());
    this._prototypeWhitelist.set(Document, new Set());
    this._prototypeWhitelist.set(Response, new Set());
    this._prototypeWhitelist.set(Element, new Set());
    this._prototypeWhitelist.set(FileReader, new Set());
    this._prototypeWhitelist.set(Blob, new Set());
    this._prototypeWhitelist.set(Event, new Set());
    this._prototypeWhitelist.set(EventTarget, new Set());
    this._prototypeWhitelist.set(NamedNodeMap, new Set());
    this._prototypeWhitelist.set(DOMParser, new Set());
    this._prototypeWhitelist.set(SuFile, new Set());
    this._prototypeWhitelist.set(ShellClass, new Set());
    this._prototypeWhitelist.set(View, new Set());
    this._prototypeWhitelist.set(OsClass, new Set());
    this._prototypeWhitelist.set(BuildConfigClass, new Set());
    this._prototypeWhitelist.set(Build, new Set());
    this._prototypeWhitelist.set(Native, new Set());

    this._sandbox = new Sandbox({ globals: this._globals, prototypeWhitelist: this._prototypeWhitelist });

    registerPlugin("plugin", this._exportReplacerPlugin);
  }

  public compile(code: string, scope: IScope): T | undefined {
    const parseCode = this._parseCode(code);

    if (typeof parseCode != "undefined") {
      return this._sandbox.compile<T>(parseCode, false)(scope).run();
    } else {
      return undefined;
    }
  }

  private _parseCode(data: string, filename?: string): string | undefined {
    return transform(data, {
      filename: "index.jsx",
      presets: ["typescript", "react"],
      plugins: [
        "plugin",
        "transform-computed-properties",
        "syntax-import-attributes",
        ["transform-destructuring", { loose: true }],
        "transform-modules-commonjs",
        "transform-object-rest-spread",
        "syntax-class-properties",
        ["transform-classes", { loose: true }],
        "transform-class-properties",
        "syntax-object-rest-spread",
      ],
    }).code as string | undefined;
  }

  private _exportReplacerPlugin({ types: t }): PluginObj {
    return {
      visitor: {
        ExportDefaultDeclaration(path) {
          path.replaceWith(t.returnStatement(path.node.declaration));
        },
      },
    };
  }
}

export { IsolatedEval };
