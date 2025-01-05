import type { ObjectScope } from "../types";
import { MMRLObjectAccessor } from "./MMRLObjectAccessor";

export interface FileInterfaceImpl {}

export class FileInterface extends MMRLObjectAccessor {
  public constructor(scope: ObjectScope) {
    super(scope);
  }
}

export function FileInterfaceFactory(scope: ObjectScope): FileInterface {
  return new FileInterface(scope);
}
