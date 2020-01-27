import React from "react";
import MaterialTable from "material-table";
import {useQuery} from "@apollo/react-hooks";
import {ActivityData, ActivityVars } from "../../types/types";
import {GET_ACTIVITIES} from "../../query/query";
import { useGlobalState } from "../../reducers/reducers";

import {
  Container,
} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import AlarmIcon from '@material-ui/icons/Alarm';
import CircularProgress from '@material-ui/core/CircularProgress';

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

export const ActivitiesPage: React.FC = () => {
  const [jwt] = useGlobalState('jwt');
  const { data } = useQuery<ActivityData, ActivityVars>(
    GET_ACTIVITIES,
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
            {title: "Title", field: "activity.title"},
            {title: "Date", field: "activity.date", type: "date", defaultSort: "desc", render: (rowData) => {
              const date = new Date(rowData['activity']['begin'].toString());
              return <p>{date.toDateString()}</p>;
            }, customSort: (data1, data2) => {
              const date1 = new Date(data1['activity']['begin'].toString());
              const date2 = new Date(data2['activity']['begin'].toString());
              return date1.getTime() - date2.getTime();
            }},
            {title: "Type", field: "activity.type"},
            {title: "Presence", field: "presence", render: (rowData) => {
              const date = new Date(rowData['activity']['begin'].toString());
              const now = new Date(Date.now());
              const diff = (date.getTime() - now.getTime()) / (1000 * 3600 * 24);
              if (rowData.presence) {
                return <CheckIcon htmlColor="green"/>
              } else if (diff > - 1) {
                return <AlarmIcon htmlColor="orange"/>
              } else {
                return <ClearIcon htmlColor="red"/>
              }
            }}
          ]}
          detailPanel={rowData => {
            return (
              <div style={{padding: "20px"}}>
                {toMultiline(rowData['activity']['description'])}
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
          data={data.getUserActivities}
          title=""
        />
      </Container>
    );
  }
};