import React from 'react'
import headerImg from '../../../assets/images/header2.png'
import Header from '../../../Shared/Components/Header/Header'
import { useMemo, useState } from "react";
import { createHttpClient } from "../../../Api/Http.js";
import { useApiGet, useApiPost } from "../../../Hooks/useApi.js";
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NoData from '../../../Shared/Components/NoData/NoData.jsx';

export default function REcipiesList() {


      const http = useMemo(
      () => createHttpClient("https://upskilling-egypt.com:3006/api/v1"),
      []
    );
   
  
  
    const [pageNumber, setPageNumber] = useState(1);
    const [name, setName] = useState("");
  
    const pageSize = 10;
  
  
    const { data, isLoading, isError, isFetching } = useApiGet({
      http,
      key: ["recipies", pageSize, pageNumber],
      path: "/Recipe",
      config: { params: { pageSize, pageNumber } },
    });
     console.log(data);
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load categories</p>;
  
   const recipies = data?.data ?? []
  return (
    <>
    <Header title="Recipes Items" description="You can now add your items that any user can order it from the Application and you can edit" imgUrl={headerImg}></Header>
      <h1>Recipies List</h1>




              <div className="table-container  m-3">
            <table className="table   table-striped  table-custom ">
        <thead className='' >
          <tr className='table-header-row'>
           
              <th></th>
                    <th> Item Name</th>
                    
                          <th>Image</th>
                              <th>Price</th>
                                  <th>Description</th>
                                     <th>category</th>
                   
                    <th className='text-end'></th>
          </tr>
        </thead>
        <tbody>
         { recipies.length > 0 ? recipies.map((recipie, idx)=>  
             <tr key={recipie._id || recipie.id || idx}>
            <td>{(pageNumber - 1) * pageSize + idx + 1}</td>
             <td>{recipie.name}</td>
              <td> <img
            src={`https://upskilling-egypt.com:3006/${recipie.imagePath}`}
            alt={recipie.name}
            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 8 }}
          /></td>
            <td>{recipie.price}</td>
            <td>{recipie.description}</td>
             <td>{recipie.tag.name}</td>
            {/* <td>{recipie.tag?.length ? (
    recipie.category.map((c) => (
      <span key={c.id} className="badge bg-light text-dark me-1">
        {c.name}
      </span>
    ))
  ) : (
    "-"
  )}</td> */}

           
           
            <td className='text-end'>
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
