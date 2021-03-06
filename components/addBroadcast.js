import React from 'react';
import NavBar from './NavBarBack';
import dynamic from 'next/dynamic';
import { stateList } from '../constants/url';

const Multiselect = dynamic(
    () => import('multiselect-react-dropdown').then(module => module.Multiselect),
    {
        ssr: false
    }
);

const AddBroadcast = () => {
    return(
        <div>
        <NavBar prevRoute="events" />
        <div className="create-event-container">
        <div class="form-group">
            <label>Attach Image</label>
            <input type="file" id="text" placeholder="Name of Event"  class="form-control-event" />
            {/* <p class="error">{eventError}</p> */}
        </div>
        <div class="form-group">
            <label>Detail of Event</label>
            <textarea id="text" style={{height: 100}} placeholder="Write Broadcast message here...."  class="form-control-event" >
            </textarea>
        </div>
        <div className="event-checkbox">
            <input type="checkbox" id="vehicle1" name="vehicle1" className="event-checkbox-input" />
            <label for="vehicle1"> National Members</label><br></br>
            {/* <input type="checkbox" id="vehicle1" name="vehicle1" value={nationalMembers} onClick={() => updateNationalMembers(!nationalMembers)} className="event-checkbox-input" />
            <label for="vehicle1"> National Members</label><br></br> */}
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
        {/* <div class="form-group">
            <label>Start Date</label>
            <input type="date" id="text" placeholder="Start Date" min={MinDate} value={startDate} onChange={(e) => updateStartDate(e.target.value)} class="form-control-event" />
        </div>
        <div class="form-group">
            <label>End Date</label>
            <input type="date" id="text" placeholder="End Date" min={startDate || MinDate} value={endDate} onChange={(e) => updateEndDate(e.target.value)} class="form-control-event" />
        </div>
        <div class="form-group">
            <label>Detail of Event</label>
            <textarea id="text" style={{height: 100}} placeholder="Detail of Event" value={eventDetail} onChange={(e) => updateEventDetail(e.target.value)} class="form-control-event" >
            </textarea>
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
        <p class="iconSwitch" style={{width: '90vw', marginLeft: '5vw'}} onClick={() => addMyEvent()}>Add Event</p> */}

        </div>
    </div>
    );
}

export default AddBroadcast;