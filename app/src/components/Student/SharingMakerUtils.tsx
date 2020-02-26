import {Container, createStyles, Divider, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import React from "react";
import {ProjectMessages} from "../../types/types";

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

interface MessageHistoryProps {
  data: ProjectMessages[]
}

export const MessageHistory: React.FC<MessageHistoryProps> = (props) => {
  return (
    <Container>
      <Typography variant="h4" style={{fontSize: '1.2em'}}>
        Messages History
      </Typography>
      <Grid container direction="column">
        {
          props.data !== null &&
          props.data.map((e, id) => {
            const date = new Date(Date.parse(e.date as string));
            return (
              <Grid item key={id}>
                <Divider style={{marginTop: '1em', marginBottom: '1em'}}/>
                <Typography variant="h5" style={{fontSize: '1em'}}>
                  <b>{e.author}</b> | {date.toLocaleString()}
                </Typography>
                {e.message}
              </Grid>
            )
          })
        }
      </Grid>
      <Divider style={{marginTop: '1em', marginBottom: '1em'}}/>
    </Container>
  );
};

export const isEmailValid = (email: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};