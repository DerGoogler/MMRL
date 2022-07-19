
import WebView from "@Components/WebView";
import { CSSProperties } from "react";
import AppCompatActivity from "./AppCompatActivity";

interface Props {
  extra?: any;
  popPage: any;
}

class RepoGeneratorActivity extends AppCompatActivity<Props> {
  public style: CSSProperties = {
    height: "100%",
  };

  public constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  public onCreateToolbar() {
    return {
      title: "Repo Generator",
      onBackButton: this.props.popPage,
    };
  }

  public onCreate(): JSX.Element {
    return (
      <>
        <WebView url={"https://dergoogler.com/repo-generator/"} height="100%" width="100%" />
      </>
    );
  }
}

export default RepoGeneratorActivity;
