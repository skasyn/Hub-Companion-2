import React from "react";
import {
  Chip, Container,
} from "@material-ui/core";

import {useQuery} from "@apollo/react-hooks";
import {
  AdminGetSharingsData,
  AdminGetSharingsVars
} from "../../types/types";
import {useGlobalState} from "../../reducers/reducers";
import {GET_ADMIN_SHARINGS} from "../../query/query";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialTable from "material-table";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {toMultiline} from "../Student/SharingMakerUtils";

const SharingList: React.FC = () => {
  const [jwt] = useGlobalState('jwt');
  const { data } = useQuery<AdminGetSharingsData, AdminGetSharingsVars>(
    GET_ADMIN_SHARINGS,
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
            }}
          ]}
          detailPanel={rowData => {
            return (
              <div style={{padding: "20px"}}>
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