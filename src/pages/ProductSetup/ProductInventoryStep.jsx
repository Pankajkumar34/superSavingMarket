import { useState } from "react";
import axiosConfig from "../../utils/axios.config";

export default function ProductInventoryFormFull({ brandId, categoryId, subCategoryId }) {
  const axiosInstance = axiosConfig();
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [form, setForm] = useState({
    product: {
      name: "",
      slug: "",
      brand: brandId || "",
      category: categoryId || "",
      subCategory: subCategoryId || "",
      images: [],
      price: { mrp: "", sellingPrice: "" },
      stock: 0,
      isActive: true
    },
    inventory: {
      variant: {},
      sku: "",
      warehouse: "",
      quantity: 0,
      reservedQty: 0,
      costPrice: 0,
      sellingPrice: 0,
      batchNumber: "",
      manufactureDate: "",
      expiryDate: "",
      serialNumbers: [""],
      status: "active",
      stockHistory: []
    }
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

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      product: { ...prev.product, price: { ...prev.product.price, [name]: value } }
    }));
  };

  const handleInventoryChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "serialNumbers") {
      const serials = [...form.inventory.serialNumbers];
      serials[index] = value;
      setForm(prev => ({ ...prev, inventory: { ...prev.inventory, serialNumbers: serials } }));
    } else {
      setForm(prev => ({
        ...prev,
        inventory: { ...prev.inventory, [name]: value }
      }));
    }
  };

  const handleVariantChange = (key, value) => {
    setForm(prev => ({
      ...prev,
      inventory: { ...prev.inventory, variant: { ...prev.inventory.variant, [key]: value } }
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setForm(prev => ({
      ...prev,
      product: { ...prev.product, images: files }
    }));

    const previews = files.map(f => URL.createObjectURL(f));
    setPreviewImages(previews);
  };

  /* ==================== ADD SERIAL ==================== */
  const addSerial = () => {
    setForm(prev => ({
      ...prev,
      inventory: { ...prev.inventory, serialNumbers: [...prev.inventory.serialNumbers, ""] }
    }));
  };

  /* ==================== SUBMIT ==================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      const { product, inventory } = form;

      // Product
      data.append("name", product.name);
      data.append("slug", product.slug);
      data.append("brand", product.brand);
      data.append("category", product.category);
      data.append("subCategory", product.subCategory);
      data.append("stock", product.stock);
      data.append("isActive", product.isActive);
      data.append("price[mrp]", product.price.mrp);
      data.append("price[sellingPrice]", product.price.sellingPrice);

      product.images.forEach(img => data.append("images", img));

      // Inventory
      Object.keys(inventory).forEach(key => {
        if (key === "serialNumbers") {
          inventory.serialNumbers.forEach(sn => data.append("serialNumbers[]", sn));
        } else if (key === "variant") {
          Object.keys(inventory.variant).forEach(vk => data.append(`variant[${vk}]`, inventory.variant[vk]));
        } else {
          data.append(key, inventory[key]);
        }
      });

      await axiosInstance.post("/product/add-with-inventory", data);

      alert("Product & Inventory added successfully");

      // Reset
      setForm({
        product: { name: "", slug: "", brand: brandId || "", category: categoryId || "", subCategory: subCategoryId || "", images: [], price: { mrp: "", sellingPrice: "" }, stock: 0, isActive: true },
        inventory: { variant: {}, sku: "", warehouse: "", quantity: 0, reservedQty: 0, costPrice: 0, sellingPrice: 0, batchNumber: "", manufactureDate: "", expiryDate: "", serialNumbers: [""], status: "active", stockHistory: [] }
      });
      setPreviewImages([]);

    } catch (err) {
      console.log(err);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-6xl rounded-2xl shadow-lg p-6 space-y-8">
        <h2 className="text-2xl font-semibold">Add Product & Inventory</h2>

        {/* PRODUCT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Product Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="name" value={form.product.name} onChange={handleProductChange} placeholder="Product Name" className="input" required />
            <input type="text" name="slug" value={form.product.slug} onChange={handleProductChange} placeholder="Slug" className="input" />
            <input type="text" name="brand" value={form.product.brand} onChange={handleProductChange} placeholder="Brand ID" className="input" required />
            <input type="text" name="category" value={form.product.category} onChange={handleProductChange} placeholder="Category ID" className="input" required />
            <input type="text" name="subCategory" value={form.product.subCategory} onChange={handleProductChange} placeholder="SubCategory ID" className="input" />
            <input type="number" name="mrp" value={form.product.price.mrp} onChange={handlePriceChange} placeholder="MRP" className="input" />
            <input type="number" name="sellingPrice" value={form.product.price.sellingPrice} onChange={handlePriceChange} placeholder="Selling Price" className="input" />
            <input type="number" name="stock" value={form.product.stock} onChange={handleProductChange} placeholder="Stock" className="input col-span-1 md:col-span-3" />

            <div className="col-span-1 md:col-span-3">
              <label className="text-sm font-medium">Product Images</label>
              <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="mt-2" />
              <div className="flex gap-4 mt-2 flex-wrap">
                {previewImages.map((img, i) => (
                  <img key={i} src={img} alt="preview" className="w-24 h-24 object-cover rounded-lg border" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="sku" value={form.inventory.sku} onChange={handleInventoryChange} placeholder="SKU" className="input" required />
            <input type="text" name="warehouse" value={form.inventory.warehouse} onChange={handleInventoryChange} placeholder="Warehouse ID" className="input" />
            <input type="number" name="quantity" value={form.inventory.quantity} onChange={handleInventoryChange} placeholder="Quantity" className="input" />
            <input type="number" name="reservedQty" value={form.inventory.reservedQty} onChange={handleInventoryChange} placeholder="Reserved Qty" className="input" />
            <input type="number" name="costPrice" value={form.inventory.costPrice} onChange={handleInventoryChange} placeholder="Cost Price" className="input" />
            <input type="number" name="sellingPrice" value={form.inventory.sellingPrice} onChange={handleInventoryChange} placeholder="Selling Price" className="input" />

            <input type="text" name="batchNumber" value={form.inventory.batchNumber} onChange={handleInventoryChange} placeholder="Batch Number" className="input" />
            <input type="date" name="manufactureDate" value={form.inventory.manufactureDate} onChange={handleInventoryChange} placeholder="Manufacture Date" className="input" />
            <input type="date" name="expiryDate" value={form.inventory.expiryDate} onChange={handleInventoryChange} placeholder="Expiry Date" className="input" />

            {/* Serial Numbers */}
            {form.inventory.serialNumbers.map((sn, i) => (
              <input key={i} type="text" value={sn} onChange={(e) => handleInventoryChange({...e, target:{...e.target, name:"serialNumbers"}}, i)} placeholder="Serial Number" className="input" />
            ))}
            <button type="button" onClick={addSerial} className="col-span-1 md:col-span-3 bg-gray-200 rounded px-4 py-2">Add Serial Number</button>

            <select name="status" value={form.inventory.status} onChange={handleInventoryChange} className="input col-span-1 md:col-span-3">
              <option value="active">Active</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="expired">Expired</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="text-right">
          <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl disabled:opacity-50">
            {loading ? "Saving..." : "Save Product & Inventory"}
          </button>
        </div>
      </form>
    </div>
  );
}
