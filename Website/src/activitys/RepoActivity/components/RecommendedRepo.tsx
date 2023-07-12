import Icon from "@Components/Icon";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { StyledCard } from "@Components/StyledCard";
import { useRepos } from "@Hooks/useRepos";
import { os } from "@Native/Os";

interface RecommendedRepoProps {
  name: string;
  moduleCount: number;
  link: string;
}

export const RecommendedRepo = (props: RecommendedRepoProps) => {
  const { actions } = useRepos();

  return (
    <StyledCard elevation={0}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h6">{props.name}</Typography>
            <Typography variant="body1" color="text.secondary">
              More than {props.moduleCount.toString()}+ modules
            </Typography>
          </Box>
        </Box>
        <IconButton
          aria-label="next"
          size="large"
          onClick={() => {
            actions.addRepo({
              url: props.link,
              callback: (state) => {},
              error: (error) => {
                os.toast(error, Toast.LENGTH_SHORT);
              },
            });
          }}
        >
          <Icon icon={AddIcon} />
        </IconButton>
      </Box>
    </StyledCard>
  );
};
