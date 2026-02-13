import { useState } from "react";
import { toast } from "react-toastify";

const emptySku = {
    sku: "",
    price: "",
    stock: "",
    attributes: {
        weight: "",
        unit: "",
        size: "",
        color: "",
        storage: "",

    },
    isActive: true,
};
const emptyInventory = {

    //   serialNumbers: [""],
    quantity: 0,
    costPrice: 0,
    batchNumber: "",
    manufactureDate: "",
    expiryDate: ""
}
export default function SkuInventoryForm({
    productName,
    submitDataHandler,
    categoryType, // "grocery" | "electronics" | "clothes"
}) {
    const [invantories, setInvantories] = useState([{ ...emptyInventory }]);

    const [skus, setSkus] = useState([{ ...emptySku }]);
    const [loading, setLoading] = useState(false);

    /* ================= ADD / REMOVE ================= */
    const addSku = () => {
        setInvantories([...invantories, { ...emptyInventory }]);
        setSkus([...skus, { ...emptySku, ...emptyInventory }]);
    };

    const removeSku = (index) => {
        setInvantories(invantories.filter((_, i) => i !== index));
        setSkus(skus.filter((_, i) => i !== index));
    };

    /* ================= CHANGE ================= */
    const handleChange = (index, field, value) => {
        const updated = [...skus];
        updated[index][field] = value;
        setSkus(updated);
    };
    const handleInventoryChange = (index, field, value) => {
        const updated = [...invantories];
        updated[index][field] = value;
        setInvantories(updated);
    };
    const handleAttrChange = (index, field, value) => {
        const updated = [...skus];
        updated[index].attributes[field] = value;
        setSkus(updated);
    };

    /* ================= VALIDATION ================= */
    const validate = () => {
        for (let i = 0; i < skus.length; i++) {
            const s = skus[i];
            if (!s.price || !s.stock) {
                toast.error(`Price & Stock required in SKU #${i + 1}`);
                return false;
            }

            if (
                categoryType === "grocery" &&
                (!s.attributes.weight || !s.attributes.unit)
            ) {
                toast.error(`Weight required in SKU #${i + 1}`);
                return false;
            }

            if (
                categoryType === "electronics" &&
                !s.attributes.storage
            ) {
                toast.error(`Storage required in SKU #${i + 1}`);
                return false;
            }

            if (
                categoryType === "clothes" &&
                !s.attributes.size
            ) {
                toast.error(`Size required in SKU #${i + 1}`);
                return false;
            }
        }
        return true;
    };

    /* ================= SUBMIT ================= */
    const handleSubmitSku = async (e) => {
        e.preventDefault()
        if (!validate()) return;

        setLoading(true);

        try {
            const payload = skus.map((s) => ({
                sku:
                    s.sku ||
                    `${productName}-${Object.values(s.attributes)
                        .filter(Boolean)
                        .join("-")}`,
                price: Number(s.price),
                stock: Number(s.stock),
                attributes: s.attributes,
                isActive: s.isActive,
            }));
            const invPayload = invantories.map(inv => ({
                sku:
                    `${productName}-${Object.values(skus[invantories.indexOf(inv)].attributes)
                        .filter(Boolean)
                        .join("-")}`,
                warehouse: inv.warehouse,
                quantity: Number(inv.quantity),
                costPrice: Number(inv.costPrice),
                batchNumber: inv.batchNumber,
                manufactureDate: inv.manufactureDate,
                expiryDate: inv.expiryDate,
            }))
            const finalPayload = {
                skus: payload,
                inventory: invPayload
            };
            console.log(finalPayload, "===> Final Payload");

            await submitDataHandler(finalPayload);

            toast.success("SKUs added successfully");
            setSkus([{ ...emptySku }]);
        } catch (err) {
            console.error(err);
            toast.error("SKU creation failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow p-6 space-y-6 my-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                    Inventory (Multiple SKUs)
                </h3>

                <button
                    type="button"
                    onClick={addSku}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add SKU
                </button>
            </div>

            {skus.map((sku, index) => (
                <div
                    key={index}
                    className="border rounded-xl p-4 bg-gray-50 relative"
                >
                    {skus.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeSku(index)}
                            className="absolute top-3 right-3 text-red-500"
                        >
                            ✕
                        </button>
                    )}

                    <h4 className="font-medium mb-4">
                        SKU #{index + 1}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {/* PRICE */}
                        <input
                            placeholder="Price"
                            type="number"
                            value={sku.price}
                            onChange={(e) =>
                                handleChange(index, "price", e.target.value)
                            }
                            className="border rounded-lg px-3 py-2"
                        />

                        {/* STOCK */}
                        <input
                            placeholder="Stock"
                            type="number"
                            value={sku.stock}
                            onChange={(e) =>
                                handleChange(index, "stock", e.target.value)
                            }
                            className="border rounded-lg px-3 py-2"
                        />

                        {/* GROCERY */}
                        {categoryType === "grocery" && (
                            <>
                                <input
                                    placeholder="Weight"
                                    value={sku.attributes.weight}
                                    onChange={(e) =>
                                        handleAttrChange(
                                            index,
                                            "weight",
                                            e.target.value
                                        )
                                    }
                                    className="border rounded-lg px-3 py-2"
                                />

                                <select
                                    value={sku.attributes.unit}
                                    onChange={(e) =>
                                        handleAttrChange(
                                            index,
                                            "unit",
                                            e.target.value
                                        )
                                    }
                                    className="border rounded-lg px-3 py-2"
                                >
                                    <option value="">Unit</option>
                                    <option value="g">g</option>
                                    <option value="kg">kg</option>
                                    <option value="ml">ml</option>
                                    <option value="l">L</option>
                                </select>
                            </>
                        )}

                        {/* ELECTRONICS */}
                        {categoryType === "electronics" && (
                            <>
                                <input
                                    placeholder="Storage (64GB)"
                                    value={sku.attributes.storage}
                                    onChange={(e) =>
                                        handleAttrChange(
                                            index,
                                            "storage",
                                            e.target.value
                                        )
                                    }
                                    className="border rounded-lg px-3 py-2"
                                />

                                <input
                                    placeholder="Color"
                                    value={sku.attributes.color}
                                    onChange={(e) =>
                                        handleAttrChange(
                                            index,
                                            "color",
                                            e.target.value
                                        )
                                    }
                                    className="border rounded-lg px-3 py-2"
                                />
                            </>
                        )}

                        {/* CLOTHES */}
                        {categoryType === "clothes" && (
                            <>
                                <input
                                    placeholder="Size (M, L)"
                                    value={sku.attributes.size}
                                    onChange={(e) =>
                                        handleAttrChange(
                                            index,
                                            "size",
                                            e.target.value
                                        )
                                    }
                                    className="border rounded-lg px-3 py-2"
                                />

                                <input
                                    placeholder="Color"
                                    value={sku.attributes.color}
                                    onChange={(e) =>
                                        handleAttrChange(
                                            index,
                                            "color",
                                            e.target.value
                                        )
                                    }
                                    className="border rounded-lg px-3 py-2"
                                />
                            </>
                        )}

                    </div>
                </div>
            ))}
            {
                invantories.map((inv, index) => {
                    return (
                        <div key={index} className="border rounded-xl p-4 bg-gray-50 relative">
                            <h5 className="mb-2">Inventory #{index + 1}</h5>
                            {invantories.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeSku(index)}
                                    className="absolute top-3 right-3 text-red-500"
                                >
                                    ✕
                                </button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-xl p-4 bg-gray-50 relative" key={index}>

                                {/* <input type="text" name="sku" value={form.inventory.sku} onChange={handleInventoryChange} placeholder="SKU" className="input" required /> */}
                                {/* <input type="text" name="warehouse" value={form.inventory.warehouse} onChange={handleInventoryChange} placeholder="Warehouse ID" className="input" /> */}
                                {/* <input type="number" name="quantity" value={form.inventory.quantity} onChange={handleInventoryChange} placeholder="Quantity" className="input" />
            <input type="number" name="reservedQty" value={form.inventory.reservedQty} onChange={handleInventoryChange} placeholder="Reserved Qty" className="input" /> */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mt-4 mb-1" htmlFor="costPrice">Cost Price</label>
                                    <input type="number" name="costPrice" value={inv.costPrice} onChange={(e) => handleInventoryChange(index, "costPrice", e.target.value)} placeholder="Cost Price" className="input" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mt-4 mb-1" htmlFor="quantity">Quantity</label>
                                    <input type="number" name="quantity" value={inv.quantity} onChange={(e) => handleInventoryChange(index, "quantity", e.target.value)} placeholder="Quantity" className="input" />
                                </div>
                                <div>


                                    <label className="block text-sm font-medium text-gray-700 mt-4 mb-1" htmlFor="batchNumber">Batch Number</label>
                                    <input type="text" name="batchNumber" value={inv.batchNumber} onChange={(e) => handleInventoryChange(index, "batchNumber", e.target.value)} placeholder="Batch Number" className="input" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mt-4 mb-1" htmlFor="manufactureDate">Manufacture Date</label>
                                    <input type="date" name="manufactureDate" value={inv.manufactureDate} onChange={(e) => handleInventoryChange(index, "manufactureDate", e.target.value)} placeholder="Manufacture Date" className="input" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mt-4 mb-1" htmlFor="expiryDate">Expiry Date</label>
                                    <input type="date" name="expiryDate" value={inv.expiryDate} onChange={(e) => handleInventoryChange(index, "expiryDate", e.target.value)} placeholder="Expiry Date" className="input" />
                                </div>
                                {/* Serial Numbers */}
                                {/* {form.inventory.serialNumbers.map((sn, i) => (
                                <input key={i} type="text" value={sn} onChange={(e) => handleInventoryChange({ ...e, target: { ...e.target, name: "serialNumbers" } }, i)} placeholder="Serial Number" className="input" />
                            ))}
                            <button type="button" onClick={addSerial} className="col-span-1 md:col-span-3 bg-gray-200 rounded px-4 py-2">Add Serial Number</button> */}

                                {/* <select name="status" value={form.inventory.status} onChange={handleInventoryChange} className="input col-span-1 md:col-span-3">
              <option value="active">Active</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="expired">Expired</option>
              <option value="damaged">Damaged</option>
            </select> */}
                            </div>
                        </div>
                    )
                })
            }


            <div className="flex justify-end">
                <button
                    disabled={loading}
                    onClick={handleSubmitSku}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    {loading ? "Saving..." : "Save All SKUs"}
                </button>
            </div>
        </div>
    );
}
