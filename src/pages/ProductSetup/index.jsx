import { Outlet, useLocation } from "react-router-dom";
import "./product.css";
import { useNavigate } from "react-router";

const steps = [
  { label: "Brand", path: "brand-add" },
  { label: "Category", path: "category-add" },
  { label: "SubCategory", path: "subcategory-add" },
  { label: "Product", path: "product-add" }
];

export default function ProductSetup() {
  const location = useLocation();

  const activeStep = steps.findIndex(step =>
    location.pathname.includes(step.path)
  );
  
  return (
    <div className="p-6">
      {/* Stepper */}
      <div className="flex gap-4 mb-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-xl text-sm font-medium
              ${index === activeStep
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"}
            `}
          >
            {step.label}
          </div>
        ))}
      </div>

      {/* Child Route Render */}
      <Outlet />
    </div>
  );
}
