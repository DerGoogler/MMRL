import { SearchRounded } from "@mui/icons-material";
import { SearchInput } from "react-onsenui";
import { Button, ViewX, ViewXRenderData } from "react-onsenuix";

interface SearchbarProps {
  placeholder: string;
  onInputChange: (e: Event) => void;
  onButtonClick: () => void;
}

class Searchbar extends ViewX<SearchbarProps, {}, HTMLDivElement> {
  public constructor(props: SearchbarProps | Readonly<SearchbarProps>) {
    super(props);
    this.createView = this.createView.bind(this);
  }

  public createView(data: ViewXRenderData<SearchbarProps, {}, HTMLElement>): JSX.Element {
    return (
      <div
        style={{
          textAlign: "center",
          display: "inline-flex",
          justifyContent: "center",
          padding: "8px 8px 4px",
        }}
      >
        <SearchInput
          placeholder={data.p.placeholder}
          style={{
            borderRadius: "8px",
            width: "100%",
            marginRight: "4px",
          }}
          onChange={data.p.onInputChange}
        />
        <Button
          onClick={data.p.onButtonClick}
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            marginLeft: "4px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SearchRounded sx={{ color: "white" }} />
          </div>
        </Button>
      </div>
    );
  }
}

export { Searchbar };
