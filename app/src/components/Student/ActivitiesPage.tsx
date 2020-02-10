import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {ActivityData, ActivityVars} from "../../types/types";
import {GET_ACTIVITIES} from "../../query/query";
import { useGlobalState } from "../../reducers/reducers";

import {
  Container,
} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import {ActivitiesTable} from "../Shared/ActivitiesTable";

export const ActivitiesPage: React.FC = () => {
  const [jwt] = useGlobalState('jwt');
  const { data } = useQuery<ActivityData, ActivityVars>(
    GET_ACTIVITIES,
    { variables: { jwt: jwt }}
  );

  if (data === undefined || data.getUserActivities === undefined) {
    return (
      <Container maxWidth={false}>
        <CircularProgress/>
      </Container>
    );
  } else {
    return (
      <Container>
        <ActivitiesTable activities={data.getUserActivities}/>
      </Container>
    );
  }
};