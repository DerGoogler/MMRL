interface NShell {
  exec(command: string): void;
  result(command: string): string;
  isAppGrantedRoot(): boolean;
}

export default NShell;
