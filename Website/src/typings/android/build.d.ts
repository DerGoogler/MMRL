interface NBuild {
  VERSION: () => {
    SDK_INT(): int;
    SECURITY_PATCH(): string;
    CODENAME(): string;
    RELEASE(): string;
  };
  VERSION_CODES: () => {
    LOLLIPOP(): int;
    LOLLIPOP_MR1(): int;
    M(): int;
    N(): int;
    N_MR1(): int;
    O(): int;
    O_MR1(): int;
    P(): int;
    Q(): int;
    R(): int;
    S(): int;
    S_V2(): int;
  };
}

export default NBuild;
