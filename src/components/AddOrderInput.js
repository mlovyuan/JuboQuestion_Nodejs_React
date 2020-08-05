import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';
// For Data
import axios from "axios";


export default function ShowTextField(props){
    let {visible, patientId} = props;
    const [visibleChange, setVisibleChange] = useState(true)
    // 確定新增Order
    const [addMes, SetAddMes] = useState();
    const order = { Message : addMes, PatientId : patientId};
    const AddOrder = () =>{
        if(addMes!= '' || addMes !=  undefined || addMes !=  null ){
            axios.post('http://localhost:5000/orders/add', order)
            .then(
                (res) => {
                setVisibleChange(false);
                SetAddMes("");
            });
        }
    }
    return(
        visible == visibleChange ? (
           <span>
           <TextField id="filled-textarea" label="請輸入訊息" multiline variant="filled" onChange={(e) => SetAddMes(e.target.value)} />
           <IconButton aria-label="check" onClick={AddOrder}>
               <CheckIcon fontSize="small" style={{ color: green[500] }} />
           </IconButton>
           </span>
        ) : null
    )
}