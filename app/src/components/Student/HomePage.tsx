import React from "react";
import {
  Container, Grid,
  Typography
} from "@material-ui/core";
import { useGlobalState } from "../../reducers/reducers";

const getPlanXp = (xp: Number) => {
  if (xp === 0)
    return 10;
  if (xp === 1)
    return 30;
  if (xp === 2)
    return 50;
  if (xp === 3)
    return 80;
  return -1
};

const calc_percent = (nb: Number, max: number) => {
  let xp_percent = (nb as number) * 100 / max;
  if (xp_percent > 100)
    xp_percent = 100;
  if (max === -1)
    xp_percent = 0;
  return xp_percent
};

export const HomePage: React.FC = () => {
  const [user] = useGlobalState('user');

  if (!user)
    return (<div/>);
  let xp_percent = calc_percent(user.xp.got, getPlanXp(user.plan));
  let xp_percent_pending = calc_percent((user.xp.got as number) + (user.xp.pending as number), getPlanXp(user.plan));
  return (
    <Container>
      <Typography variant="h4" style={{fontWeight: 300}}>
        Hello {user.name}
      </Typography>
      <Container style={{paddingTop: '10vh'}}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
          <Grid item>
            <Typography style={{fontSize: "2em", fontWeight: 400, borderLeft: '0.5em solid #0277bd', paddingLeft: '0.5em'}}>{user.xp.got} acquired XP</Typography>
            <Typography style={{fontSize: "2em", fontWeight: 400, borderLeft: '0.5em solid #02a7dd', paddingLeft: '0.5em'}}>{user.xp.pending} potential XP </Typography>
            <Typography style={{fontSize: "2em", fontWeight: 400}}>Total: {(user.xp.got as number) + (user.xp.pending as number)}XP / {getPlanXp(user.plan)}XP </Typography>
          </Grid>
          {getPlanXp(user.plan) === -1 &&
          <Typography style={{fontSize: "2em", fontWeight: 400, color: "red"}}>You need to select a XP Goal</Typography>
          }
          {getPlanXp(user.plan) !== -1 &&
            <svg viewBox="0 0 100 100" style={{maxHeight: '50vh'}}>
              <path style={{strokeLinecap: "round", strokeWidth: 4, stroke: "lightGrey", fill: "none"}} d="M40,90 A40,40 0 1,1 60,90"/>
              <path style={{strokeLinecap: "round", strokeWidth: 5, stroke: "#02a7dd", strokeDasharray: 40 * 3.142 * 1.85, strokeDashoffset: (233-((xp_percent_pending) * 2.33)), fill:"none"}} d="M40,90 A40,40 0 1,1 60,90"/>
              <path style={{strokeLinecap: "round", strokeWidth: 6, stroke: "#0277bd", strokeDasharray: 40 * 3.142 * 1.85, strokeDashoffset: (233-((xp_percent) * 2.33)), fill:"none"}} d="M40,90 A40,40 0 1,1 60,90"/>
            </svg>
          }
        </Grid>
      </Container>
    </Container>
  );
};