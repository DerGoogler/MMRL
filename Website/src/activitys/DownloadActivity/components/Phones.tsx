import { styled } from "@mui/material";

interface Props {
  caseColor: string;
  screenColor: string;
}

export const Phones = (props: Partial<Props>) => {
  const C = styled("div")(({ theme }) => ({
    position: "absolute",
    right: "10%",
    bottom: "-30%",
    width: "300px",
    height: "540px",
    backgroundColor: props.caseColor || "#333",
    borderRadius: "21px",
    transform: "rotate(25deg)",
    "::before": {
      position: "absolute",
      top: "10%",
      right: "10px",
      bottom: "10%",
      left: "10px",
      content: '""',
      backgroundColor: props.screenColor || "rgba(255, 255, 255, 0.1)",
      borderRadius: "5px",
    },
  }));

  const C2 = styled(C)(({ theme }) => ({
    top: "-25%",
    right: "auto",
    bottom: 0,
    left: "5%",
    backgroundColor: props.caseColor || "#e5e5e5",
    transform: "rotate(14deg)",
  }));

  return {
    _1: C,
    _2: C2,
  };
};
