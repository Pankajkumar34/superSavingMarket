import { useState } from "react";
import { useParams } from "react-router";
import PermissionForm from "./permission";
import PreviewFile from "../components/pdfCanverter/previewFile";

const DetailsView = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("view");
  const [userData, setUserData] = useState({});

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("permissions")}
          className={`px-6 py-2 rounded-xl font-medium transition ${
            activeTab === "permissions"
              ? "bg-blue-600 text-white shadow"
              : "bg-white border text-gray-700"
          }`}
        >
          Permissions
        </button>

        <button
          onClick={() => setActiveTab("view")}
          className={`px-6 py-2 rounded-xl font-medium transition ${
            activeTab === "view"
              ? "bg-blue-600 text-white shadow"
              : "bg-white border text-gray-700"
          }`}
        >
          View
        </button>
      </div>

      {/* 📦 Content */}
      <div>
        {activeTab === "permissions" && <PermissionForm userData={userData}/>}
        {activeTab === "view" && (
          <PreviewFile id={id} role={"FRANCHISE_ADMIN"}  />
        )}
      </div>
    </div>
  );
};

export default DetailsView;
