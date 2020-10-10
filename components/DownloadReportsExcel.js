import Workbook from 'react-excel-workbook'
 
const example = (selectedStateData) => (
  <div className="row text-center" style={{marginTop: '100px'}}>
    <Workbook filename="membersReport.xlsx" element={<button className="btn btn-lg btn-primary">Open</button>}>
      <Workbook.Sheet data={selectedStateData.selectedStateData} name="Sheet A">
        <Workbook.Column label="User Name" value="usrname"/>
        <Workbook.Column label="Father Name" value="usrfatnam"/>
        <Workbook.Column label="Gender" value="usrgen"/>
        <Workbook.Column label="Address" value="usradd"/>
        <Workbook.Column label="Insan no" value="usrinsnum"/>
        <Workbook.Column label="Telegram no" value="wmobno"/>
        <Workbook.Column label="Mobile no" value="usrmob"/>
        <Workbook.Column label="DOB" value="usrdob"/>
        <Workbook.Column label="Primary Email" value="usrpriemail"/>
        <Workbook.Column label="Other Email" value="usremailother"/>
        <Workbook.Column label="Twitter Handle" value="twhandle"/>
        <Workbook.Column label="Skills" value="usrskillid"/>
        <Workbook.Column label="Account Date" value="usrcrtdat"/>
        <Workbook.Column label="Devices" value="usrown"/>
        <Workbook.Column label="Ref State Member" value="refstamemberid"/>
        <Workbook.Column label="Comment" value="refcomments"/>
        <Workbook.Column label="DM Name" value="refdmname"/>
        <Workbook.Column label="DM Number" value="refdmmobno"/>
        <Workbook.Column label="Other Skills" value="skillother"/>
        <Workbook.Column label="Block Name" value="blockname"/>
        <Workbook.Column label="Role in SMG" value="categoryname"/>
        <Workbook.Column label="Country Name" value="countryname"/>
        <Workbook.Column label="District Name" value="districtname"/>
        <Workbook.Column label="State Name" value="statename"/>
        <Workbook.Column label="Qualification" value="qualificationname"/>
        <Workbook.Column label="Professional" value="professionname"/>
        <Workbook.Column label="Blood Group" value="bloodgrp"/>
        <Workbook.Column label="Other Twitter Handle" value="othertwitterhandle"/>
        <Workbook.Column label="Total Hazri" value="totalhazri"/>
        <Workbook.Column label="Facebook" value="facebook"/>
        <Workbook.Column label="Instagram" value="instagram"/>
        <Workbook.Column label="Instagram" value="instagram"/>
      </Workbook.Sheet>
      {/* <Workbook.Sheet data={data2} name="Another sheet">
        <Workbook.Column label="Double aaa" value={row => row.aaa * 2}/>
        <Workbook.Column label="Cubed ccc " value={row => Math.pow(row.ccc, 3)}/>
      </Workbook.Sheet> */}
    </Workbook>
  </div>
)

export default example;