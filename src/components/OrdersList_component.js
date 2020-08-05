import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentIcon from '@material-ui/icons/Assignment';
// For Data
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

// 於Dialog顯示該paitient有幾筆Order
export default function OrderList(props) {
  const classes = useStyles();
  // 用OrederIds來查詢該Patients的Order
  const  {orderNums} = props;
  const [ordersData, SetOrdersData] = useState([]);
  // console.log('num',orderNums);
  useEffect(() =>{
    orderNums.map((x) => {
      axios.get('http://localhost:5000/orders/'+x)
      .then((res) => { SetOrdersData((old) => old.concat(res.data)) })
      .catch((err) => { console.log(err) })
  })
  },[]);
          
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {ordersData.map((data) =>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary={data.Message}/>
        </ListItem>
      )}
    </List>
  );
}
