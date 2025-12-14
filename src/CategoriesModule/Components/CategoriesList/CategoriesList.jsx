import React from 'react'
import headerImg from '../../../assets/images/header2.png'
import Header from '../../../Shared/Components/Header/Header'
import { useMemo, useState } from "react";
import { createHttpClient } from "../../../Api/Http.js";
import { useApiGet, useApiPost } from "../../../Hooks/useApi.js";
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NoData from '../../../Shared/Components/NoData/NoData.jsx';

export default function CategoriesList() {

    const http = useMemo(
    () => createHttpClient("https://upskilling-egypt.com:3006/api/v1"),
    []
  );
 


  const [pageNumber, setPageNumber] = useState(1);
  const [name, setName] = useState("");

  const pageSize = 10;


  const { data, isLoading, isError, isFetching } = useApiGet({
    http,
    key: ["categories", pageSize, pageNumber],
    path: "/Category",
    config: { params: { pageSize, pageNumber } },
  });
   console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load categories</p>;

 const categories = data?.data ?? []
  return (
    <>
     <Header title="Categories" description="You can now add your items that any user can order it from the Application and you can edit" imgUrl={headerImg}></Header>
       <div className="d-flex justify-content-between align-items-center m-3">
  {/* Left side */}
  <div>
    <h5 className="mb-0">Categories Table Details</h5>
    <small className="text-muted">You can check all details</small>
  </div>

  {/* Right side */}
  <div className="text-end">
    <button className="btn btn-success btn-bg{ mb-1">
      Add New Category
    </button>
   
  </div>
</div>



           <div className="table-container  m-3">
      <table className="table   table-striped  table-custom">
  <thead className='' >
    <tr className='table-header-row'>
     
      
              <th>Name</th>
              
                    <th></th>
                        <th></th>
                            <th></th>
             
              <th className='text-end'>Actions</th>
    </tr>
  </thead>
  <tbody>
   { categories.length > 0 ? categories.map((category, idx)=>  
       <tr key={category._id || category.id || idx}>
      <td>{(pageNumber - 1) * pageSize + idx + 1}</td>
      <td>{category.name}</td>
      <td>{category.creationDate}</td>
      <td>{category.modificationDate}</td>
      <td>
      <div className="dropdown">
    <button
      className="btn btn-link p-0 text-dark"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
     <i class="fa-solid fa-ellipsis"></i>
    </button>

    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button className="dropdown-item primary-color" onClick={() => console.log("View")}>
          <i className="fa-regular fa-eye me-2"></i> View
        </button>
      </li>
      <li>
        <button className="dropdown-item primary-color" onClick={() => console.log("Edit")}>
          <i className="fa-regular fa-pen-to-square me-2"></i> Edit
        </button>
      </li>
     
      <li>
        <button className="dropdown-item primary-color" onClick={() => console.log("Delete")}>
          <i className="fa-regular fa-trash-can me-2"></i> Delete
        </button>
      </li>
    </ul>
  </div>
      </td>
    </tr>):<NoData/>}
  
    
  </tbody>
</table>


 <div className="d-flex gap-2 mt-3 justify-content-center">
          <button
            className="btn btn-outline-secondary"
            disabled={pageNumber === 1}
            onClick={() => setPageNumber((p) => p - 1)}
          >
            Prev
          </button>

          <span className="align-self-center">Page {pageNumber}</span>

          <button
            className="btn btn-outline-secondary"
            onClick={() => setPageNumber((p) => p + 1)}
          >
            Next
          </button>
        </div>
    </div>
          </>
  )
}
