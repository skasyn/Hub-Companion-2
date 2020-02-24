import React from "react";
import {
  Chip, Container, IconButton, Modal,
} from "@material-ui/core";

import {useQuery} from "@apollo/react-hooks";
import {
  AdminGetMakersData, AdminGetMakersVars,
} from "../../types/types";
import {useGlobalState} from "../../reducers/reducers";
import {GET_ADMIN_MAKERS} from "../../query/query";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialTable from "material-table";
import {ReviewContainer} from "../Student/SharingMakerUtils";

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import EditIcon from '@material-ui/icons/Edit';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const AdminMakerList: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [jwt] = useGlobalState('jwt');
  const { data } = useQuery<AdminGetMakersData, AdminGetMakersVars>(
    GET_ADMIN_MAKERS,
    { variables: { jwt: jwt }}
  );

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        <Modal
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle}>
            <h2>
              Hello
            </h2>
          </div>
        </Modal>
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
            {title: "Manage", render: () => {
              return (
                <IconButton aria-label="edit" onClick={(e) => {
                  e.stopPropagation();
                  console.log('yes');
                  handleOpen();
                }}>
                  <EditIcon/>
                </IconButton>
              );
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