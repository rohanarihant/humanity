import Workbook from 'react-excel-workbook'
 
const example = (selectedStateData) => {  
  return(
  <div className="row text-center" style={{marginTop: '100px'}}>
    <Workbook filename="membersPointsReport.xlsx" element={<button className="btn btn-lg btn-primary">Open</button>}>
      <Workbook.Sheet data={selectedStateData.selectedStateData} name="Sheet A">
        <Workbook.Column label="User Name" value="usrname"/>
        <Workbook.Column label="Father Name" value="usrfatnam"/>
        <Workbook.Column label="Mobile no" value="usrmob"/>
        <Workbook.Column label="Role in SMG" value="categoryname"/>
        <Workbook.Column label="Block name" value="blockname"/>
        <Workbook.Column label="District" value="districtname"/>
        <Workbook.Column label="State" value="statename"/>
        <Workbook.Column label="Country" value="countryname"/>
        <Workbook.Column label="Browser" value="Browser"/>
        <Workbook.Column label="Facebook" value="Facebook"/>
        <Workbook.Column label="Instagram" value="Instagram"/>
        <Workbook.Column label="OBD Points" value="OBDPoints"/>
        <Workbook.Column label="Shabdakshari" value="Shabdakshari"/>
        <Workbook.Column label="Stall Sewa" value="StallSewa"/>
        <Workbook.Column label="Twitter" value="Twitter"/>
        <Workbook.Column label="Video" value="Video"/>
        <Workbook.Column label="Whatsapp" value="Whatsapp"/>
        <Workbook.Column label="Youtube" value="Youtube"/>
        <Workbook.Column label="Total" value="totalPoints"/>
      </Workbook.Sheet>
      {/* <Workbook.Sheet data={data2} name="Another sheet">
        <Workbook.Column label="Double aaa" value={row => row.aaa * 2}/>
        <Workbook.Column label="Cubed ccc " value={row => Math.pow(row.ccc, 3)}/>
      </Workbook.Sheet> */}
    </Workbook>
  </div>
)}

export default example;