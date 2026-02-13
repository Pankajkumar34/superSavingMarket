import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosConfig from "../../utils/axios.config";
import BrandVirtualSelect from "../../components/Virtualize/Virtualized";
import { fetchCategoryList } from "../../utils/thunkApis/product.api";
import { toast } from "react-toastify";
import { fileUploader } from "../../utils/thunkApis/auth.api";
import Label from "../../components/form/Label";
import FileInput from "../../components/form/input/FileInput";
import ResponsiveImage from "../../components/ui/images/ResponsiveImage";
import { uploadMultipleImages } from "../../utils/supabase/supaFileUpload";

/* ================= FACTORY FUNCTION ================= */
const createEmptySubCategory = () => ({
  name: "",
  isActive: true,
  image: null,
  preview: null,
});

export default function SubCategoryForm() {
  const axiosInstance = axiosConfig();
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState(null);
  // const [brandList, setBrandList] = useState([]);


  const [subCategories, setSubCategories] = useState([
    createEmptySubCategory(),
  ]);

  const [loading, setLoading] = useState(false);

  /* ================= FETCH CATEGORY LIST ================= */
  useEffect(() => {
    fetchCategoryList()
      .then(setCategoryList)
      .catch(console.error);
  }, []);

  /* ================= HANDLERS ================= */
  const addSubCategory = () => {
    setSubCategories((prev) => [
      ...prev,
      createEmptySubCategory(),
    ]);
  };

  const removeSubCategory = (index) => {
    setSubCategories((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleChange = (index, field, value) => {
    setSubCategories((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const handleImage = (index, file) => {
    setSubCategories((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        image: file,
        preview: file ? URL.createObjectURL(file) : null,
      };
      return updated;
    });
  };
  const handleImagesChange = async (e, index) => {
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
      setSubCategories(prev => {
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

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);

    try {
      const payload = subCategories.map((sub) => ({
        name: sub.name.trim(),
        isActive: sub.isActive,
        categoryId: category._id,
        image: sub.image,
      }));

      await axiosInstance.post(
        "/super-admin/add-sub-category",
        { subCategories: payload }
      );

      toast.success("Sub Categories created successfully");
      navigate("/add-product/product");
    } catch (err) {
      console.error(err);
      toast.error("Sub Category creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-xl font-semibold">
          Add Multiple Sub Categories
        </h2>

        <button
          type="button"
          onClick={addSubCategory}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Sub Category
        </button>
      </div>

      {/* CATEGORY SELECT */}
      <div className="mb-6">
        <label className="text-sm font-medium">
          Select Category
        </label>
        <BrandVirtualSelect
          value={category}
          brands={categoryList}
          label="Category"
          onChange={setCategory}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {subCategories.map((sub, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 bg-gray-50 relative"
          >
            {subCategories.length > 1 && (
              <button
                type="button"
                onClick={() => removeSubCategory(index)}
                className="absolute top-3 right-3 text-red-500"
              >
                ✕
              </button>
            )}

            <h3 className="font-medium mb-4">
              Sub Category #{index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                placeholder="Sub Category Name"
                value={sub.name}
                onChange={(e) =>
                  handleChange(index, "name", e.target.value)
                }
                className="border rounded-lg px-3 py-2"
                required
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={sub.isActive}
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

                {sub.image && (
                  <div className="w-32 h-32 border rounded-lg overflow-hidden">
                    <ResponsiveImage
                      src={sub.image}
                      alt={`Sub Category ${index + 1} Logo`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
              {/*  */}
            </div>
            {/* <div className="mt-4 flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImage(index, e.target.files[0])
                }
              />

              {sub.preview && (
                <img
                  src={sub.preview}
                  alt="preview"
                  className="w-20 h-20 rounded-lg object-cover border"
                />
              )}
            </div> */}
          </div>
        ))}

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            disabled={loading}
            className=" bg-[#dc401f] hover:bg-[#11395c] text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Sub Categories"}
          </button>
        </div>
      </form>
    </div>
  );
}
