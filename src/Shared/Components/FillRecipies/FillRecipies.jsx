import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FillRecipies({title,description}) {

let navigate = useNavigate();
      const handleAddClick = () => {
            navigate("/dashboard/recipie-data", {
              state: {
                mode: "add",   
              },
            });
          };
      
    
  return (
    <>
    <div className="d-flex justify-content-between align-items-center gap-3 p-3 rounded-3 m-3" style={{ background: "#ECFBE9" }}>
  <div>
    <h5 className="mb-1 fw-bold">
      {title} the <span className="text-success">Recipes</span> !
    </h5>

    <p className="mb-0 text-muted small">
      you can now {description} the meals easily using the table and form , <br />
      click here and sill it with the table !
    </p>
  </div>

  <button
onClick={handleAddClick}
   className="btn btn-success fw-bold px-3 py-2 d-flex align-items-center gap-2 text-nowrap">
    {title} Recipes <span>➜</span>
  </button>
</div>

    </>
  )
}
