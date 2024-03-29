import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useRepos } from "@Hooks/useRepos";
import { os } from "@Native/Os";
import { ListItem, ListItemText } from "@mui/material";

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
      <ListItemText primary={props.name} secondary={props.link} />
    </ListItem>
  );
};
