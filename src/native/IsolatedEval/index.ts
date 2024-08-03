import { Chooser } from "@Native/Chooser";
import { SuZip } from "@Native/SuZip";
import { Terminal } from "@Native/Terminal";
import { Path } from "@Util/path.js";
import { transform } from "@babel/standalone";
import Sandbox from "@nyariv/sandboxjs";
import { IScope } from "@nyariv/sandboxjs/dist/node/executor";
import ini from "ini";
import React from "react";
import yaml from "yaml";
import { Build } from "../Build";
import { BuildConfig, BuildConfigClass } from "../BuildConfig";
import { Native } from "../Native";
import { OsClass, os } from "../Os";
import { Shell } from "../Shell";
import { SuFile } from "../SuFile";
import { View, view } from "../View";
import { IsoAudio } from "./IsoAudio";
import { IsoDOMParser } from "./IsoDOMParser";
import { IsoDocument } from "./IsoDocument";
import { IsoXMLSerializer } from "./IsoXMLSerializer";
import { IsolatedEvalError } from "./IsolatedEvalError";
import { IsolatedFunctionBlockError } from "./IsolatedFunctionBlockError";

type IsoModule = {
  exports: {
    default?: any;
    __esModule?: boolean;
    [x: string]: any;
  };
};

interface IsolatedEvalOptions {
  libraries: Record<string, any>;
  indexFile: string;
  cwd: string;
  scope: IScope;
  standaloneFile?: string;
}

class IsolatedEval<T = any> {
  private readonly _sandbox: Sandbox = new Sandbox();
  private readonly _globals = {
    ...Sandbox.SAFE_GLOBALS,
    JSON: JSON,
    YAML: require("yaml"),
    INI: require("ini"),
    console: console,
    document: new IsoDocument(),
    Toast: Toast,
    Object: Object,
    Document: IsoDocument,
    Response: Response,
    Element: Element,
    Audio: IsoAudio,
    HTMLMediaElement: HTMLMediaElement,
    FileReader: FileReader,
    Blob: Blob,
    Event: Event,
    EventTarget: EventTarget,
    NamedNodeMap: NamedNodeMap,
    DOMParser: IsoDOMParser,
    XMLSerializer: IsoXMLSerializer,
    SuFile: SuFile,
    SuZip: SuZip,
    Terminal: Terminal,
    Chooser: Chooser,
    Shell: Shell,
    view: view,
    os: os,
    BuildConfig: BuildConfig,
    Build: Build,
    Native: Native,
    React: React,
    eval() {
      throw new IsolatedFunctionBlockError("eval()");
    },
    atob() {
      throw new IsolatedFunctionBlockError("atob()");
    },
    btoa() {
      throw new IsolatedFunctionBlockError("btoa()");
    },
    encodeURI() {
      throw new IsolatedFunctionBlockError("encodeURI()");
    },
    encodeURIComponent() {
      throw new IsolatedFunctionBlockError("encodeURIComponent()");
    },
    decodeURI() {
      throw new IsolatedFunctionBlockError("decodeURI()");
    },
    decodeURIComponent() {
      throw new IsolatedFunctionBlockError("decodeURIComponent()");
    },
  };
  private readonly _prototypeWhitelist = Sandbox.SAFE_PROTOTYPES;
  public moduleCache: {};
  public module: IsoModule;
  public path: Path;
  public libraries: Record<string, any>;
  public indexFile: string;
  public scope: IScope;
  public standaloneFile: string | undefined;

  public constructor(options: IsolatedEvalOptions) {
    this._prototypeWhitelist.set(Node, new Set());
    this._prototypeWhitelist.set(Object, new Set());
    this._prototypeWhitelist.set(Document, new Set());
    this._prototypeWhitelist.set(IsoDocument, new Set());
    this._prototypeWhitelist.set(Response, new Set());
    this._prototypeWhitelist.set(Element, new Set());
    this._prototypeWhitelist.set(HTMLMediaElement, new Set());
    this._prototypeWhitelist.set(IsoAudio, new Set());
    this._prototypeWhitelist.set(FileReader, new Set());
    this._prototypeWhitelist.set(Blob, new Set());
    this._prototypeWhitelist.set(Event, new Set());
    this._prototypeWhitelist.set(EventTarget, new Set());
    this._prototypeWhitelist.set(NamedNodeMap, new Set());
    this._prototypeWhitelist.set(IsoDOMParser, new Set());
    this._prototypeWhitelist.set(DOMParser, new Set());
    this._prototypeWhitelist.set(IsoXMLSerializer, new Set());
    this._prototypeWhitelist.set(XMLSerializer, new Set());
    this._prototypeWhitelist.set(SuFile, new Set());
    this._prototypeWhitelist.set(SuZip, new Set());
    this._prototypeWhitelist.set(View, new Set());
    this._prototypeWhitelist.set(OsClass, new Set());
    this._prototypeWhitelist.set(BuildConfigClass, new Set());
    this._prototypeWhitelist.set(Build, new Set());
    this._prototypeWhitelist.set(Native, new Set());
    this._prototypeWhitelist.set(Shell, new Set());
    this._prototypeWhitelist.set(Terminal, new Set());
    this._prototypeWhitelist.set(Chooser, new Set());
    this._prototypeWhitelist.set(Path, new Set());
    this._prototypeWhitelist.set(React, new Set());

    this.require = this.require.bind(this);
    this._resolveModule = this._resolveModule.bind(this);

    this._sandbox = new Sandbox({ globals: this._globals, prototypeWhitelist: this._prototypeWhitelist });

    this.module = {
      exports: {
        __esModule: true,
      },
    };
    this.moduleCache = {};

    this.path = new Path(options.cwd);

    this.libraries = options.libraries;
    this.standaloneFile = options.standaloneFile;
    this.indexFile = options.indexFile;
    this.scope = {
      ...options.scope,
      module: this.module,
      exports: this.module.exports,
      path: this.path,
      require: this.require,
    };
  }

