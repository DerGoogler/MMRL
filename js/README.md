# MMRL JavaScript Library for WebUI

This is a JavaScript library designed to provide an interface for interacting with the MMRL environment. It includes classes and types to facilitate the integration and manipulation of MMRL objects.

## Table of Contents

- [MMRL JavaScript Library for WebUI](#mmrl-javascript-library-for-webui)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Types](#types)
    - [MMRLObjectAccessor](#mmrlobjectaccessor)
    - [MMRLInterface](#mmrlinterface)
    - [FileSystem](#filesystem)

## Installation

To install MMRL-V4, clone the repository and install the dependencies:

```sh
npm install mmrl
```

## Usage

### Types

The `types.ts` file defines various types used throughout the library:

```typescript
export type Scope = `$${string}`;
export type ObjectScope = Scope | object;
export type MimeType = `${string}/${string}`;

export interface Manager {
    name: string;
    versionName: string;
    versionCode: number;
}
```

### MMRLObjectAccessor

The `MMRLObjectAccessor` class provides a base class for accessing MMRL objects. It handles the parsing of the scope and provides utility methods for interacting with the MMRL environment.

Example usage:

```typescript
import { MMRLObjectAccessor } from "mmrl";

const accessor = new MMRLObjectAccessor("net-switch");
console.log(accessor.interface);
```

### MMRLInterface

The `MMRLInterface` class extends `MMRLObjectAccessor` to provide additional functionality specific to MMRL. It includes methods for injecting stylesheets, accessing manager information, and interacting with the MMRL environment.

Example usage:

```typescript
import { MMRLInterfaceFactory } from "mmrl";

const mmrl = MMRLInterfaceFactory("net-switch");
mmrl.injectStyleSheets();
console.log(mmrl.manager);
```

### FileSystem

The `FileSystem` class provides methods for interacting with the file system within the MMRL environment. It includes methods for reading, writing, and deleting files.

Example usage:

```typescript
import { FileSystem } from "mmrl";

const fs = new FileSystem();
fs.write("example.txt", "Hello, MMRL!");
const content = fs.read("example.txt");
console.log(content);
fs.delete("example.txt");
```