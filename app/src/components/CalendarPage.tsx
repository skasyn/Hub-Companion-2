import React from "react";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/core/main.css";
import "@fullcalendar/timegrid/main.css";
import {useQuery} from "@apollo/react-hooks";
import {Activity, ActivityData, ActivityVars, AllActivitiesData} from "../types/types";
import {GET_ACTIVITIES, GET_ALL_ACTIVITIES} from "../query/query";
import {Container} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useGlobalState} from "../reducers/reducers";

export const CalendarPage: React.FC = () => {
  const [user] = useGlobalState('user');
  const { data } = useQuery<ActivityData, ActivityVars>(
    GET_ACTIVITIES,
    { variables: { email: user.email }}
  );
  const dataActivities = useQuery<AllActivitiesData>(
    GET_ALL_ACTIVITIES
  )['data'];

  if (data === undefined || dataActivities === undefined) {
    return (
      <Container maxWidth={false}>
        <CircularProgress/>
      </Container>
    );
  } else {
    const activities: Activity[] = dataActivities['activities'];
    const events1 = data['userPresences'].map((event) => {
      if (event.activity.begin !== event.activity.end) {
        return {
          title: event.activity.title,
          start: new Date(event.activity.begin.toString()),
          end: new Date(event.activity.end.toString()),
          id: event.activity.code
        }
      } else {
        return {
          title: event.activity.title,
          start: new Date(event.activity.begin.toString()),
          id: event.activity.code
        }
      }
    });
    const events2 = activities.map((event) => {
      if (event.begin !== event.end) {
        return {
          title: event.title,
          start: new Date(event.begin.toString()),
          end: new Date(event.end.toString()),
          color: "grey",
          id: event.code
        }
      } else {
        return {
          title: event.title,
          start: new Date(event.begin.toString()),
          color: "grey",
          id: event.code
        }
      }
    });
    const events = (events1.concat(events2)).filter((event, index, self) => {
      return index === self.findIndex((t) => (
        t.id === event.id
      ))
    });
    return (
      <FullCalendar
        defaultView="timeGridWeek"
        plugins={[timeGridPlugin]}
        events={events}
        height={750}
        minTime={"08:00:00"}
        slotEventOverlap={false}
      />
    );
  }
};