import React from 'react'
import FillRecipies from '../../../Shared/Components/FillRecipies/FillRecipies'
import { useState } from 'react';
import { http }  from "../../../Api/Httpinstance.js";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";


export default function RecipieData() {
   
const location = useLocation();
const mode = location.state?.mode ?? "add";
const recipieId = location.state?.recipieId;
   const isAddMode = mode === "add";
  const isEditMode = mode === "edit";
  const [CategoriesList, setCategoriesList] = useState([]);
    const [TagsList, setTagsList] = useState([]);
  
    const {register, formState:{errors},handleSubmit,reset}=useForm()
    let navigate=useNavigate()
       const qc = useQueryClient();



    


  const getCategories=async (data)=>{
try{
  const response= await http.get("/Category/",data)
 //console.log("SUCCESS:", response.data.data);
 setCategoriesList(response.data.data)
  
}
catch(error){
   console.log("ERROR OBJECT:", error);
    console.log("ERROR RESPONSE:", error.response?.data);
     console.log(error.response.data.message)

}
  }


    const getTags=async (data)=>{
try{
  const response= await http.get("/tag/",data)
 //console.log("SUCCESS:", response.data);
 setTagsList(response.data)
  
}
catch(error){
   console.log("ERROR OBJECT:", error);
    console.log("ERROR RESPONSE:", error.response?.data);
     console.log(error.response.data.message)

}
  }
const AppendToFormData=(data)=>{
 const formData = new FormData();

formData.append('name',data.name)
formData.append('description',data.description)
formData.append('price',data.price)
 formData.append('categoriesIds',data.categoriesIds)
formData.append('tagId',data.tagId)
formData.append('recipeImage',data.recipeImage[0])
return formData

}

   const onSubmit = async (data) => {
    try {
      const reCipieData = AppendToFormData(data);

      
      if (isAddMode) {
        await http.post("/Recipe/", reCipieData);
        await qc.invalidateQueries({ queryKey: ["recipies"] });
        console.log("recipiedata"+reCipieData)
        navigate("/dashboard/recipies-list");
      } else {

        console.log("hhhhhhhhhh"+reCipieData.name)
        await http.put(`/Recipe/${recipieId}`, reCipieData);

        await qc.invalidateQueries({ queryKey: ["recipies"] });
        navigate("/dashboard/recipies-list");
      }
    } catch (error) {
      console.log("VALIDATION ERRORS:", error.response?.data?.additionalInfo?.errors);
      toast.error("failed");
    }
  };


  useEffect(() => {
console.log("state:", location.state);
console.log("mode:", mode, "isEditMode:", isEditMode);
console.log("RecipieId:", recipieId);
    if (isEditMode && recipieId != null) {
      const fetchRecipie = async () => {
        try {
          const res = await http.get(`/Recipe/${recipieId}`);
          const Recipie = res.data;
          console.log("recipie lma 3mlt edit"+Recipie)
         // alert(Recipie)
         
          reset({

           name: Recipie?.name?? "",
            price: Recipie?.price?? "",
          // description: recipie?.description ?? "",
          // price: recipie?.price ?? "",
          // categoriesIds: recipie?.categories?.[0]?._id ?? recipie?.category?._id ?? recipie?.category ?? "",
          // tagId: recipie?.tag?._id ?? recipie?.tagId ?? "",
           
            
          });
        } catch (error) {
          console.error(error);
          toast.error("m4 3arf ageeb user data");
        }
      };

      fetchRecipie();
    }
  getCategories();
  getTags();
}, []);


  return (
   <>

   <FillRecipies title={isEditMode ? "Update" : "Add"} />;

   <p className="text-muted m-3">
  {isAddMode ? "Add New Item" : "Update Item"}
</p>

<form className='w-75 m-3 m-auto' onSubmit={handleSubmit( onSubmit)}>


 
  <input type="text" 
  
  {...register('name' ,{
   required:"Recipie name is required",
 

  })}
  className="form-control text-color m-2" placeholder="Recipie Name" aria-label="Username" aria-describedby="basic-addon1"/>

 {errors.name && <p className='alert alert-danger'>{errors?.name.message}</p>}

<select 
 {...register('tagId' ,{
  required:"tagId  is required",
 

  })}
className="form-select m-2">
  <option value="active">Choose</option>
{TagsList.map((tag) => (
  <option key={tag.id} value={tag.id}>
    {tag.name}
  </option>
))}

</select>

 {errors.tagId && <p className='alert alert-danger'>{errors?.tagId.message}</p>}

  <input type="text" 
  
  {...register('price' ,{
  required:"Recipie Price is required",
 

  })}
  className="form-control text-color m-2" placeholder="Price" aria-label="price" aria-describedby="basic-addon1"/>
 {errors.price && <p className='alert alert-danger'>{errors?.price.message}</p>}


<select
  className="form-select m-2"
  
  {...register("categoriesIds", { required: "categoriesIds is required" })}
>
  <option value="" disabled>
    Choose
  </option>

  {(Array.isArray(CategoriesList) ? CategoriesList : []).map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
</select>

{errors.categoriesIds && (
  <p className="alert alert-danger m-2">{errors.categoriesIds.message}</p>
)}



<textarea
  className="form-control m-2"
  rows="4"
  placeholder="Write description here..."
   {...register('description' ,{
  required:"desciption is required",
 

  })}
></textarea>
 {errors.description && <p className='alert alert-danger'>{errors?.description.message}</p>}

<input 
  {...register('recipeImage' ,{
  required:"recipeImage is required",
 

  })}
className="form-control" type="file" />
 {errors.recipeImage && <p className='alert alert-danger'>{errors?.recipeImage.message}</p>}




   
  
  
  
  
<div className=" d-flex justify-content-end m-2 p-3">
<button type="submit" className="btn btn-success  m-2  ">
   {isAddMode ? "Save" : "Update"}
</button>
<button type="button" className="btn btn-outline-danger m-2 ">
  Cancel
</button>

</div>



</form>





   </>
  )
}
