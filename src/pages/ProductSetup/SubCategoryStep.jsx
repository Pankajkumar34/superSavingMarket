import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosConfig from "../../utils/axios.config";

export default function SubCategoryForm() {
            const axiosInstance = axiosConfig();

  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [form, setForm] = useState({
    name: "",
    isActive: true,
    image: null
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= INPUT ================= */
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
      fd.append("name", form.name);
      fd.append("categoryId", categoryId);
      fd.append("isActive", form.isActive);
      if (form.image) fd.append("image", form.image);

    //   const res = await axiosInstance.post("/subcategory/add", fd);

      // 👉 next step product + inventory
      navigate(`/add-product/product`);
    } catch (err) {
      console.log(err);
      alert("SubCategory create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 border-b pb-3">
        Add Sub Category
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        {/* Name */}
        <div className="col-span-2">
          <label className="text-sm font-medium">Sub Category Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Eg: Android Phones, Fresh Fruits"
            className="w-full mt-1 border rounded-lg px-3 py-2"
          />
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

        {/* Image */}
        <div className="col-span-2">
          <label className="text-sm font-medium">Sub Category Image</label>
          <div className="flex items-center gap-4 mt-2">
            <input type="file" accept="image/*" onChange={handleImage} />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-24 h-24 rounded-lg object-cover border"
              />
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