  public require(modulePath: string) {
    // Check if the module is a core module
    if (this.libraries[modulePath]) {
      return this.libraries[modulePath];
    }

    // Resolve the module path
    const resolvedPath = this._resolveModule(modulePath);
    if (!resolvedPath) {
      throw new IsolatedEvalError(`Cannot find module '${modulePath}'`);
    }

    // Check if module is already cached
    if (this.moduleCache[resolvedPath]) {
      return this.moduleCache[resolvedPath].exports;
    }

    // Create a new module and cache it
    const module: IsoModule = { exports: {} };
    this.moduleCache[resolvedPath] = module;

    // Read and execute module content based on file extension
    const extension = this.path.extname(resolvedPath);

    const readResolvedPath = new SuFile(resolvedPath);

    switch (extension) {
      case ".json":
        const jsonContent = readResolvedPath.read();
        module.exports = JSON.parse(jsonContent);
        break;

      case ".yml":
      case ".yaml":
        module.exports = yaml.parse(readResolvedPath.read());
        break;
      case ".properties":
      case ".prop":
      case ".ini":
        module.exports = ini.parse(readResolvedPath.read());
        break;
      case ".js":
      case ".jsx":
        const moduleContent = readResolvedPath.read();
        const transformed = this.transform(moduleContent);
        if (transformed) {
          const moduleWrapper = new Function("exports", "require", "module", "__filename", "__dirname", transformed);
          this.compile<typeof moduleWrapper>(`return ${moduleWrapper}`)(
            module.exports,
            this.require,
            module,
            resolvedPath,
            this.path.dirname(resolvedPath)
          );
        } else {
          throw new IsolatedEvalError("An error occurred, either there is a syntax mistake or something");
        }
        break;
      default:
        module.exports.default = readResolvedPath.read();
        break;
    }

    return module.exports.default || module.exports;
  }

  private _resolveModule(modulePath: string): string | null {
    const extensions = [".js", ".jsx", ".json", "yml", ".yaml", ".properties", ".prop", ".ini"];
    const resolvedPath = new SuFile(this.path.resolve(modulePath));

    // Check if the exact file exists
    if (resolvedPath.exist() && resolvedPath.isFile()) {
      return resolvedPath.getPath();
    }

    // Check if file with extensions exists
    for (let ext of extensions) {
      const pth = new SuFile(resolvedPath.getPath() + ext);

      if (pth.exist() && pth.isFile()) {
        return pth.getPath();
      }
    }

    // Check if it's a directory and has an index file
    if (resolvedPath.exist() && resolvedPath.isDirectory()) {
      for (let ext of extensions) {
        const ifp = new SuFile(this.path.join(resolvedPath.getPath(), "index" + ext));

        if (ifp.exist() && ifp.isFile()) {
          return ifp.getPath();
        }
      }
    }

    return null;
  }

  public compileTransform(code: string) {
    const parseCode = this.transform(code);

    if (typeof parseCode != "undefined") {
      this._sandbox.compile<T>(parseCode, false)(this.scope).run();
    }

    return this.module;
  }

  public compile<F = any>(code: string, ...scopes: IScope[]) {
    return this._sandbox.compile<F>(code, false)(this.scope, scopes).run();
  }

  public transform(data: string, filename?: string): string | undefined {
    return transform(data, {
      filename: this.indexFile,
      presets: ["typescript", "react"],
      plugins: [
        "transform-computed-properties",
        "syntax-import-attributes",
        ["transform-destructuring", { loose: true }],
        ["transform-modules-commonjs", { loose: true, importInterop: "node" }],
        "transform-object-rest-spread",
        "syntax-class-properties",
        ["transform-classes", { loose: true }],
        ["transform-class-properties", { loose: true }],
        "syntax-object-rest-spread",
      ],
    }).code as string | undefined;
  }
}

export { IsolatedEval, IsolatedEvalOptions };
