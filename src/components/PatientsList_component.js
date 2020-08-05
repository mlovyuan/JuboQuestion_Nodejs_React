import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// For Grid
import Grid from '@material-ui/core/Grid';
// For Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// For Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// For Data
import axios from "axios";
import OrderList from './OrdersList_component';
import ShowTextField from './AddOrderInput';

export default function PatientsList(){
    return(
        <div>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <TableWithDialog />
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </div>
    )
}

function TableWithDialog(){
    // Table ==========================================================
    const useStyles = makeStyles((theme) => ({
        table: {
          minWidth: 650,
        },
    }));
    
    // 取得patients資料
    const [patientsData, SetPatientsData] = useState([]);
    useEffect(() =>{
        axios.get('http://localhost:5000/patients/')
        .then((res) => { console.log(JSON.stringify(res.data)); SetPatientsData(res.data) })
        .catch((err) => { console.log(err) })
    },[]);

    function PatientsTable() {
        const classes = useStyles();
    
        return (
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">OrdersQuantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patientsData.map((data) => (
                        <TableRow key={data.Id} hover onClick={DialogClickOpen} id={data.Id}>
                            <TableCell component="th" scope="row" align="center">
                                {data.Id}
                            </TableCell>
                            <TableCell align="center">{data.Name}</TableCell>
                            <TableCell align="center">{data.OrderIds.length}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        );
    }

    // Dialog ==========================================================
    
    // 跳出Dialog框框
    const [open, setOpen] = useState(false);
    const [orderNums, setOrderNums] = useState(); 
    const [patientId, setPatientId] = useState(); 
    const DialogClickOpen = (e) => {
        setPatientId(e.target.parentNode.id);
        // 得到點選的patirnts Id再查找OrderIds
        setOrderNums(patientsData.find(data => data.Id == e.target.parentNode.id).OrderIds);
        setOpen(true);
    };
    
    const DialogClose = () => {
        setOpen(false);
    };
    // 跳出新增Order框框
    const [messageOpen, setMessageOpen] = useState(false);
    const MessageClickOpen = () =>{
        setMessageOpen(!messageOpen);
    }

    // 確定新增Order
    const [addMes, SetAddMes] = useState();
    const order = { message : addMes};
    const AddOrder = () =>{
        console.log(messageOpen)
    }

    function OrderDialog() {
        const classes = useStyles();

        return (
          <div>
            <Dialog open={open} onClose={DialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Orders</DialogTitle>
                <div>
                    <IconButton aria-label="add" onClick={MessageClickOpen}>
                        <AddCircleIcon fontSize="small" />
                    </IconButton>{console.log({messageOpen})}
                    <ShowTextField visible={messageOpen} patientId={patientId} />
                </div>
                <DialogContent>
                <OrderList orderNums={orderNums}/>
                </DialogContent>
                <DialogActions>
                <Button onClick={DialogClose} color="primary">
                    離開
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
    return(
        <div>
            <PatientsTable />
            <OrderDialog />
        </div>
    );
}
