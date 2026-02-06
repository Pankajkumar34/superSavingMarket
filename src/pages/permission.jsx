import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosConfig from "../utils/axios.config";
import { toast } from "react-toastify";

const modules = {
    users: ["read", "create", "update", "delete"],
    products: ["read", "create", "update", "delete"],
    inventory: ["read", "updateQuantity", "updatePrice"],
    orders: ["read", "updateStatus"]
};

export default function PermissionForm({ userData }) {
    const axiosInstance = axiosConfig()
    const [role, setRole] = useState("FRANCHISE_ADMIN");
    const [userId, setUserId] = useState("");
    const [permissions, setPermissions] = useState({});
    const { viewDetails } = useSelector(state => state.stats)


    const togglePermission = (module, action) => {
        setPermissions((prev) => ({
            ...prev,
            [module]: {
                ...prev[module],
                [action]: !prev?.[module]?.[action]
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const body = {
                userId: viewDetails?._id,
                role:viewDetails?.role,
                permissions
            };

            console.log("API BODY =>", body);
            const res = await axiosInstance.post("/super-admin/allow-permission", body)
            const msg = res.data.message
            if(res.status===200){
                toast.success(msg)
            }
            console.log(res, "resres==>")
        } catch (error) {
            console.log(error, "==>")
        }
    };

    useEffect(() => {
        if (!viewDetails?._id) return;

        const fetchPermissions = async () => {
            try {
                const res = await axiosInstance.get(
                    `/super-admin/get-permission?id=${viewDetails._id}`
                );
                if (res.data?.permissionData?.permissions) {
                    setPermissions(res.data.permissionData.permissions);
                    setRole(res.data.permissionData.role);
                }
            } catch (error) {
                console.log(error, "permission fetch error");
            }
        };

        fetchPermissions();
    }, [viewDetails?._id]);


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6"
            >
                <h2 className="text-2xl font-semibold mb-6">User Permissions</h2>

                {/* User ID */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">User</label>
                    <input
                        type="text"
                        value={`${viewDetails?.firstName} ${viewDetails?.lastName}`}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Mongo ObjectId"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>

                {/* Role */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <input
                        type="text"
                        value={`${viewDetails?.role}`}
                        onChange={(e) => setUserId(e.target.value)}
                        readOnly
                        placeholder="Mongo ObjectId"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    {/* <select
            value={role}
            
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            <option value="FRANCHISE_ADMIN">FRANCHISE_ADMIN</option>
            <option value="WAREHOUSE_MANAGER">WAREHOUSE_MANAGER</option>
            <option value="STAFF">STAFF</option>
          </select> */}
                </div>

                {/* Permissions */}
                <div className="space-y-6">
                    {Object.entries(modules).map(([module, actions]) => (
                        <div key={module} className="border rounded-xl p-4">
                            <h3 className="font-semibold capitalize mb-3">{module}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {actions.map((action) => (
                                    <label
                                        key={action}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={permissions?.[module]?.[action] || false}
                                            onChange={() => togglePermission(module, action)}
                                            className="w-4 h-4"
                                        />
                                        <span className="capitalize">{action}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submit */}
                <div className="mt-6 text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
                    >
                        Save Permissions
                    </button>
                </div>
            </form>
        </div>
    );
}
