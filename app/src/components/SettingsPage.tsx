import React from "react";
import {
  Container,
  Typography, withStyles,
  Select
} from "@material-ui/core";
import {useGlobalState} from "../reducers/reducers";

const SpacedContainer = withStyles({
  root: {
    padding: '20px',
  },
})(Container);

export const SettingsPage: React.FC = () => {
  const [user] = useGlobalState('user');

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
      <SpacedContainer>
        <Typography variant="h6">
          Year
        </Typography>
        <Select
          native
          value={user.year}
          onChange={(event: any) => {console.log(event.target.value);}}
        >
          { user.year === 0 && <option value={0}>N/A</option>}
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
          value={user.plan}
          onChange={(event: any) => {console.log(event.target.value);}}
        >
          { user.plan === -1 && <option value={-1}>N/A</option>}
          <option value={0}>1 Credit: 10xp</option>
          <option value={1}>3 Credits: 30xp</option>
          <option value={2}>5 Credits: 50xp</option>
          <option value={3}>8 Credits: 80xp</option>
        </Select>
      </SpacedContainer>
    </Container>
  );
};