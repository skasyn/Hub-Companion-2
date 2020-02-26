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
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import {useMutation, useQuery} from "@apollo/react-hooks";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {
  AdminGetSharingsData,
  AdminGetSharingsVars,
  ChangeStatusSharingData,
  ChangeStatusSharingVars,
  Sharing
} from "../../types/types";
import {useGlobalState} from "../../reducers/reducers";
import {GET_ADMIN_SHARINGS} from "../../query/query";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialTable from "material-table";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {MessageHistory, toMultiline} from "../Student/SharingMakerUtils";
import EditIcon from "@material-ui/icons/Edit";
import {CHANGE_STATUS_MAKER, CHANGE_STATUS_SHARING} from "../../query/mutation";
import DateFnsUtils from "@date-io/date-fns";

interface DialogChangeProps {
  sharing: Sharing
  handleClose: () => void
}

const DialogChange: React.FC<DialogChangeProps> = (props) => {
  const [jwt] = useGlobalState('jwt');
  const [user] = useGlobalState('user');
  const [selectValue, setSelectValue] = React.useState(props.sharing.status);
  const [message, setMessage] = React.useState("");
  const [xp, setXp] = React.useState(props.sharing.xp);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(props.sharing.date === '1970-01-01T00:00:00.000Z' ? null : new Date(props.sharing.date as string));
  const [changeStatus] = useMutation<ChangeStatusSharingData, ChangeStatusSharingVars>(CHANGE_STATUS_SHARING);

  const sendChange = async () => {
    const dataSend = {
      id: props.sharing.id,
      author: user.name,
      message: message,
      status: selectValue,
      xp: xp,
      date: (selectedDate !== null) ? selectedDate.toISOString() : '',
    };
    await changeStatus({variables: {jwt: jwt, data: JSON.stringify(dataSend)}});
    props.handleClose();
  };

  if (props.sharing === undefined)
    return (<></>);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container style={{width: '600px'}}>
        <DialogTitle>
          Edit: {props.sharing['title']}
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
              <Grid item>
                  <KeyboardDateTimePicker
                    autoOk
                    clearable
                    ampm={false}
                    value={selectedDate}
                    helperText="Date for sharing"
                    disablePast
                    format="dd/MM/yyyy hh:mm"
                    onChange={(d: Date | null) => { if (d !== null) { setSelectedDate(new Date(d)) }}}
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
    </MuiPickersUtilsProvider>
  )
};

const SharingList: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(-1);
  const [jwt] = useGlobalState('jwt');
  const { data } = useQuery<AdminGetSharingsData, AdminGetSharingsVars>(
    GET_ADMIN_SHARINGS,
    { variables: { jwt: jwt }}
  );

  const handleOpen = (id: number) => {
    setOpen(true);
    setSelected(id);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(-1);
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
            data.getAdminSharings !== undefined && data.getAdminSharings[selected] !== undefined &&
            <DialogChange sharing={data.getAdminSharings[selected]} handleClose={handleClose}/>
          }
        </Dialog>
        <MaterialTable
          columns={[
            {title: "Title", field: "title"},
            {title: "Co-Workers", field: "co_workers", render: (rowData) => {
              return (<p>{rowData['co_workers'].join(' - ')}</p>)
            }},
            {title: "Date", field: "date", type: "date", render: (rowData) => {
              const date = new Date(rowData['date'].toString());
              if (date.getTime() === 0)
                return (<p>N/A</p>);
              else
                return (<p>{date.toDateString()}</p>);
            }, customSort: (data1, data2) => {
              const date1 = new Date(data1['date'].toString());
              const date2 = new Date(data2['date'].toString());
              return date1.getTime() - date2.getTime();
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
          detailPanel={rowData => {
            return (
              <div style={{padding: "20px"}}>
                <MessageHistory data={rowData['messages']}/>
                {toMultiline(rowData['description'])}
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
          data={data.getAdminSharings}
          title=""
        />
      </Container>
    );
  }
};

export const AdminSharingPage: React.FC = () => {
  return (
    <div>
      <SharingList/>
    </div>
  );
};