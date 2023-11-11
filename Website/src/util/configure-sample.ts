export const configureSample = `import React from "react";
import { Page } from "@mmrl/ui";
import { StringsProvider } from "@mmrl/providers";
import { useStrings } from "@mmrl/hooks";

const strs = {
  en: {
    hello: "Hello"
  },
  de: {
    hello: "Hallo"
  }
}


const Config = () => {
  const { strings } = useStrings();
  return (
    <Page>{strings("hello")}</Page>
  )
}

const Main = () => {
  return (
    <StringsProvider data={strs}>
      <Config />
    </StringsProvider>
  )
}

export default Main`;
