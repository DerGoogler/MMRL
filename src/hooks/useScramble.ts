import React, { useState, useMemo } from "react";

function scrambleString(str: string) {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

export function useScrambledString(str: string) {
  return useMemo(() => scrambleString(str), [str]);
}
