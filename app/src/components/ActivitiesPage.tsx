import React from "react";
import MaterialTable from "material-table";
import {useQuery} from "@apollo/react-hooks";
import {ActivityData, ActivityVars } from "../types/types";
import {GET_ACTIVITIES} from "../query/query";
import { useGlobalState } from "../reducers/reducers";

import {
  Container,
} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

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
  const [user] = useGlobalState('user');
  const { data } = useQuery<ActivityData, ActivityVars>(
    GET_ACTIVITIES,
    { variables: { email: user.email }}
  );

  if (data === undefined) {
    return (
      <Container>
        Loading...
      </Container>
    );
  } else {
    return (
      <Container>
        <MaterialTable
          columns={[
            {title: "Title", field: "activity.title"},
            {title: "Date", field: "activity.date", type: "date", defaultSort: "asc", render: (rowData) => {
              const date = new Date(rowData['activity']['date'].toString());
                return <p>{date.toDateString()}</p>;
            }},
            {title: "Type", field: "activity.type"},
            {title: "Presence", field: "presence", render: (rowData) => {
              const date = new Date(rowData['activity']['date'].toString());
              const now = new Date(Date.now());
              const diff = (date.getTime() - now.getTime()) / (1000 * 3600 * 24);
              if (rowData.presence) {
                return <CheckIcon htmlColor="green"/>
              } else if (diff > - 1) {
                return <CalendarTodayIcon/>
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
          data={data['userPresences']}
          title=""
        />
      </Container>
    );
  }
};