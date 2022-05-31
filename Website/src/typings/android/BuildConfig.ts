interface NBuildConfig {
  VERSION_CODE(): int;
  VERSION_NAME(): string;
  APPLICATION_ID(): string;
  SDK_INT(): int;
  DEBUG(): bool;
  BUILD_TYPE(): string;
}

export default NBuildConfig;
