import React, {useEffect, useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import NavBar from './NavBarBack';
import AccountContext from '../contexts/accountContext';
import { useRouter } from 'next/router';
import {user} from '../utils/apis';
import Search from '@material-ui/icons/Search';

const columns = [
  { id: 'name', label: 'Date', minWidth: 50 },
  { id: 'code', label: 'Sewa Type', minWidth: 50 },
  {
    id: 'population',
    label: 'Sewa Place',
    minWidth: 50,
  },
  {
    id: 'size',
    label: 'No. of Hazris',
    minWidth: 50,
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  tbody: {
    width: 100,
  },
});
const MyHazri = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const {account: { getProfileDetails, setRoute, toggleShowLoader}} = useContext(AccountContext);
    const [userHazri, setUserHazri] = useState([{}]);
    const [pagging, setPagging] = useState(0);
    const [enableSearch, setEnableSearch] = useState(false);
    const [searchFrom, setSearchFrom] = useState('');
    const [searchTo, setSearchTo] = useState('');
    const [totalHazri, setTotalHazri] = useState('');
    const [responseMsg, setResponseMsg] = useState('');
    const router = useRouter();
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    async function getMyHazri() {
        // toggleShowLoader(true);
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const power = localStorage.getItem('power');
        const response = await user.getHazri(userid, authpassword, power, searchFrom, searchTo, pagging);
        if (response.success) {
          setUserHazri(response.sewalist);
          setTotalHazri(response.hazri);
        }else{
          setUserHazri([]);
          setResponseMsg(response.message);
          setTotalHazri(response.hazri);
        }
        // toggleShowLoader(false);
      }
    useEffect(() => {
        getMyHazri();
    }, []);
    const searchMyHazri = () => {
        if(searchFrom !== '' && searchTo !== ''){
            getMyHazri();
        }
    }
    const deleteHazri = async(sewaid) => {
      const userid = localStorage.getItem('userId');
      const authpassword = localStorage.getItem('authpassword');
      const power = localStorage.getItem('power');
      const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
      const gender = MemberDetaildet && MemberDetaildet[0].usrgen;
      const res = await user.deleteHazri(userid, authpassword, power, gender, sewaid);
      res.success && getMyHazri();
    }

    return (
        <>
        <NavBar setEnableSearch={setEnableSearch} enableSearch={enableSearch} prevRoute="home" />
        <div>
            {enableSearch && <div>
                <input type="date" className="search-date-input" value={searchFrom} onChange={(e) => setSearchFrom(e.target.value)}  />
                <input type="date" className="search-date-input" value={searchTo} onChange={(e) => setSearchTo(e.target.value)} />
                <Search className={classes.notification} className="search-date-icon" onClick={() => searchMyHazri()} />
            </div>}
            <p class="my-hazri-instruction" style={{marginTop: enableSearch ? 0 : 60}}>यहाँ पर आप पिछले 45 दिनों में की गई सेवा की जानकारी भर सकते हैं। भरी गई सेवा के अनुसार आपकी हाज़री अपने आप ही जुड़ती जाएगी।वर्ष 2020 में आपकी अब तक की कुल हाज़री सबसे ऊपर दिखाई गयी है।</p>
            <p className="total-hazri">Total Hazri :- {totalHazri}</p>
            <img className="plus-icon" src="/static/img/plus.png" onClick={() => setRoute('addHazri')} />
        </div>
        <div>
        {userHazri && userHazri.length > 0 &&
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userHazri && userHazri.length > 0 && userHazri.map((row, index) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            <TableCell key={index} padding="default">
                                {row.sewaentrydate}
                            </TableCell>
                            <TableCell key={index} padding="default">
                                {row.sewatype}
                            </TableCell>
                            <TableCell key={index} padding="none" >
                                {row.sewaatplace}
                            </TableCell>
                            <TableCell key={index} padding="none">
                                {Math.round(parseFloat(row.sewatime))}
                                <img src="./static/img/delete.svg" style={{height: 20, marginLeft: 10}} onClick={() => deleteHazri(row.sewaid)} />
                            </TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={userHazri && userHazri.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>}
        <div className="total-hazri">{responseMsg}</div>
        </div>
       
    </>
    )
};

export default MyHazri;