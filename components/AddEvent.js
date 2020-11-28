import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import AccountContext from '../contexts/accountContext';
import { toast } from 'react-toastify';
import NavBar from './NavBarBack';
import dynamic from 'next/dynamic';
import {events} from '../utils/apis';
const stateList = [
    {name: 'Aasam', id: 1},
    {name: 'Andhra Pardesh', id: 2},
    {name: 'Bihar', id: 3},
    {name: 'Canada', id: 3},
    {name: 'Chandigarh', id: 3},
    {name: 'Chattisgarh', id: 3},
    {name: 'Delhi', id: 3},
    {name: 'Gujrat', id: 3},
    {name: 'Hryana', id: 3},
    {name: 'Himachal Pardesh', id: 3},
    {name: 'Jammu & Kashmir', id: 3},
    {name: 'Jharkhand', id: 3},
    {name: 'Karnataka', id: 3},
    {name: 'Kerala', id: 3},
    {name: 'Madhya Pardesh', id: 3},
    {name: 'Maharashtra', id: 3},
    {name: 'Manipur', id: 3},
    {name: 'Meghalaya', id: 3},
    {name: 'Mizoram', id: 3},
    {name: 'Nagaland', id: 3},
    {name: 'Nepal', id: 3},
    {name: 'Orissa', id: 3},
    {name: 'Punjab', id: 3},
    {name: 'Qatar', id: 3},
    {name: 'Rajasthan', id: 3},
    {name: 'Sikkim', id: 3},
    {name: 'Tamilnadu', id: 3},
    {name: 'Telangana', id: 3},
    {name: 'Tripura', id: 3},
    {name: 'Uttar Pardesh', id: 3},
    {name: 'Uttarakhand', id: 3},
    {name: 'West Bengal', id: 3},
]

const Multiselect = dynamic(
    () => import('multiselect-react-dropdown').then(module => module.Multiselect),
    {
        ssr: false
    }
)
const AddMyEvent = () => {
  const [eventName, updateEventName] = useState('');
  const [eventNameError, updateEventNameError] = useState('');
  const [startDate, updateStartDate] = useState('');
  const [startDateError, updateStartDateError] = useState('');
  const [endDate, updateEndDate] = useState('');
  const [endDateError, updateEndDateError] = useState('');
  const [eventDetail, updateEventDetail] = useState('');
  const [eventDetailError, updateEventDetailError] = useState('');
  const [selectState, updateSelectState] = useState('');
  const [managementMembers, updateManagementMembers] = useState(false);
  const [nationalMembers, updateNationalMembers] = useState(false);
  const [stateMembers, updateStateMembers] = useState(false);
  const [districtMembers, updateDistrictMembers] = useState(false);
  const [blockMembers, updateBlockMembers] = useState(false);
  const [teamMembers, updateTeamMembers] = useState(false);
  const MinDate = new Date().toISOString().slice(0,10)
  
  const { account: { getLogin, updateLoginStatus, saveUserDetailLogin, setRoute } } = useContext(AccountContext);
  const router = useRouter();

  const onSelectState = (selectedList, selectedItem) => {
    updateSelectState(selectedList);
    }

  const onRemoveState = (selectedList, removedItem) => {
        updateSelectState(selectedList);
    }

  async function addMyEvent() {
    try{
      const userid = localStorage.getItem('userId')
      const authpassword = localStorage.getItem('authpassword')
      const power = JSON.parse(localStorage.getItem('power'));
      const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
      const gender = MemberDetaildet && MemberDetaildet[0].usrgen;
      const stateid = MemberDetaildet && MemberDetaildet[0].usrstaid;
      const countryid = MemberDetaildet && MemberDetaildet[0].usrcouid;
      const blockid = MemberDetaildet && MemberDetaildet[0].usrblkid;
      const usrdstid = MemberDetaildet && MemberDetaildet[0].usrdstid;
      const response = await events.addEvent(userid, authpassword, gender, eventName, countryid, stateid, usrdstid,
        blockid, startDate, endDate, eventDetail, managementMembers, nationalMembers, stateMembers, districtMembers, blockMembers, teamMembers, 36, power );
      if(response.success){
        toast.success('Event added successfully');
        setRoute('events');
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  return (
    <div>
        <NavBar prevRoute="events" />
        <div className="create-event-container">
        <div class="form-group">
            <label>Event Name</label>
            <input type="text" id="text" placeholder="Name of Event" value={eventName} onChange={(e) => updateEventName(e.target.value)} class="form-control-event" />
            {/* <p class="error">{eventError}</p> */}
        </div>
        <div class="form-group">
            <label>Start Date</label>
            <input type="date" id="text" placeholder="Start Date" min={MinDate} value={startDate} onChange={(e) => updateStartDate(e.target.value)} class="form-control-event" />
            {/* <p class="error">{startDateError}</p> */}
        </div>
        <div class="form-group">
            <label>End Date</label>
            <input type="date" id="text" placeholder="End Date" min={startDate || MinDate} value={endDate} onChange={(e) => updateEndDate(e.target.value)} class="form-control-event" />
            {/* <p class="error">{startDateError}</p> */}
        </div>
        <div class="form-group">
            <label>Detail of Event</label>
            <textarea id="text" style={{height: 100}} placeholder="Detail of Event" value={eventDetail} onChange={(e) => updateEventDetail(e.target.value)} class="form-control-event" >
            </textarea>
            {/* <p class="error">{endDateError}</p> */}
        </div>
        <div className="event-checkbox">
            <input type="checkbox" id="vehicle1" name="vehicle1" value={managementMembers} onClick={() => updateManagementMembers(!managementMembers)} className="event-checkbox-input" />
            <label for="vehicle1"> Management Members</label><br></br>
            <input type="checkbox" id="vehicle1" name="vehicle1" value={nationalMembers} onClick={() => updateNationalMembers(!nationalMembers)} className="event-checkbox-input" />
            <label for="vehicle1"> National Members</label><br></br>
        </div>
        <div className="event-select-state">
            <Multiselect
                options={stateList} // Options to display in the dropdown
                selectedValues={selectState} // Preselected value to persist in dropdown
                onSelect={onSelectState} // Function will trigger on select event
                onRemove={onRemoveState} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                placeholder="Select State"
            />
        </div>
        {selectState && selectState.length > 0 && <div className="event-checkbox">
            <input type="checkbox" id="vehicle1" name="stateMember" value={stateMembers} onClick={() => updateStateMembers(!stateMembers)} className="event-checkbox-input" />
            <label for="vehicle1"> State Members</label><br></br>
            <input type="checkbox" id="vehicle1" name="districtMember" value={districtMembers} onClick={() => updateDistrictMembers(!districtMembers)} className="event-checkbox-input" />
            <label for="vehicle1"> District Members</label><br></br>
            <input type="checkbox" id="vehicle1" name="blockMember" value={blockMembers} onClick={() => updateBlockMembers(!blockMembers)} className="event-checkbox-input" />
            <label for="vehicle1"> Block Members</label><br></br>
            <input type="checkbox" id="vehicle1" name="teamMember" value={teamMembers} onClick={() => updateTeamMembers(!teamMembers)} className="event-checkbox-input" />
            <label for="vehicle1"> Team Members</label><br></br>
        </div>}
        <p class="iconSwitch" style={{width: '90vw', marginLeft: '5vw'}} onClick={() => addMyEvent()}>Add Event</p>

        </div>
    </div>
  )
}

export default AddMyEvent;