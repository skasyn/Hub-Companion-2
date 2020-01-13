import React, {useState} from "react";
import {
  Container,
  Typography, withStyles,
  Select, Divider,
} from "@material-ui/core";
import {useMutation} from "@apollo/react-hooks";
import {useGlobalState} from "../reducers/reducers";
import { dispatch } from "../reducers/reducers";
import {ChangePlanData, ChangePlanVars, ChangeYearData, ChangeYearVars} from "../types/types";
import {CHANGE_PLAN, CHANGE_YEAR} from "../query/mutation";

const SpacedContainer = withStyles({
  root: {
    padding: '20px',
  },
})(Container);

export const SettingsPage: React.FC = () => {
  const [jwt] = useGlobalState('jwt');
  const [user] = useGlobalState('user');
  const [year, setYear] = useState(user.year);
  const [plan, setPlan] = useState(user.plan);
  const [changeYear] = useMutation<ChangeYearData, ChangeYearVars>(CHANGE_YEAR);
  const [changePlan] = useMutation<ChangePlanData, ChangePlanVars>(CHANGE_PLAN);

  const applyChangeYear = async (event: React.ChangeEvent<{value: unknown}>) => {
    const year = Number(event.target.value);
    const response = await changeYear({variables: {jwt: jwt, year: year}});
    if (response !== undefined && response.data !== undefined && response.data.setYear) {
      user.year = year;
      dispatch({type: 'updateUser', user: user});
      setYear(year);
    }
  };
  const applyChangePlan = async (event: React.ChangeEvent<{value: unknown}>) => {
    const plan = Number(event.target.value);
    const response = await changePlan({variables: {jwt: jwt, plan: plan}});
    if (response !== undefined && response.data !== undefined && response.data.setPlan) {
      user.plan = plan as Number;
      dispatch({type: 'updateUser', user: user});
      setPlan(plan);
    }
  };
  return (
    <Container>
      <Typography variant="h5">
        Settings
      </Typography>
      <SpacedContainer>
        <Typography variant="h6">
          Name
        </Typography>
        {user.name}
      </SpacedContainer>
      <SpacedContainer>
        <Typography variant="h6">
          Email
        </Typography>
        {user.email}
      </SpacedContainer>
      <Divider/>
      <SpacedContainer>
        <Typography variant="h6">
          Year
        </Typography>
        <Select
          native
          value={year}
          onChange={applyChangeYear}
        >
          { year === 0 && <option value={0}>N/A</option>}
          <option value={1}>1st Year</option>
          <option value={2}>2nd Year</option>
          <option value={3}>3rd Year</option>
        </Select>
      </SpacedContainer>
      <SpacedContainer>
        <Typography variant="h6">
          Xp Goal
        </Typography>
        <Select
          native
          value={plan}
          onChange={applyChangePlan}
        >
          { plan === -1 && <option value={-1}>N/A</option>}
          <option value={0}>1 Credit: 10xp</option>
          <option value={1}>3 Credits: 30xp</option>
          <option value={2}>5 Credits: 50xp</option>
          <option value={3}>8 Credits: 80xp</option>
        </Select>
      </SpacedContainer>
      <Typography variant="caption">
        Note: Those values are used only in this app. It will not affect the credit plan you have chosen on epitech intranet
      </Typography>
    </Container>
  );
};