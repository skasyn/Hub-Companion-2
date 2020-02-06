import React, {useState} from "react";
import {
  Button, CircularProgress,
  Container,
  Grid,
  Table, TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@material-ui/core";

import "../../styles/index.css";
import {AccountCircle} from "@material-ui/icons";
import {AdminGetUserData, AdminGetUserVars, User, XpVars} from "../../types/types";
import {GET_ADMIN_USER_DATA} from "../../query/query";
import {useGlobalState} from "../../reducers/reducers";
import {useLazyQuery} from "@apollo/react-hooks";

interface UserInfosProps {
  data: {
    user: User,
    xp: XpVars,
    activitiesXp: XpVars,
    makerXp: XpVars,
    sharingXp: XpVars,
    experienceProjectXp: XpVars
  }
}

const UserInfos: React.FC<UserInfosProps> = (props) => {
  console.log(props.data);
  if (props.data === null || props.data.user === null) {
    return (
      <Container style={{marginTop: '5vh'}}>
        Student not found
      </Container>
    );
  }

  const xpData = [
    {name: 'Activities', xp: props.data.activitiesXp},
    {name: 'Makers', xp: props.data.makerXp},
    {name: 'Sharings', xp: props.data.sharingXp},
    {name: 'Experience Project', xp: props.data.experienceProjectXp},
    {name: 'Total', xp: props.data.xp}
  ];

  return (
    <Container style={{marginTop: '5vh'}}>
      <Grid container direction="row">
        <Grid item>
          <Typography variant="h5">
            {props.data.user.name}
          </Typography>
        </Grid>
      </Grid>
      <Table aria-label="xp-table">
        <TableHead>
          <TableRow>
            <TableCell align="left"   colSpan={3} className="table-border-right">Type</TableCell>
            <TableCell align="center" colSpan={4}>XP</TableCell>
            <TableCell align="right"  colSpan={3} className="table-border-left">Total</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left"   colSpan={3} className="table-border-right"/>
            <TableCell align="center" colSpan={2}>Got</TableCell>
            <TableCell align="center" colSpan={2}>Expected</TableCell>
            <TableCell align="left"   colSpan={3} className="table-border-left"/>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            xpData.map(row => (
              <TableRow key={row.name}>
                <TableCell colSpan={3} className="table-border-right">{row.name}</TableCell>
                <TableCell colSpan={2}>{row.xp.got}</TableCell>
                <TableCell colSpan={2}>{row.xp.pending}</TableCell>
                <TableCell colSpan={3} className="table-border-left">{(row.xp.got as number) + (row.xp.pending as number)}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Container>
  );
};

export const SearchStudentPage: React.FC = () => {
  const [jwt] = useGlobalState('jwt');
  const [student, setStudent] = useState('');
  const [searchStudent, { loading, data }] = useLazyQuery<AdminGetUserData, AdminGetUserVars>(GET_ADMIN_USER_DATA);

  const handleChange = (event: any) => {
    setStudent(event.target.value);
  };
  const search = () => {
    searchStudent({ variables: { jwt: jwt, email: student }});
  };

  return (
    <Container>
      <Container>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle/>
          </Grid>
          <Grid item xs={6}>
            <form onSubmit={(e) => {search(); e.preventDefault();}}>
              <TextField label="Search student" onChange={handleChange} style={{width: '100%'}}/>
            </form>
          </Grid>
          <Grid item>
            <Button onClick={search} variant="outlined">
              Search
            </Button>
          </Grid>
        </Grid>
        {
          loading === true && (
            <CircularProgress/>
          )
        }
        {
          data !== undefined && data['getAdminUserInfo'] !== undefined && (
            <UserInfos data={data['getAdminUserInfo']}/>
          )
        }
      </Container>
    </Container>
  );
};