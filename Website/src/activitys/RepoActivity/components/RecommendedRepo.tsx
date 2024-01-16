import Icon from "@Components/Icon";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { StyledCard } from "@Components/StyledCard";
import { useRepos } from "@Hooks/useRepos";
import { os } from "@Native/Os";
import { ListItem, ListItemText } from "@mui/material";
import { StyledListItemText } from "@Components/StyledListItemText";

interface RecommendedRepoProps {
  name: string;
  link: string;
}

export const RecommendedRepo = (props: RecommendedRepoProps) => {
  const { actions } = useRepos();

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="add"
          onClick={() => {
            actions.addRepo({
              url: props.link,
              callback: (state) => {},
              error: (error) => {
                os.toast(error.message, Toast.LENGTH_SHORT);
              },
            });
          }}
        >
          <AddIcon />
        </IconButton>
      }
    >
      <StyledListItemText primary={props.name} secondary={props.link} />
    </ListItem>
  );
};