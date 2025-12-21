import React from 'react'
import headerImg from '../../../assets/images/header2.png'
import Header from '../../../Shared/Components/Header/Header'
import { useMemo, useState } from "react";
import { createHttpClient } from "../../../Api/Http.js";
import { useApiGet, useApiPost ,useApiDelete } from "../../../Hooks/useApi.js";
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NoData from '../../../Shared/Components/NoData/NoData.jsx';
import { http }  from "../../../Api/Httpinstance.js";
import Buttono from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation.jsx';
import { useForm } from 'react-hook-form';
import { useQueryClient } from "@tanstack/react-query";


// import Modal from 'react-bootstrap/Modal';

export default function CategoriesList() {

  const qc = useQueryClient();
  const [modalMode, setModalMode] = useState("add");
  const [selectedCategory, setSelectedCategory] = useState(null);

  //   const http = useMemo(
  //   () => createHttpClient("https://upskilling-egypt.com:3006/api/v1"),
  //   []
  // );
 

const [show, setShow] = useState(false);
const [show2, setShow2] = useState(false);
const [catId, setcatId] = useState(0);
const [catName, setcatName] = useState('');
const {register, formState:{errors},handleSubmit,reset}=useForm()
  const handleClose = () => setShow(false);
  const handleShow = (cat) => {
   // alert(id)
    setcatId(cat.id)
    setcatName(cat.name)
    setShow(true);
  }



   const handleClose2 = () => {
  setShow2(false);
  setSelectedCategory(null);
  setModalMode("add");
  reset({ name: "" });
};

  // const handleShow2 = () => {

  //   setShow2(true);
  // }

  const handleShow2Add = () => {
  setModalMode("add");
  setSelectedCategory(null);
  reset({name: "" });
  setShow2(true);
};

const handleShow2Edit = (category) => {
  setShow2(true);
  console.log("category",category)
  setModalMode("edit");
  setSelectedCategory(category);
  reset({ name: category?.name ?? "" }); 
  
};

  const [pageNumber, setPageNumber] = useState(1);
  const [name, setName] = useState("");

  const pageSize = 10;


  const { data, isLoading, isError, isFetching } = useApiGet({
    http,
    key: ["categories", pageSize, pageNumber],
    path: "/Category",
    config: { params: { pageSize, pageNumber } },
  });
   console.log("res", data);

  
   

  const {
  mutate: deleteCategory,
 
} = useApiDelete({
  http,
  invalidateKeys: [["categories"]], 
});
if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load categories</p>;

 const categories = data?.data ?? []
  const handleDelete = () => {

    
  //    const ok = window.confirm("Are you sure you want to delete this category?");
  // if (!ok) return;

  deleteCategory({ path: `/Category/${catId}` });
  handleClose()
  };

 
let AddCategory=async (data)=>{
  console.log("hhhhhh:",data)
try {
    if (modalMode === "add") {
      await http.post("/Category", data);
    } else {
      const id = selectedCategory?._id ?? selectedCategory?.id;
      await http.put(`/Category/${id}`, data); 
    }

    handleClose2();
     await qc.invalidateQueries({ queryKey: ["categories"], exact: false });

  }
catch(error){
   console.log("ERROR OBJECT:", error);
    // console.log("ERROR RESPONSE:", error.response?.data);
    //  console.log(error.response.data)

}
}


  return (
    <>
   {/* <Buttono variant="primary" onClick={handleShow}>
        Launch demo modal
      </Buttono> */}

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
       <DeleteConfirmation deleteItem="Category " name={catName}></DeleteConfirmation>
        <Modal.Footer>
          
          <Buttono variant="outline-danger"onClick={handleDelete} >
           Delete This item
          </Buttono>
        </Modal.Footer>
      </Modal>




       <Modal show={show2} onHide={handleClose2} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>


        <form onSubmit={handleSubmit(AddCategory)}>

<div class="input-group m-5 w-75 m-auto">
  
  <input type="text" 
  
  {...register('name' ,{
   required:" name is required",
  //  pattern: {
  //                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  //                           message: "Enter a valid email address",
  //                         },

  })}
  className="form-control text-color" placeholder="Enter A CATEGORY" aria-label="Username" aria-describedby="basic-addon1"/>
</div>
 {errors.name && <p className='alert alert-danger'>{errors?.name.message}</p>}

    
        <Modal.Footer>
          
          <Buttono  type='submit' className="m-3" variant="success">
           {modalMode === "add" ? "Save" : "Update"}
          </Buttono>
        </Modal.Footer>
         </form>
      </Modal>
   
     <Header title="Categories" description="You can now add your items that any user can order it from the Application and you can edit" imgUrl={headerImg}></Header>
       <div className="d-flex justify-content-between align-items-center m-3">
  {/* Left side */}
  <div>
    <h5 className="mb-0">Categories Table Details</h5>
    <small className="text-muted">You can check all details</small>
  </div>

  {/* Right side */}
  <div className="text-end">
    <button className="btn btn-success btn-bg{ mb-1" onClick={()=>{handleShow2Add()}}>
      Add New Category
    </button>
   
  </div>
</div>



           <div className="table-container table-responsive  m-1">
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
        <button className="dropdown-item primary-color" onClick={() => handleShow2Edit(category)}>
          <i className="fa-regular fa-pen-to-square me-2"></i> Edit
        </button>
      </li>
     
      <li>
        <button className="dropdown-item primary-color" >
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
