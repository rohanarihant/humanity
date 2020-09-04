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
import NavBar from '../components/NavBarBack';
import AccountContext from '../contexts/accountContext';
import { useRouter } from 'next/router';
import {user} from '../utils/apis';

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
    label: 'Sewa Time',
    minWidth: 50,
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

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
    const {account: { getProfileDetails}} = useContext(AccountContext);
    const [userHazri, setUserHazri] = useState([{}]);
    const [pagging, setPagging] = useState(0);
    const router = useRouter();
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    useEffect(() => {
        async function getMyHazri() {
            const userid = localStorage.getItem('userId');
            const authpassword = localStorage.getItem('authpassword');
            const power = localStorage.getItem('ItwingRank');
            const response = await user.getHazri(userid, authpassword, power, pagging);
            if (response.success) {
                setUserHazri(response.sewalist);
            }
        }
        getMyHazri();
    }, []);
    return (
        <>
        <NavBar />
        <div>
            <p class="my-hazri-instruction">यहाँ पर आप पिछले 45 दिनों में की गई सेवा की जानकारी भर सकते हैं। भरी गई सेवा के अनुसार आपकी हाज़री अपने आप ही जुड़ती जाएगी।वर्ष 2020 में आपकी अब तक की कुल हाज़री सबसे ऊपर दिखाई गयी है।</p>
            <img className="plus-icon" src="/static/img/plus.svg" onClick={() => router.push('/addHazri')} />
        </div>
        <div>
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
                    {userHazri.map((row, index) => {
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
                                {row.sewatime}
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        </div>
       
    </>
    )
};

export default MyHazri;