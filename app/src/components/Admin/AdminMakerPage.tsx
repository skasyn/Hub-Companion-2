import React from "react";
import {
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import {useQuery} from "@apollo/react-hooks";
import {useMutation} from "@apollo/react-hooks";

import {
  AdminGetMakersData, AdminGetMakersVars, ChangeStatusMakerData, ChangeStatusMakerVars, Maker,
} from "../../types/types";
import {useGlobalState} from "../../reducers/reducers";
import {GET_ADMIN_MAKERS} from "../../query/query";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialTable from "material-table";
import {MessageHistory, ReviewContainer} from "../Student/SharingMakerUtils";

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import EditIcon from '@material-ui/icons/Edit';
import {CHANGE_STATUS_MAKER} from "../../query/mutation";

interface DialogChangeProps {
  maker: Maker
  handleClose: () => void
}

const DialogChange: React.FC<DialogChangeProps> = (props) => {
  const [jwt] = useGlobalState('jwt');
  const [user] = useGlobalState('user');
  const [selectValue, setSelectValue] = React.useState(props.maker.status);
  const [message, setMessage] = React.useState("");
  const [xp, setXp] = React.useState(props.maker.xp);
  const [changeStatus] = useMutation<ChangeStatusMakerData, ChangeStatusMakerVars>(CHANGE_STATUS_MAKER);

  const sendChange = async () => {
    const dataSend = {
      id: props.maker.id,
      author: user.name,
      message: message,
      status: selectValue,
      xp: xp
    };
    await changeStatus({variables: {jwt: jwt, data: JSON.stringify(dataSend)}});
    props.handleClose();
  };

  if (props.maker === undefined)
    return (<></>);
  return (
    <Container style={{width: '600px'}}>
      <DialogTitle>
        Edit: {props.maker['title']}
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
            <Grid item>
              <TextField
                label="xp"
                type="number"
                value={xp}
                onChange={(e) => {
                  if (e.target.value !== '')
                    setXp(parseInt(e.target.value));
                  else
                    setXp(0);
                }}
              />
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

const AdminMakerList: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(-1);
  const [jwt] = useGlobalState('jwt');
  const { data, refetch } = useQuery<AdminGetMakersData, AdminGetMakersVars>(
    GET_ADMIN_MAKERS,
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
            data.getAdminMakers !== undefined && data.getAdminMakers[selected] !== undefined &&
              <DialogChange maker={data.getAdminMakers[selected]} handleClose={handleClose}/>
          }
        </Dialog>
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
          detailPanel={(rowData) => {
            return (
              <div style={{padding: "20px"}}>
                <MessageHistory data={rowData['messages']}/>
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
          data={data.getAdminMakers}
          title=""
        />
      </Container>
    );
  }
};

export const AdminMakerPage: React.FC = () => {
  return (
    <div>
      <AdminMakerList/>
    </div>
  );
};