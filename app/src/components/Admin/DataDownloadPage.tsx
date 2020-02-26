import React from "react";
import {Button, Container, createStyles, Dialog, DialogActions, makeStyles, Theme} from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {useGlobalState} from "../../reducers/reducers";
import {useQuery} from "@apollo/react-hooks";
import {GetAllUserXpData, GetAllUserXpVars} from "../../types/types";
import {GET_ALL_USER_XP} from "../../query/query";
import CircularProgress from "@material-ui/core/CircularProgress";
import {CSVLink} from "react-csv";

const csvHeaders = [
  { label: "email", key: "email"},
  { label: "xp_acquired", key: "xp.got"},
  { label: "xp_potential", key: "xp.pending"}
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cloudButton: {
      marginRight: '0.5em'
    }
  })
);

interface DownloadModalProps {
  handleClose: () => void
}

const DownloadModal: React.FC<DownloadModalProps> = (props) => {
  const classes = useStyles();
  const [jwt] = useGlobalState('jwt');
  const { loading, error, data } = useQuery<GetAllUserXpData, GetAllUserXpVars>(
    GET_ALL_USER_XP,
    { variables: { jwt: jwt }}
  );

  if (loading) return (<Container style={{height: '55px', width: '300px'}}><CircularProgress style={{marginTop: '0.5em', marginLeft: '7em'}}/></Container>);
  if (error) return (<Container>Error</Container>);
  if (data === undefined || data.getAllUserXp === null) return (<Container>Error</Container>);
  const getFormattedDate = () => {
    const now = new Date(Date.now());

    const day = now.getDate().toLocaleString(undefined, {minimumIntegerDigits: 2});
    const month = (now.getMonth() + 1).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const year = now.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  return (
    <Container style={{height: '55px', width: '300px'}}>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <CSVLink
          data={data.getAllUserXp}
          headers={csvHeaders}
          filename={`hub_export_${getFormattedDate()}.csv`}
          style={{textDecoration: "none"}}
        >
          <Button variant="contained" color="primary">
            <CloudDownloadIcon className={classes.cloudButton}/>
            Download
          </Button>
        </CSVLink>
      </DialogActions>
    </Container>
  );
};

export const DataDownloadPage: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <Container>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DownloadModal handleClose={() => setOpen(false)}/>
      </Dialog>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <CloudDownloadIcon className={classes.cloudButton}/>
        Download
      </Button>
    </Container>
  );
};