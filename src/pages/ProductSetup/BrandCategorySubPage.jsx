import React from "react";
import AddBrand from "./BrandStep";
import SubCategoryForm from "./SubCategoryStep";
import CategoryForm from "./CategoryStep";
import { Outlet, useNavigate } from "react-router";
import TabButtons from "./tabs";

const BrandCategorySubPage = () => {
    const [tab, setTab] = React.useState("brand");
const navigate = useNavigate();
const handleTabChange = (newTab) => {
    setTab(newTab);

}
    
    return(
       <>
      <div>
        <TabButtons/>
        <Outlet />
       
     
      </div>
       
       </>
    )
}

export default BrandCategorySubPage;