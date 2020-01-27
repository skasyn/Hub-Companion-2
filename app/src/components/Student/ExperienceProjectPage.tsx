import React, { useState } from "react";
import {
  Button, Chip, Container,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
} from "@material-ui/core";

import {useMutation, useQuery} from "@apollo/react-hooks";
import {
  SubmitExperienceProjectData, SubmitExperienceProjectVars,
  UserExperienceProjectData, UserExperienceProjectVars,
} from "../../types/types";
import {SUBMIT_EXPERIENCE_PROJECT} from "../../query/mutation";
import {useGlobalState} from "../../reducers/reducers";
import {GET_USER_EXPERIENCE_PROJECT} from "../../query/query";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialTable from "material-table";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {ReviewContainer, useSharingMakerStyles} from "./SharingMakerUtils";

const ExperienceProjectForm: React.FC = () => {
  const [jwt] = useGlobalState('jwt');
  const [user] = useGlobalState('user');
  const classes = useSharingMakerStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState(0);
  const [submitExperienceProject] = useMutation<SubmitExperienceProjectData, SubmitExperienceProjectVars>(SUBMIT_EXPERIENCE_PROJECT);

  const [data, setData] = useState({
    title: '',
    description: '',
    competencies: '',
    informations: ''
  });
  const formData = [
    {
      title: "Experience Project",
      canNext: () => { return data.title.length !== 0 && data.description.length !== 0},
      items: [
        {
          name: "title",
          label: "Title",
          text: "Name of the technology learned / project",
          value: data.title,
          multiline: false,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setData({...data, title: event.target.value})
        },
        {
          name: "description",
          label: "Description",
          text: "Description of your experience project",
          value: data.description,
          multiline: true,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setData({...data, description: event.target.value})
        },
      ]
    },
    {
      title: "Additional informations",
      canNext: () => { return data.competencies.length !== 0 && data.informations.length !== 0},
      items: [
        {
          name: "competencies",
          label: "Competencies",
          text: "What can this project learn you ?",
          multiline: true,
          value: data.competencies,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setData({...data, competencies: event.target.value})
        },
        {
          name: "informations",
          label: "Complementary Informations",
          multiline: true,
          value: data.informations,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setData({...data, informations: event.target.value})
        }
      ]
    }
  ];
  const steps = formData.length + 1;

  const next = async () => {
    setActiveStep(activeStep.valueOf() + 1);
    if (activeStep.valueOf() === steps - 1) {
      const dataSend = {
        title: data.title,
        description: data.description,
        competencies: data.competencies,
        informations: data.informations,
        user: user.email
      };
      const response = await submitExperienceProject({variables: {jwt: jwt, data: JSON.stringify(dataSend)}});
      if (response !== undefined && response.data !== undefined && response.data.submitExperienceProject)
        setResult(1);
      else
        setResult(2);
    }
  };
  const canNext = (step: number) => {
    if (step < formData.length) {
      return formData[step].canNext();
    }
    if (step === formData.length)
      return true;
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

const ExperienceProjectList: React.FC = () => {
  const [jwt] = useGlobalState('jwt');
  const { data } = useQuery<UserExperienceProjectData, UserExperienceProjectVars>(
    GET_USER_EXPERIENCE_PROJECT,
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
          detailPanel={rowData => {
            return (
              <div style={{padding: "20px"}}>
                <ReviewContainer title="Description" data={rowData['description']}/>
                <ReviewContainer title="Competencies" data={rowData['competencies']}/>
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
          data={data.getUserExperienceProjects}
          title=""
        />
      </Container>
    );
  }
};

export const ExperienceProjectPage: React.FC = () => {
  return (
    <div>
      <ExperienceProjectForm/>
      <ExperienceProjectList/>
    </div>
  );
};