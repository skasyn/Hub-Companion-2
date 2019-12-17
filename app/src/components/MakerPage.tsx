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
    delivery: '',
    organisation: '',
    resources: '',
    informations: '',
    co_workers: [{email: user.email.toString(), error: false}]
  });
  const formData = [
    {
      title: "Title and Description",
      canNext: () => { return data.title.length !== 0 && data.description.length !== 0},
      items: [
        {
          name: "title",
          label: "Title",
          text: "Name of the project.",
          value: data.title,
          multiline: false,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setData({...data, title: event.target.value})
        },
        {
          name: "description",
          label: "Description",
          text: "Context and goal of the project. Detail the origin of the project, its motivating elements and a description of its use.",
          value: data.description,
          multiline: true,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setData({...data, description: event.target.value})
        }
      ]
    },
    {
      title: "Technical description",
      canNext: () => { return data.functionalities.length !== 0 && data.technologies.length !== 0},
      items: [
        {
          name: "functionalities",
          label: "Functionalities",
          text: "List major functionalities of each part of the project. This list is commitment on your part and will serve to evaluate your project.",
          value: data.functionalities,
          multiline: true,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setData({...data, functionalities: event.target.value})
        },
        {
          name: "technologies",
          label: "Technologies",
          text: "Describe the technical and technological context (material, language, execution environment, resources, etc) in which the project fits.",
          value: data.technologies,
          multiline: true,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setData({...data, technologies: event.target.value})
        }
      ]
    },
    {
      title: "Organisation",
      canNext: () => { return data.delivery.length !== 0 && data.organisation.length !== 0},
      items: [
        {
          name: "delivery",
          label: "Delivery",
          text: "Detail each element (program, libraries, assets, etc) of the delivery and their integration (documentation, deployment, etc).",
          value: data.delivery,
          multiline: true,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setData({...data, delivery: event.target.value})
        },
        {
          name: "organisation",
          label: "Organisation",
          text: "Describe the planning of the project: parts, dependencies, division of work.",
          value: data.organisation,
          multiline: true,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setData({...data, organisation: event.target.value})
        }
      ]
    },
    {
      title: "Additional informations",
      canNext: () => { return data.resources.length !== 0 && data.informations.length !== 0},
      items: [
        {
          name: "resources",
          label: "Resources",
          text: "For example with an hardware project.",
          value: data.resources,
          multiline: true,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setData({...data, resources: event.target.value})
        },
        {
          name: "informations",
          label: "Complementary Informations",
          text: "",
          value: data.informations,
          multiline: true,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setData({...data, informations: event.target.value})
        }
      ]
    }
  ];
  const steps = formData.length + 2;

  const next = async () => {
    setActiveStep(activeStep.valueOf() + 1);
    if (activeStep.valueOf() === steps - 1) {
      const dataSend = {
        title: data.title,
        description: data.description,
        co_workers: data.co_workers.map((elem) => elem.email),
        functionalities: data.functionalities,
        technologies: data.technologies,
        delivery: data.delivery,
        organisation: data.organisation,
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
    if (step < formData.length) {
      return formData[step].canNext();
    }
    if (step === formData.length) {
      let emailValid = true;
      data.co_workers.forEach((value) => {
        if (emailValid)
          emailValid = isEmailValid(value.email);
      });
      return emailValid;
    }
    if (step === formData.length + 1)
      return true;
  };
  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
        {
          formData.map((elem, elemId) => {
            return (
              <Step key={elemId.toString()}>
                <StepLabel>
                  {elem.title}
                </StepLabel>
                <StepContent>
                  {
                    elem.items.map((item, itemId) => {
                      return (
                        <TextField
                          key={itemId.toString()}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id={item.name}
                          label={item.label}
                          helperText={item.text}
                          name={item.name}
                          autoFocus={itemId === 0}
                          defaultValue={item.value}
                          multiline={item.multiline}
                          onChange={item.onChange}
                        />
                      );
                    })
                  }
                </StepContent>
              </Step>
            )
          })
        }
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
            {
              formData.map((elem, elemId) => {
                return (
                  <div key={elemId.toString()}>
                    {
                      elem.items.map((item, itemId) => {
                        return (
                          <ReviewContainer key={itemId.toString()} title={item.label} data={item.value}/>
                        );
                      })
                    }
                  </div>
                );
              })
            }
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
            {title: "XP", field: "xp", render: (rowData) => {
                if (rowData['xp'] !== 0) {
                  return (<p>{rowData['xp']}</p>);
                } else {
                  return (<p>N/A</p>);
                }
            }},
            {title: "Status", field: "status", render: (rowData) => {
              const status = rowData['status'];
              switch (status) {
                case 1: return (<Chip icon={<CheckIcon/>} label="Accepted" color="primary"/>);
                case 2: return (<Chip icon={<ClearIcon/>} label="Refused"  color="secondary"/>);
                case 3: return (<Chip icon={<CheckIcon/>} label="Finished" color="primary" style={{backgroundColor: '#37BB08'}}/>);
                default: return (<Chip icon={<HourglassEmptyIcon/>} label="To be reviewed"/>);
              }
            }}
          ]}
          detailPanel={(rowData) => {
            return (
              <div style={{padding: "20px"}}>
                <ReviewContainer title="Description" data={rowData['description']}/>
                <ReviewContainer title="Functionalities" data={rowData['functionalities']}/>
                <ReviewContainer title="Technologies" data={rowData['technologies']}/>
                <ReviewContainer title="Delivery" data={rowData['delivery']}/>
                <ReviewContainer title="Organisation" data={rowData['organisation']}/>
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