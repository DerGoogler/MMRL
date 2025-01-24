import { ObjectScope } from "../types";
import { AccessorScope } from "../util/AccessorScope";
import { MMRLObjectAccessor } from "./MMRLObjectAccessor";

/**
 * Interface defining the methods for FileSystem implementation.
 */
export interface FileSystemImpl {
  read(path: string): string | null;
  read(path: string, bytes: boolean): string | null;
  write(path: string, data: string): void;
  readAsBase64(path: string): string | null;
  list(path: string): string[] | null;
  list(path: string, delimiter: string): string[] | null;
  size(path: string): number;
  size(path: string, recursive: boolean): number;
  stat(path: string): number;
  stat(path: string, total: boolean): number;
  delete(path: string): boolean;
  exists(path: string): boolean;
}

/**
 * Class representing the FileSystem interface.
 * Extends the MMRLObjectAccessor class to provide additional functionality specific to FileSystem.
 * @example
 * const fileSystem = FileSystemFactory("net-switch");
 * console.log(fileSystem.read("/path/to/file"));
 */
export class FileSystem extends MMRLObjectAccessor<FileSystemImpl> {
  /**
   * Creates an instance of FileSystem.
   * @param {ObjectScope} scope - The scope to initialize the internal interface with.
   * @example
   * const fileSystem = FileSystemFactory("net-switch");
   */
  public constructor(scope: ObjectScope) {
    const parsedScope = AccessorScope.parseFileScope(scope);
    super(parsedScope);
  }

  /**
   * Reads the content of a file.
   * @param {string} path - The path to the file.
   * @param {boolean} [bytes=false] - Whether to read the file as bytes.
   * @returns {string | null} The content of the file or null if not available.
   * @example
   * console.log(fileSystem.read("/path/to/file"));
   */
  public read(path: string, bytes: boolean = false): string | null {
    if (this.isMMRL) {
      return this.interface.read(path, bytes);
    }

    return null;
  }

  /**
   * Writes data to a file.
   * @param {string} path - The path to the file.
   * @param {string} data - The data to write.
   * @example
   * fileSystem.write("/path/to/file", "Hello, world!");
   */
  public write(path: string, data: string): void {
    if (this.isMMRL) {
      this.interface.write(path, data);
    }
  }

  /**
   * Reads the content of a file as a Base64 encoded string.
   * @param {string} path - The path to the file.
   * @returns {string | null} The Base64 encoded content of the file or null if not available.
   * @example
   * console.log(fileSystem.readAsBase64("/path/to/file"));
   */
  public readAsBase64(path: string): string | null {
    if (this.isMMRL) {
      return this.interface.readAsBase64(path);
    }

    return null;
  }

  /**
   * Lists the contents of a directory.
   * @param {string} path - The path to the directory.
   * @param {string} [delimiter=","] - The delimiter to use for separating the contents.
   * @returns {string[] | null} The list of contents or null if not available.
   * @example
   * console.log(fileSystem.list("/path/to/directory"));
   */
  public list(path: string, delimiter: string = ","): string[] | null {
    if (this.isMMRL) {
      return this.interface.list(path, delimiter);
    }

    return null;
  }

  /**
   * Gets the size of a file or directory.
   * @param {string} path - The path to the file or directory.
   * @param {boolean} [recursive=false] - Whether to calculate the size recursively.
   * @returns {number} The size of the file or directory.
   * @example
   * console.log(fileSystem.size("/path/to/file"));
   */
  public size(path: string, recursive: boolean = false): number {
    if (this.isMMRL) {
      return this.interface.size(path, recursive);
    }

    return 0;
  }

  /**
   * Gets the status of a file or directory.
   * @param {string} path - The path to the file or directory.
   * @param {boolean} [total=false] - Whether to get the total status.
   * @returns {number} The status of the file or directory.
   * @example
   * console.log(fileSystem.stat("/path/to/file"));
   */
  public stat(path: string, total: boolean = false): number {
    if (this.isMMRL) {
      return this.interface.stat(path, total);
    }

    return 0;
  }

  /**
   * Deletes a file or directory.
   * @param {string} path - The path to the file or directory.
   * @returns {boolean} True if the file or directory was deleted, otherwise false.
   * @example
   * console.log(fileSystem.delete("/path/to/file"));
   */
  public delete(path: string): boolean {
    if (this.isMMRL) {
      return this.interface.delete(path);
    }

    return false;
  }

  /**
   * Checks if a file or directory exists.
   * @param {string} path - The path to the file or directory.
   * @returns {boolean} True if the file or directory exists, otherwise false.
   * @example
   * console.log(fileSystem.exists("/path/to/file"));
   */
  public exists(path: string): boolean {
    if (this.isMMRL) {
      return this.interface.exists(path);
    }

    return false;
  }
}

/**
 * Factory function to create an instance of FileSystem.
 * @param {ObjectScope} scope - The scope to initialize the FileSystem with.
 * @returns {FileSystem} The created FileSystem instance.
 * @example
 * const fileSystem = FileSystemFactory("net-switch");
 */
export function FileSystemFactory(
  scope: ObjectScope
): FileSystem {
  return new FileSystem(scope);
}