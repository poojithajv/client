import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllUsers } from '../../Redux/UserSlice'
import toast from 'react-hot-toast';
import { deleteUserbyid } from '../../Redux/UserSlice';
import '../../styles/User.scss'

function Users() {
  const dispatch=useDispatch()
  const [dat, setDat] = useState([]);
  const [id,setId]=useState('')
  const [users,setUsers]=useState([])
  const [selectedRow, setSelectedRow] = useState("");
  const navigate = useNavigate();


  useEffect(()=>{
    try{
      dispatch(getAllUsers())
      .then((res)=>{
        console.log(res.payload.users)
        if (res.payload){
          setUsers(res.payload.users)
        }
      })
    }catch(err){
      console.log(err)
    }
  },[])

  // Map the user data to a new array, adding an 'id' property
  let data = users.map((item, index) => ({ ...item, id: index + 1 }));

  // Define column configuration for the DataGrid
  const columns = [
    {
      width: 60,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      headerName: 'Select',
      renderCell: (params) => (
        <input
          name="poo"
          type="radio"
          checked={params.row.id === selectedRow}
          className="button1"
        />
      ),
    },
    {
      field: "id",
      headerName: "Sl.No",
      width: 60,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "userName",
      headerName: "User Name",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div
          style={{
            wordBreak: "break-word",
            whiteSpace: "wrap",
            lineHeight: "1",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "mobileNo",
      headerName: "Mobile Number",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "altMobileNo",
      headerName: "Alternate Mobile Number",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "age",
      headerName: "Age",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
  ];

  // Function to handle row click and store selected row data
  const onRowHandleClick = (params) => {
    setSelectedRow(params.id);
    setId(params?.row?._id)
    localStorage.setItem('id',params?.row?._id)
    setDat(params?.row);
  };
  console.log(id)
  const deleteUser=()=>{
    if (window.confirm('Are you sure you want to delete the user?')) {
    try{
      dispatch(deleteUserbyid(localStorage.getItem('id')))
      .then((res)=>{
        if (res.payload==='User Deleted successfully'){
          toast.success(res.payload.message)
          window.location.reload()
        }else{
          toast.error(res.payload.message)
        }
      })
    }catch(err){
      console.log(err.message);
      toast.error(err.message)
    }
  }
  }
  return (
    <div className="users-container">
        <div className="user-headings">
          <h1 className="user-main-heading">All Users</h1>
          <div className="user-buttons">
            <button
              className="userbtn"
              onClick={() => navigate("/register")}
            >
              Create
            </button>
            <button
              className="userbtn"
              onClick={() => {
                selectedRow
                  ? navigate("/update_user", { state: dat })
                  : alert("Please select one user to update?");
              }}
            >
              Update
            </button>
            <button
              className="userbtn me-0"
              onClick={() => {
                selectedRow
                  ? deleteUser()
                  : alert("please select one user to delete?");
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="user-table-container">
          {data.length > 0 ? (
            <div className="user-table">
              <DataGrid
                rows={data}
                columns={columns}
                onRowClick={onRowHandleClick}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 15, 20]}
              />
            </div>
          ) : (
            <div style={{ height: '90vh' }}>No Data Found</div>
          )}
        </div>
      </div>
  )
}

export default Users