import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent, { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import UpdateIcon from "@mui/icons-material/Update";
import { Typography } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { MarkUpCompile } from "@Components/Markdown";

export interface ChangelogSchema {
  title: string;
  version: string;
  color: OverridableStringUnion<"inherit" | "grey" | "primary" | "secondary" | "error" | "info" | "success" | "warning", {}>;
  changes: string | string[];
}

interface ChangelogTimelineProps {
  data: ChangelogSchema[];
}

export const ChangelogTimeline = (props: ChangelogTimelineProps) => {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {props.data.map((log) => (
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color={log.color}>
              <UpdateIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              {log.title}
            </Typography>
            <Typography>
              <ul style={{ padding: 0 }}>
                {log.changes instanceof Array ? MarkUpCompile(log.changes.join()) : MarkUpCompile(log.changes)}
              </ul>
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
