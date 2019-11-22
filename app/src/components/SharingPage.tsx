import React, { useState } from "react";
import {
  Button,
  createStyles, Fab, Grid, List, ListItem, ListItemText,
  makeStyles,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Theme, Typography
} from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useMutation } from "@apollo/react-hooks";
import {SubmitSharingData, SubmitSharingVars} from "../types/types";
import {SUBMIT_SHARING} from "../query/mutation";
import {useGlobalState} from "../reducers/reducers";

interface ButtonProps {
  activeStep: number,
  setActiveStep: (index: number) => void,
  canNext: boolean
}

const useStyles = makeStyles((theme: Theme) =>
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
    }
  }),
);

const toMultiline = (description: String) => {
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

export const SharingPage: React.FC = () => {
  const [jwt] = useGlobalState('jwt');
  const [user] = useGlobalState('user');
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emails, setEmail] = useState([{email: user.email.toString(), error: false}]);
  const [submitSharing] = useMutation<SubmitSharingData, SubmitSharingVars>(SUBMIT_SHARING);
  const [result, setResult] = useState(0);

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const updateDescription = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setDescription(event.target.value);
  };
  const emailIsValid = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };
  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>, index: number) =>{
    const isError = !emailIsValid(event.target.value);
    let newEmail = [...emails];
    newEmail[index].email = event.target.value;
    newEmail[index].error = isError;
    setEmail(newEmail);
    setActiveStep(activeStep);
  };
  const addEmail = () => {
    setEmail(oldEmail => [...oldEmail, {email: '', error: false}]);
  };
  const removeEmail = () => {
    if (emails.length === 1)
      return;
    let newEmail = [...emails];
    newEmail.pop();
    setEmail(newEmail);
  };
  const finish = async () => {
    setActiveStep(activeStep.valueOf() + 1);
    if (activeStep.valueOf() === 2) {
      const dataSend = {
        title: title,
        description: description,
        co_workers: emails.map((elem) => elem.email),
      };
      const response = await submitSharing({variables: {jwt: jwt, data: JSON.stringify(dataSend)}});
      if (response !== undefined && response.data !== undefined && response.data.submitSharing === true)
        setResult(1);
      else
        setResult(2);
    }
  };
  const canNext = (step: number) => {
    let titleDescription = title.length !== 0 && description.length !== 0;
    if (step === 0)
      return titleDescription;
    let emailsValid = true;
    emails.forEach((value) => {
      if (emailsValid) {
        emailsValid = emailIsValid(value.email);
      }
    });
    return (title.length !== 0 && description.length !== 0 && emailsValid);
  };
  const resultRender = () => {
    if (result === 0) return (<div>Processing ...</div>);
    if (result === 1) return (<div>Submitted !</div>);
    if (result === 2) return (<div>Error while submitting</div>);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>
            Title and Description
          </StepLabel>
          <StepContent>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              defaultValue={title}
              onChange={updateTitle}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              multiline={true}
              defaultValue={description}
              onChange={updateDescription}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            Co-Workers
          </StepLabel>
          <StepContent>
            {
              emails.map((value, index) => {
                return (
                  <TextField
                    key={index}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={(index === 0) ? "Group Leader" : `Co-Worker ${index}`}
                    name="email"
                    autoFocus
                    defaultValue={value.email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateEmail(event, index)}
                    error={value.error}
                    disabled={(index === 0) ? true : false}
                  />
                );
              })
            }
            <Grid container spacing={2} justify="flex-end">
              <Grid item>
              <Fab color="primary" aria-label="add" onClick={addEmail}>
                <AddIcon />
              </Fab>
              </Grid>
              <Grid item>
              <Fab color="secondary" aria-label="delete" onClick={removeEmail}>
                <RemoveIcon />
              </Fab>
              </Grid>
            </Grid>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            Review your Request
          </StepLabel>
          <StepContent>
            <div className={classes.reviewContainer}>
              <Typography variant="h6">
                Title
              </Typography>
              <Typography variant="body2">
                {title}
              </Typography>
            </div>
            <div className={classes.reviewContainer}>
              <Typography variant="h6">
                Description
              </Typography>
              <Typography variant="body2">
                {toMultiline(description)}
              </Typography>
            </div>
            <div className={classes.reviewContainer}>
              <Typography variant="h6">
                Co-Workers
              </Typography>
              <List>
                {
                  emails.map((value, index) => {
                    return (
                      <ListItem key={index}>
                        <ListItemText primary={(index === 0) ? "Group Leader" : `Co-Worker ${index}`} secondary={value.email}/>
                      </ListItem>
                    );
                  })
                }
              </List>
            </div>
          </StepContent>
        </Step>
      </Stepper>
      <div className={classes.actionsContainer}>
        {
          activeStep < 3 ? (
          <div>
          <Button
          disabled={activeStep === 0}
          onClick={() => setActiveStep(activeStep.valueOf() - 1)}
          className={classes.button}
          >
          Back
          </Button>
          <Button
          variant="contained"
          color="primary"
          onClick={finish}
          disabled={!canNext(activeStep)}
          className={classes.button}
          >
          { activeStep !== 2 ? 'Next' : 'Finish' }
          </Button>
          </div>
          ) : (
            <div>
              {
                resultRender()
              }
            </div>
          )
        }
      </div>
    </div>
  );
};