
import MUIDataTable from 'mui-datatables';
import React, { useState,useEffect } from 'react';
import apiClient from '../../Instances/client';
const Table = () => {
  const [userlist,setuserlist]=useState([]) 
  const columns = ["firstname","lastname","email","phonenumber","companyname"];
  
  const data=async()=>{
    try{
        const res=await apiClient.get("/get-all-user")
        setuserlist(res.data.data)
        console.log("api response", res.data.data)
        console.log("api data",userlist)
    }catch(e){
    console.log("error from table getting all user",e)

}  
}
useEffect(() => {
    console.log("requsted from db",userlist)
    data();
 }, []);
 const options = {
    selectableRows: false, // Set this option to false to remove the checkbox from the header
  };


  return (
    <div style={{marginTop:"12px"}}>
      <MUIDataTable
        filter={false}
        title={"User Data"}
        data={userlist || []}
        columns={columns}
         options={options}
      />
    </div>
  );
}

export default Table;