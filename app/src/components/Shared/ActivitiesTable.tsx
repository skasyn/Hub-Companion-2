import {UserPresence} from "../../types/types";
import React from "react";
import MaterialTable from "material-table";
import CheckIcon from "@material-ui/icons/Check";
import AlarmIcon from "@material-ui/icons/Alarm";
import ClearIcon from "@material-ui/icons/Clear";
import {toMultiline} from "../Student/SharingMakerUtils";

interface ActivitiesPageProps {
  activities: UserPresence[]

}

export const ActivitiesTable: React.FC<ActivitiesPageProps> = (props) => {
  return (
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
            } else if (diff > - 0.5) {
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
      data={props.activities}
      title=""
    />
  );
};