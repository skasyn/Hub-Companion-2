import React, { useState } from "react";
import {
  Button, Chip, Container,
  Fab, Grid, List, ListItem, ListItemText,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {
  SubmitMakerData, SubmitMakerVars,
  UserMakerData, UserMakerVars,
} from "../types/types";
import {SUBMIT_MAKER} from "../query/mutation";
import {useGlobalState} from "../reducers/reducers";
import {GET_USER_MAKER} from "../query/query";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialTable from "material-table";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {ReviewContainer, useSharingMakerStyles, isEmailValid} from "./SharingMakerUtils";

const MakerForm: React.FC = () => {
  const steps = 5;
  const [jwt] = useGlobalState('jwt');
  const [user] = useGlobalState('user');
  const classes = useSharingMakerStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState(0);
  const [submitMaker] = useMutation<SubmitMakerData, SubmitMakerVars>(SUBMIT_MAKER);

  const [data, setData] = useState({
    title: '',
    description: '',
    functionalities: '',
    technologies: '',
    resources: '',
    informations: '',
    co_workers: [{email: user.email.toString(), error: false}]
  });

  const next = async () => {
    setActiveStep(activeStep.valueOf() + 1);
    if (activeStep.valueOf() === steps - 1) {
      const dataSend = {
        title: data.title,
        description: data.description,
        co_workers: data.co_workers.map((elem) => elem.email),
        functionalities: data.functionalities,
        technologies: data.technologies,
        resources: data.resources,
        informations: data.informations
      };
      const response = await submitMaker({variables: {jwt: jwt, data: JSON.stringify(dataSend)}});
      if (response !== undefined && response.data !== undefined && response.data.submitMaker)
        setResult(1);
      else
        setResult(2);
    }
  };
  const canNext = (step: number) => {
    if (step === 0)
      return data.title.length !== 0 && data.description.length !== 0;
    if (step === 1)
      return data.functionalities.length !== 0 && data.technologies.length !== 0;
    if (step === 2)
      return data.resources.length !== 0 && data.informations.length !== 0;
    if (step === 3) {
      let emailValid = true;
      data.co_workers.forEach((value) => {
        if (emailValid)
          emailValid = isEmailValid(value.email);
      });
      return emailValid;
    }
    if (step === 4)
      return true;
  };
  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>, index: number) =>{
    const isError = !isEmailValid(event.target.value);
    let newEmail = [...data.co_workers];
    newEmail[index].email = event.target.value;
    newEmail[index].error = isError;
    setData({...data, co_workers: newEmail});
    setActiveStep(activeStep);
  };
  const removeEmail = () => {
    if (data.co_workers.length === 1)
      return;
    let newEmail = [...data.co_workers];
    newEmail.pop();
    setData({...data, co_workers: newEmail});
  };
  const resultRender = () => {
    if (result === 0) return (<StepLabel>Processing ...</StepLabel>);
    if (result === 1) return (<StepLabel completed={true}>Submitted !</StepLabel>);
    if (result === 2) return (<StepLabel error={true}>Error while submitting</StepLabel>);
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
              defaultValue={data.title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, title: event.target.value})}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              multiline
              defaultValue={data.description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, description: event.target.value})}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            Technical description
          </StepLabel>
          <StepContent>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="functionalities"
              label="Functionalities"
              name="functionalities"
              autoFocus
              multiline
              defaultValue={data.functionalities}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, functionalities: event.target.value})}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="technologies"
              label="Technologies"
              name="technologies"
              multiline
              defaultValue={data.technologies}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, technologies: event.target.value})}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            Additional informations
          </StepLabel>
          <StepContent>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="resources"
              label="Resources"
              name="resources"
              autoFocus
              multiline
              defaultValue={data.resources}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, resources: event.target.value})}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="informations"
              label="Informations"
              name="informations"
              multiline
              defaultValue={data.informations}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({...data, informations: event.target.value})}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            Co-Workers
          </StepLabel>
          <StepContent>
            {
              data.co_workers.map((value, index) => {
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
                    disabled={(index === 0)}
                  />
                );
              })
            }
            <Grid container spacing={2} justify="flex-end">
              <Grid item>
              <Fab color="primary" aria-label="add" onClick={() => setData({...data, co_workers: [...data.co_workers, {email: '', error: false}]})}>
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
            <ReviewContainer title="Title" data={data.title}/>
            <ReviewContainer title="Description" data={data.description}/>
            <ReviewContainer title="Functionalities" data={data.functionalities}/>
            <ReviewContainer title="Technologies" data={data.technologies}/>
            <ReviewContainer title="Resources" data={data.resources}/>
            <ReviewContainer title="Informations" data={data.informations}/>
            <div className={classes.reviewContainer}>
              <Typography variant="h6">
                Co-Workers
              </Typography>
              <List>
                {
                  data.co_workers.map((value, index) => {
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
        <Step>
          {
            resultRender()
          }
        </Step>
      </Stepper>
      <div className={classes.actionsContainer}>
      {
        activeStep < steps ? (
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
        onClick={next}
        disabled={!canNext(activeStep)}
        className={classes.button}
        >
        { activeStep !== steps - 1 ? 'Next' : 'Finish' }
        </Button>
        </div>
        ) : (
          <div>
          </div>
        )
      }
      </div>
    </div>
  );
};

const MakerList: React.FC = () => {
  const [jwt] = useGlobalState('jwt');
  const { data } = useQuery<UserMakerData, UserMakerVars>(
    GET_USER_MAKER,
    { variables: { jwt: jwt }}
  );

  if (data === undefined) {
    return (
      <Container maxWidth={false}>
        <CircularProgress/>
      </Container>
    );
  } else {
    return (
      <Container>
        <MaterialTable
          columns={[
            {title: "Title", field: "title"},
            {title: "Co-Workers", field: "co_workers", render: (rowData) => {
              return (<p>{rowData['co_workers'].join(' - ')}</p>)
            }},
            {title: "Status", field: "status", render: (rowData) => {
              const status = rowData['status'];
              if (status === 0) {
                return (
                  <Chip
                    icon={<HourglassEmptyIcon/>}
                    label="To be reviewed"
                  />
                );
              } else if (status === 1) {
                return (
                  <Chip
                    icon={<CheckIcon/>}
                    label="Accepted"
                    color="primary"
                  />
                );
              } else {
                return (
                  <Chip
                    icon={<ClearIcon/>}
                    label="Refused"
                    color="secondary"
                  />
                );
              }
            }}
          ]}
          detailPanel={(rowData) => {
            return (
              <div style={{padding: "20px"}}>
                <ReviewContainer title="Description" data={rowData['description']}/>
                <ReviewContainer title="Functionalities" data={rowData['functionalities']}/>
                <ReviewContainer title="Technologies" data={rowData['technologies']}/>
                <ReviewContainer title="Resources" data={rowData['resources']}/>
                <ReviewContainer title="Informations" data={rowData['informations']}/>
              </div>
            );
          }}
          onRowClick={
            (event, rowData, togglePanel) => {
              if (togglePanel !== undefined) {
                togglePanel()
              }
            }
          }
          options={{
            sorting: true,
            pageSize: 10
          }}
          data={data.getUserMaker}
          title=""
        />
      </Container>
    );
  }
};

export const MakerPage: React.FC = () => {
  return (
    <div>
      <MakerForm/>
      <MakerList/>
    </div>
  );
};