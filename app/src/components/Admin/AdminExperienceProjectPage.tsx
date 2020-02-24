import React from "react";
import {
  Chip, Container,
} from "@material-ui/core";

import {useQuery} from "@apollo/react-hooks";
import {
  AdminGetExperienceProjectsData, AdminGetExperienceProjectsVars,
} from "../../types/types";
import {useGlobalState} from "../../reducers/reducers";
import {GET_ADMIN_EXPERIENCE_PROJECT} from "../../query/query";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialTable from "material-table";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {ReviewContainer} from "../Student/SharingMakerUtils";

const ExperienceProjectList: React.FC = () => {
  const [jwt] = useGlobalState('jwt');
  const { data } = useQuery<AdminGetExperienceProjectsData, AdminGetExperienceProjectsVars>(
    GET_ADMIN_EXPERIENCE_PROJECT,
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