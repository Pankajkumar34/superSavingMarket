import { useEffect, useState } from "react";
import axiosConfig from "../../utils/axios.config";
import { fetchCatalogTree } from "../../utils/thunkApis/product.api";
import BrandVirtualSelect from "../../components/Virtualize/Virtualized";
import SkuInventoryForm from "./SkuInventoryForm";
import { useSelector } from "react-redux";
import { fileUploader } from "../../utils/thunkApis/auth.api";
import FileInput from "../../components/form/input/FileInput";
import { toast } from "react-toastify";
import { uploadMultipleImages } from "../../utils/supabase/supaFileUpload";

export default function ProductInventoryFormFull() {
  const axiosInstance = axiosConfig();
  // const { user } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [catelogTree, setCatalogTree] = useState(null);
  const [skus, setSkus] = useState({});
  // const [subCategory, setSubCategory] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);


  const [form, setForm] = useState({
    product: {
      name: "",
      images: [],
      isActive: true
    },
    // inventory: {
    //   variant: {},
    //   sku: "",
    //   warehouse: "",
    //   quantity: 0,
    //   reservedQty: 0,
    //   costPrice: 0,
    //   sellingPrice: 0,
    //   batchNumber: "",
    //   manufactureDate: "",
    //   expiryDate: "",
    //   serialNumbers: [""],
    //   status: "active",
    //   stockHistory: []
    // }
  });

  /* ==================== HANDLERS ==================== */
  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm(prev => ({
        ...prev,
        product: { ...prev.product, [name]: checked }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        product: { ...prev.product, [name]: value }
      }));
    }
  };







  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await uploadMultipleImages(files);
      // const res = await fileUploader(formData); // ✅ SEND FormData
      // console.log(res, "===> file upload res");
      // const urls = res.filePath.map(urls => urls.url)
      // console.log(urls, "===> urls")
      const urls = res || "";
      const productImg = urls.map(url => ({ url, isPrimary: false, altText: form.product.name }));
      setForm((prev) => ({
        ...prev,
        product: { ...prev.product, images: productImg },
      }));

      // preview
      const previews = files.map((f) => URL.createObjectURL(f));
      setPreviewImages(urls);
    } catch (error) {
      console.log(error, "===> file upload error");
    }


  };

  /* ==================== SUBMIT ==================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { product, inventory } = form;

      const payload = {
        product: {
          ...product,
          brand: brandId?._id || "",
          category: categoryId?._id || "",

        },
        subCategory: subCategoryId?._id || "",
        inventory: skus.inventory,
        skus: skus.skus
      }


      const res = await axiosInstance.post("/super-admin/create-product", payload);
      console.log(res, "===> res product create")
      toast.success("Product & Inventory added successfully");

      // Reset
      setForm({
        product: { name: "", slug: "", brand: "", category: "", subCategory: "", images: [], isActive: true },
      });
      setSkus(null)
      setPreviewImages([]);

    } catch (err) {
      console.log(err);
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchCatalogTree()
      setCatalogTree(res)
    }
    fetch()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-6xl rounded-2xl shadow-lg p-6 space-y-8">
        <h2 className="text-2xl font-semibold">Add Product & Inventory</h2>

        {/* PRODUCT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Product Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="name" value={form.product.name} onChange={handleProductChange} placeholder="Product Name" className="input" required />
            {/* <input type="text" name="slug" value={form.product.slug} onChange={handleProductChange} placeholder="Slug" className="input" /> */}
            <div className="mb-6">

              <BrandVirtualSelect
                value={brandId}
                brands={catelogTree}
                label="Brand"
                onChange={setBrandId}
              />
            </div>
            <div className="mb-6">

              <BrandVirtualSelect
                value={categoryId}
                brands={brandId?.categories || []}
                label="Category"
                onChange={setCategoryId}
              />
            </div>
            <div className="mb-6">

              <BrandVirtualSelect
                value={subCategoryId}
                brands={categoryId?.subCategories || []}
                label="Sub Category"
                onChange={setSubCategoryId}
              />
            </div>

            {/* <input type="number" name="mrp" value={form.product.price.mrp} onChange={handlePriceChange} placeholder="MRP" className="input" /> */}
            {/* <input type="number" name="sellingPrice" value={form.product.price.sellingPrice} onChange={handlePriceChange} placeholder="Selling Price" className="input" /> */}
            {/* <input type="number" name="stock" value={form.product.stock} onChange={handleProductChange} placeholder="Stock" className="input col-span-1 md:col-span-3" /> */}

            <div className="col-span-1 md:col-span-3">
              <label className="text-sm font-medium">Product Images</label>
              <FileInput accept="image/*" multiple={true} onChange={handleImagesChange} className="custom-class" />
              {/* <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="custom-class" /> */}
              <div className="flex gap-4 mt-2 flex-wrap">
                {form?.product?.images?.map((img, i) => (
                  <img key={i} src={img?.url} alt="preview" className="w-24 h-24 object-cover rounded-lg border" />
                ))}
              </div>
            </div>

            <div className="col-span-1 md:col-span-3 flex items-center gap-2">
              <input type="checkbox" name="isActive" checked={form.product.isActive} onChange={handleProductChange} className="w-4 h-4" />
              <label>Active</label>
            </div>
          </div>
        </div>

        {/* INVENTORY */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Inventory Details</h3>
          <SkuInventoryForm productName={form.product.name} categoryType={"grocery"} submitDataHandler={(data) => setSkus(data)} />

        </div>

        {/* SUBMIT */}
        <div className="relative inline-block float-right group">
          <button
            disabled={loading || !skus || Object.keys(skus).length === 0}
            className="bg-[#dc401f] hover:bg-[#11395c] text-white px-6 py-2 rounded-xl
               disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Product & Inventory"}
          </button>

          {/* Tooltip */}
          {!skus || Object.keys(skus).length === 0 && (
            <div
              className="absolute right-0 -top-10 z-50
                 hidden group-hover:block
                 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-lg"
            >
              First save SKUs
            </div>
          )}
        </div>


        {/* <div className="text-right">

          <button disabled={loading || skus?.length<0} className=" bg-[#dc401f] hover:bg-[#11395c] text-white px-6 py-2 rounded-xl disabled:opacity-50">
            {loading ? "Saving..." : "Save Product & Inventory"}
          </button>
        </div> */}
      </form>
    </div>
  );
}
