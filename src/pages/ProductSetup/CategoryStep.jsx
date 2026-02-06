import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosConfig from "../../utils/axios.config";
import { fetchBrandList } from "../../utils/thunkApis/product.api";
import BrandSelect from "../../components/Virtualize/Virtualized";

export default function CategoryForm() {
  const axiosInstance = axiosConfig();

  const navigate = useNavigate();
  // const { brandId } = useParams();
const [brandList, setBrandList] = useState([]);
const [brandId, setBrandId] = useState("");

  const [form, setForm] = useState({
    name: "",
    type: "",
    image: null,
    isActive: true
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  /* ================= IMAGE ================= */
  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      // fd.append("name", form.name);
      // fd.append("type", form.type);
      // fd.append("brandId", brandId);
      // fd.append("isActive", form.isActive);
      // if (form.image) fd.append("image", form.image);

      const res = await axiosInstance.post("/category/create", fd, {
        headers: { "Content-Type": "multipart/form-data" }

      });

      navigate(`/add-product/subcategory-add/${"3333"}`);
    } catch (err) {
      console.log(err);
      alert("Category create failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchBrandList();
        setBrandList(data);
        console.log(data,"barnd list==>");
      } catch (error) {
        console.log(error);
      }
    }
    fetch()
  }, []);


  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 border-b pb-3">
        Add Category
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="text-sm font-medium">Brans List</label>
          <BrandSelect
  brands={brandList}
  value={brandId}
  onChange={(e) => setBrandId(e.target.value)}
/>

          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Eg: Mobiles, Fruits"
            className="w-full mt-1 border rounded-lg px-3 py-2"
          />
        </div>
        {/* Category Name */}
        <div className="col-span-2">
          <label className="text-sm font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Eg: Mobiles, Fruits"
            className="w-full mt-1 border rounded-lg px-3 py-2"
          />
        </div>

        {/* Type */}
        <div>
          <label className="text-sm font-medium">Category Type</label>
          <select
            name="type"
            required
            value={form.type}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-3 py-2"
          >
            <option value="">Select Type</option>
            <option value="grocery">Grocery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>

        {/* Active */}
        <div className="flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-sm">Active</label>
        </div>

        {/* Image Upload */}
        <div className="col-span-2">
          <label className="text-sm font-medium">Category Image</label>
          <div className="flex gap-4 items-center mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-24 h-24 object-cover rounded-lg border"
              />
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
