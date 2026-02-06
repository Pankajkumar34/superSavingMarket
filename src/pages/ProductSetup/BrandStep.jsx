import { useState } from "react";
import axiosConfig from "../../utils/axios.config";
import { useNavigate } from "react-router";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import Label from "../../components/form/Label";
import FileInput from "../../components/form/input/FileInput";
import ResponsiveImage from "../../components/ui/images/ResponsiveImage";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const emptyBrand = {
    name: "",
    slug: "",
    logo: "http://localhost:5173/src/assets/svgLogo.svg",
    description: "",
    country: "",
    isActive: true,
    seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: ""
    }
};

export default function AddBrand() {
    const axiosInstance = axiosConfig();
    const navigate = useNavigate();
    const { user } = useSelector(
        (state) => state.auth
    );


    const [brands, setBrands] = useState([emptyBrand]);
    const [loading, setLoading] = useState(false);

    /* ================= HELPERS ================= */
    const generateSlug = (text) =>
        text.toLowerCase().replace(/ /g, "-");

    /* ================= HANDLERS ================= */
    const addBrand = () => {
        setBrands([...brands, emptyBrand]);
    };

    const removeBrand = (index) => {
        setBrands(brands.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, value) => {
        const updated = [...brands];
        updated[index][field] = value;

        if (field === "name") {
            updated[index].slug = generateSlug(value);
            updated[index].seo.metaTitle = value;
        }

        setBrands(updated);
    };

    const handleSeoChange = (index, field, value) => {
        const updated = [...brands];
        updated[index].seo[field] = value;
        setBrands(updated);
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);

        try {
            const brandArr = brands.map(brand => ({
                ...brand,
                addedBy: user?._id || ""
            }));
            const res = await axiosInstance.post("/super-admin/add-brand", {
                brands: brandArr
            });
            console.log(res, "====>");

            toast.success("Brands created successfully");
            navigate(`/add-product/category-add/${"3444"}`);
            setBrands([emptyBrand]);
        } catch (error) {
            console.log(error);
            alert("Error creating brands");
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-6xl rounded-2xl shadow-lg p-6 space-y-8"
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">
                        Create Multiple Brands
                    </h2>

                    <button
                        type="button"
                        onClick={addBrand}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                    >
                        + Add Brand
                    </button>
                </div>

                {/* ================= BRAND LIST ================= */}
                {brands.map((brand, index) => (
                    <div
                        key={index}
                        className="border rounded-xl p-4 space-y-4 relative"
                    >
                        {brands.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeBrand(index)}
                                className="absolute top-3 right-3 text-red-500"
                            >
                                ✕
                            </button>
                        )}

                        <h3 className="font-semibold">
                            Brand #{index + 1}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                placeholder="Brand Name"
                                value={brand.name}
                                onChange={(e) =>
                                    handleChange(index, "name", e.target.value)
                                }
                                className="input"
                                required
                            />

                            <input
                                placeholder="Slug"
                                value={brand.slug}
                                readOnly
                                className="input bg-gray-100"
                            />

                            <input
                                placeholder="Country"
                                value={brand.country}
                                onChange={(e) =>
                                    handleChange(index, "country", e.target.value)
                                }
                                className="input"
                            />
                            <div>
                                <Label>Upload Logo</Label>
                                <FileInput className="custom-class" />
                            </div>
                            <div>
                                <ResponsiveImage />
                            </div>

                        </div>

                        <textarea
                            placeholder="Description"
                            value={brand.description}
                            onChange={(e) =>
                                handleChange(index, "description", e.target.value)
                            }
                            className="input w-full"
                        />

                        {/* ================= SEO ================= */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <p className="text-sm font-medium text-gray-600">
                                SEO Details
                            </p>

                            <input
                                placeholder="Meta Title"
                                value={brand.seo.metaTitle}
                                onChange={(e) =>
                                    handleSeoChange(index, "metaTitle", e.target.value)
                                }
                                className="input"
                            />

                            <textarea
                                placeholder="Meta Description"
                                value={brand.seo.metaDescription}
                                onChange={(e) =>
                                    handleSeoChange(index, "metaDescription", e.target.value)
                                }
                                className="input"
                            />

                            <input
                                placeholder="Keywords (comma separated)"
                                value={brand.seo.keywords}
                                onChange={(e) =>
                                    handleSeoChange(index, "keywords", e.target.value)
                                }
                                className="input"
                            />
                        </div>
                    </div>
                ))}

                {/* ================= SUBMIT ================= */}
                <div className="text-right">
                    <button
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save All Brands"}
                    </button>
                </div>
            </form>
        </div>
    );
}
