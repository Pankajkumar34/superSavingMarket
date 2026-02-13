import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosConfig from "../../utils/axios.config";
import { fetchBrandList } from "../../utils/thunkApis/product.api";
import BrandVirtualSelect from "../../components/Virtualize/Virtualized";
import { toast } from "react-toastify";
import Label from "../../components/form/Label";
import FileInput from "../../components/form/input/FileInput";
import { fileUploader } from "../../utils/thunkApis/auth.api";
import ResponsiveImage from "../../components/ui/images/ResponsiveImage";
import { uploadMultipleImages } from "../../utils/supabase/supaFileUpload";

/* ================= FACTORY FUNCTION ================= */
const createEmptyCategory = () => ({
  name: "",
  type: "",
  image: null,
  preview: null,
  isActive: true,
});

export default function CategoryForm() {
  const axiosInstance = axiosConfig();
  const navigate = useNavigate();

  const [brandList, setBrandList] = useState([]);
  const [brand, setBrand] = useState(null);

  const [categories, setCategories] = useState([
    createEmptyCategory(),
  ]);

  const [loading, setLoading] = useState(false);

  /* ================= FETCH BRANDS ================= */
  useEffect(() => {
    fetchBrandList()
      .then(setBrandList)
      .catch(console.error);
  }, []);

  /* ================= HANDLERS ================= */
  const addCategory = () => {
    setCategories((prev) => [...prev, createEmptyCategory()]);
  };

  const removeCategory = (index) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    setCategories((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const handleImage = (index, file) => {
    setCategories((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        image: file,
        preview: file ? URL.createObjectURL(file) : null,
      };
      return updated;
    });
  };
   const handleImagesChange = async (e,index) => {
          const files = Array.from(e.target.files);
      
          const formData = new FormData();
          files.forEach((file) => {
            formData.append("files", file);
          });
      
          try {
            const urls = await uploadMultipleImages(files);
            
            // const res = await fileUploader(formData); // ✅ SEND FormData
            // console.log(res, "===> file upload res");
            // const urls = res.filePath.map(urls => urls.url)
            console.log(urls, "===> urls")
            setCategories(prev => {
              const updated = [...prev];
              updated[index] = { ...updated[index], image: urls[0] };
              return updated;
            });
            
          } catch (error) {
            console.log(error, "===> file upload error");
          }
        };
      

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brand) {
      toast.error("Please select a brand");
      return;
    }

    setLoading(true);

    try {
      const payload = categories.map((cat) => ({
        name: cat.name.trim(),
        type: cat.type,
        isActive: cat.isActive,
        image: cat.image,
        brandId: brand._id,
      }));

      await axiosInstance.post(
        "/super-admin/add-category",
        { categories: payload }
      );

      toast.success("Categories created successfully");
      navigate("/add-product/subcategory-add");
    } catch (err) {
      console.error(err);
      toast.error("Category creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-xl font-semibold">
          Add Multiple Categories
        </h2>

        <button
          type="button"
          onClick={addCategory}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Category
        </button>
      </div>

      {/* BRAND SELECT */}
      <div className="mb-6">
        <label className="text-sm font-medium">Select Brand</label>
        <BrandVirtualSelect
          value={brand}
          brands={brandList}
          onChange={setBrand}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 relative bg-gray-50"
          >
            {categories.length > 1 && (
              <button
                type="button"
                onClick={() => removeCategory(index)}
                className="absolute top-3 right-3 text-red-500"
              >
                ✕
              </button>
            )}

            <h3 className="font-medium mb-4">
              Category #{index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* NAME */}
              <input
                placeholder="Category Name"
                value={cat.name}
                onChange={(e) =>
                  handleChange(index, "name", e.target.value)
                }
                className="border rounded-lg px-3 py-2"
                required
              />

              {/* TYPE */}
              <select
                value={cat.type}
                onChange={(e) =>
                  handleChange(index, "type", e.target.value)
                }
                className="border rounded-lg px-3 py-2"
                required
              >
                <option value="">Select Type</option>
                <option value="grocery">Grocery</option>
                <option value="electronics">Electronics</option>
              </select>

              {/* ACTIVE */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={cat.isActive}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "isActive",
                      e.target.checked
                    )
                  }
                />
                Active
              </label>
            </div>

            {/* IMAGE */}
            
            <div className="mt-4 flex items-center gap-4">
              <div>
              <Label>Upload Logo</Label>
              <FileInput accept="image/*" multiple={false} onChange={(e) => handleImagesChange(e, index)} className="custom-class" />
            </div>
            <div>

              {cat.image && (
                <div className="w-32 h-32 border rounded-lg overflow-hidden">
                  <ResponsiveImage
                    src={cat.image}
                    alt={`Category ${index + 1} Logo`}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
              {/*  */}
            </div>
          </div>
        ))}

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            disabled={loading}
            className=" bg-[#dc401f] hover:bg-[#11395c] text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Categories"}
          </button>
        </div>
      </form>
    </div>
  );
}
