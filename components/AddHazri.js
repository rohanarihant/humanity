import React, {useEffect, useContext, useState} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import NavBar from './NavBarBack';
import AccountContext from '../contexts/accountContext';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { user } from '../utils/apis';
import { toast } from 'react-toastify';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }
  function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }
const AddHazri = () => {
    const {account: { getProfileDetails, toggleShowLoader, setRoute}} = useContext(AccountContext);
    const [userProfileData, setUserProfileData] = useState([{}]);
    const [sewaDate, setSewaDate] = useState('');
    const [sewaDateError, setSewaDateError] = useState('');
    const [ashramLocation, setAshramLocation] = useState('Select Sewa Location');
    const [ashramLocationError, setAshramLocationError] = useState('');
    const [sewaNoDays, setSewaNoDays] = useState('');
    const [sewaNoDaysError, setSewaNoDaysError] = useState('');
    const [value, setValue] = React.useState(0);
    const MaxDate = new Date().toISOString().slice(0,10);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const saveSewa = async(sewaType) => {
        if(!sewaDate){
            setSewaDateError('Please select Date');
        }else{
            setSewaDateError('');
        }
        if(ashramLocation === "Select Sewa Location"){
            setAshramLocationError("Please select any option");
        }else{
            setAshramLocationError("");
        }
        if(!sewaNoDays){
            setSewaNoDaysError("Please add no of days");
        }else{
            setSewaNoDaysError("");
        }
        if(sewaDate !== '' && sewaDateError === '' && ashramLocation !== ''
        && ashramLocationError === '' && sewaNoDays !== '' && sewaNoDaysError === ''){
            toggleShowLoader(true);
            const userId = localStorage.getItem('userId');
            const auth = localStorage.getItem('authpassword');
            const response = await user.addHazri(userId, auth, ashramLocation, sewaType, sewaDate, sewaNoDays);
            if(response.success){
                toast.success('Hazri added successfully');
                setRoute('myHazri');
            }else{
                toast.error('Error while adding Hazri');
            }
            toggleShowLoader(false);
        }
    }
    const saveBloodSewa = async(sewaType) => {
        if(!sewaDate){
            setSewaDateError('Please select Date');
        }else{
            setSewaDateError('');
        }
        if(sewaDate !== '' && sewaDateError === ''){
          toggleShowLoader(true);
            const userId = localStorage.getItem('userId');
            const auth = localStorage.getItem('authpassword');
            const response = await user.addHazri(userId, auth, ashramLocation, sewaType, sewaDate, sewaNoDays);
            if(response.success){
                toast.success('Hazri added successfully');
                setRoute('myHazri');
            }else{
                toast.error('Error while adding Hazri');
            }
            toggleShowLoader(false);
        }
    }
    const saveParmarthSewa = async(sewaType) => {
        if(!sewaDate){
            setSewaDateError('Please select Date');
        }else{
            setSewaDateError('');
        }
        if(sewaDate !== '' && sewaDateError === ''){
          toggleShowLoader(true);
            const userId = localStorage.getItem('userId');
            const auth = localStorage.getItem('authpassword');
            const response = await user.addHazri(userId, auth, ashramLocation, sewaType, sewaDate, sewaNoDays);
            if(response.success){
                toast.success('Hazri added successfully');
                setRoute('myHazri');
            }else{
                toast.error('Error while adding Hazri');
            }
            toggleShowLoader(false);
        }
    }
    useEffect(() => {
        setUserProfileData(JSON.parse(localStorage.getItem('MemberDetaildet')));
        async function getProfile() {
            const response = await getProfileDetails();
            if (response.success) {
                setUserProfileData(response.MemberDetaildet);
                localStorage.setItem('MemberDetaildet', JSON.stringify(response.MemberDetaildet));
                localStorage.setItem('ItwingRank', JSON.stringify(response.categoryname));
                localStorage.setItem('samiti', JSON.stringify(response.samiti));
            }
        }
        (!userProfileData && !!localStorage.getItem('userId')) && getProfile();
    }, []);
    return (
        <>
        <NavBar prevRoute="myHazri" />
        <div style={{marginTop: 25}}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="SMG Sewa" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Blood Donation" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Parmarth" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
          <div class="add-hazri-input">
            <input type="date" placeholder="MM/DD/YYYY" max={MaxDate} class="form-control" value={sewaDate} onChange={(e) => setSewaDate(e.target.value)} />
            <p className="error">{sewaDateError}</p>
            <select class="form-control" value={ashramLocation} onChange={(e) => setAshramLocation(e.target.value)}>
                <option>Select Sewa Location</option>
                <option>Ashram</option>
                <option>At other Place</option>
            </select>
            <p className="error">{ashramLocationError}</p>
            {ashramLocation !== "Select Sewa Location"
            && (<><input type="text" class="form-control" placeholder={`Sewa No of${ashramLocation === 'At other Place' ? " Hours" : " Days"}`} style={{margin: '20px 0px'}} value={sewaNoDays} onChange={(e) => setSewaNoDays(e.target.value)}/>
            <p className="error">{sewaNoDaysError}</p></>)}
            <button class="iconSwitch" style={{width: 200}} onClick={() => saveSewa("SMG Sewa")}>Save</button>
          </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <div class="add-hazri-input">
            <input type="date" placeholder="MM/DD/YYYY" max={MaxDate} class="form-control" value={sewaDate} onChange={(e) => setSewaDate(e.target.value)} />
            <p className="error">{sewaDateError}</p>
            <button class="iconSwitch" style={{width: 200}} onClick={() => saveBloodSewa('Blood Donation')}>Save</button>
          </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
          <div class="add-hazri-input">
            <input type="date" placeholder="MM/DD/YYYY" max={MaxDate} class="form-control" value={sewaDate} onChange={(e) => setSewaDate(e.target.value)} />
            <p className="error">{sewaDateError}</p>
            <input type="text" class="form-control" placeholder="Parmarth Amount" style={{margin: '20px 0px'}} value={sewaNoDays} onChange={(e) => setSewaNoDays(e.target.value)}/>
            <p className="error">{sewaNoDaysError}</p>
            <button class="iconSwitch" style={{width: 200}} onClick={() => saveParmarthSewa('Parmarth')}>Save</button>
          </div>
      </TabPanel>
        </div>
       
    </>
    )
};

export default AddHazri;