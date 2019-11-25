import {createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import React from "react";

export const useSharingMakerStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    reviewContainer: {
      padding: theme.spacing(3)
    },
  }),
);

export const toMultiline = (description: String) => {
  return (
    <span className="bold-text">
        {description.split("\n").map(function(item, key) {
          return (
            <span key={key}>
              {item}
              <br />
            </span>
          )
        })}
      </span>
  )
};

interface ReviewContainerProps {
  title: String,
  data: String,
}

export const ReviewContainer: React.FC<ReviewContainerProps> = (props) => {
  const classes = useSharingMakerStyles();

  return (
    <div className={classes.reviewContainer}>
      <Typography variant="h6">
        {props.title}
      </Typography>
      <Typography variant="body2">
        {toMultiline(props.data)}
      </Typography>
    </div>
  );
};

export const isEmailValid = (email: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};