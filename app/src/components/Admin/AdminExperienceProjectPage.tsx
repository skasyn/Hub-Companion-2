import React from "react";
import {
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid, IconButton,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import {useMutation, useQuery} from "@apollo/react-hooks";
import {
  AdminGetExperienceProjectsData, AdminGetExperienceProjectsVars,
  ChangeStatusExperienceProjectData, ChangeStatusExperienceProjectVars, ExperienceProject,
} from "../../types/types";
import {useGlobalState} from "../../reducers/reducers";
import {GET_ADMIN_EXPERIENCE_PROJECT} from "../../query/query";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialTable from "material-table";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {MessageHistory, ReviewContainer} from "../Student/SharingMakerUtils";
import {CHANGE_STATUS_EXPERIENCE_PROJECT} from "../../query/mutation";
import EditIcon from "@material-ui/icons/Edit";

interface DialogChangeProps {
  experienceProject: ExperienceProject
  handleClose: () => void
}

const DialogChange: React.FC<DialogChangeProps> = (props) => {
  const [jwt] = useGlobalState('jwt');
  const [user] = useGlobalState('user');
  const [selectValue, setSelectValue] = React.useState(props.experienceProject.status);
  const [message, setMessage] = React.useState("");
  const [changeStatus] = useMutation<ChangeStatusExperienceProjectData, ChangeStatusExperienceProjectVars>(CHANGE_STATUS_EXPERIENCE_PROJECT);

  const sendChange = async () => {
    const dataSend = {
      id: props.experienceProject.id,
      author: user.name,
      message: message,
      status: selectValue,
    };
    await changeStatus({variables: {jwt: jwt, data: JSON.stringify(dataSend)}});
    props.handleClose();
  };

  if (props.experienceProject === undefined)
    return (<></>);
  return (
    <Container style={{width: '600px'}}>
      <DialogTitle>
        Edit: {props.experienceProject['title']}
      </DialogTitle>
      <DialogContent>
        <div>
          <DialogContentText>
            Select new status:
          </DialogContentText>
          <Grid container direction="row" spacing={2} justify="space-evenly">
            <Grid item>
              <Select
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value as number)}
                style={{minWidth: '200px'}}
              >
                <MenuItem value={0}>
                  <Chip style={{cursor: 'pointer'}} icon={<HourglassEmptyIcon/>} label="To be reviewed"/>
                </MenuItem>
                <MenuItem value={1}>
                  <Chip style={{cursor: 'pointer'}} icon={<CheckIcon/>} label="Accepted" color="primary"/>
                </MenuItem>
                <MenuItem value={3}>
                  <Chip style={{cursor: 'pointer', backgroundColor: '#37BB08'}} icon={<CheckIcon/>} label="Finished" color="primary"/>
                </MenuItem>
                <MenuItem value={2}>
                  <Chip style={{cursor: 'pointer'}} icon={<ClearIcon/>} label="Refused"  color="secondary"/>
                </MenuItem>
                }
              </Select>
            </Grid>
          </Grid>
        </div>
        <div style={{marginTop: '20px'}}>
          <DialogContentText>
            Message (optional):
          </DialogContentText>
          <TextField
            onChange={(e) => setMessage(e.target.value as string)} style={{width: '100%'}}
            multiline
            rows="4"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={sendChange} color="primary">
          Send
        </Button>
      </DialogActions>
    </Container>
  )
};

const ExperienceProjectList: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(-1);
  const [jwt] = useGlobalState('jwt');
  const { data, refetch } = useQuery<AdminGetExperienceProjectsData, AdminGetExperienceProjectsVars>(
    GET_ADMIN_EXPERIENCE_PROJECT,
    { variables: { jwt: jwt }}
  );

  const handleOpen = (id: number) => {
    setOpen(true);
    setSelected(id);
  };
  const handleClose = async () => {
    setOpen(false);
    setSelected(-1);
    await refetch();
  };
  if (data === undefined) {
    return (
      <Container maxWidth={false}>
        <CircularProgress/>
      </Container>
    );
  } else {
    return (
      <Container>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          {
            data.getAdminExperienceProjects !== undefined && data.getAdminExperienceProjects[selected] !== undefined &&
            <DialogChange experienceProject={data.getAdminExperienceProjects[selected]} handleClose={handleClose}/>
          }
        </Dialog>
        <MaterialTable
          columns={[
            {title: "Title", field: "title"},
            {title: "Student", field: "user"},
            {title: "Status", field: "status", render: (rowData) => {
              const status = rowData['status'];
              switch (status) {
                case 1: return (<Chip icon={<CheckIcon/>} label="Accepted" color="primary"/>);
                case 2: return (<Chip icon={<ClearIcon/>} label="Refused"  color="secondary"/>);
                case 3: return (<Chip icon={<CheckIcon/>} label="Finished" color="primary" style={{backgroundColor: '#37BB08'}}/>);
                default: return (<Chip icon={<HourglassEmptyIcon/>} label="To be reviewed"/>);
              }
            }},
            {title: "Manage", render: (rowData) => {
                return (
                  <IconButton aria-label="edit" onClick={(e) => {
                    e.stopPropagation();
                    handleOpen((rowData as any)['tableData']['id']);
                  }}>
                    <EditIcon/>
                  </IconButton>
                );
              }}
          ]}
          detailPanel={rowData => {
            return (
              <div style={{padding: "20px"}}>
                <MessageHistory data={rowData['messages']}/>
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
          data={data.getAdminExperienceProjects}
          title=""
        />
      </Container>
    );
  }
};

export const AdminExperienceProjectPage: React.FC = () => {
  return (
    <div>
      <ExperienceProjectList/>
    </div>
  );
};