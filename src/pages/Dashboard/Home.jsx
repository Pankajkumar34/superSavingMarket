import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import LineChart from "../Charts/LineChart";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserList } from "../../utils/thunkApis/auth.api";

export default function Home() {

  return (
    <>
      <PageMeta
        title="Super Saving Market"
        description="Super Saving Market is a leading online marketplace for electronics, fashion, and home appliances."
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 ">
          <EcommerceMetrics />

        </div>


        {/* 
        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div> */}



        {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}


      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6 my-4" >
        <div className="  col-span-12 space-y-6 xl:col-span-6 ">
          <LineChart />

        </div>
        <div className="  col-span-12 space-y-6 xl:col-span-6 ">
          <MonthlySalesChart />

        </div>


      </div>
    </>
  );
}
