import React from "react";
import {
  Button,
  Container,
  Typography
} from "@material-ui/core";
import { useGlobalState } from "../reducers/reducers";
import { useMutation } from "@apollo/react-hooks";
import { REFRESH } from "../query/mutation";

import LockOpenIcon from '@material-ui/icons/LockOpen';

export const HomePage: React.FC = () => {
  const [user] = useGlobalState('user');
  const [refresh] = useMutation(REFRESH);

  return (
    <Container>
      <Typography>
        Hello {user.name}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => { refresh(); }}>
        Refresh
        <LockOpenIcon />
      </Button>
    </Container>
  );
};