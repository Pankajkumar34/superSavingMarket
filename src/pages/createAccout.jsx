import React, { useState } from "react";
import axiosConfig from "../utils/axios.config";
import { fileUploader } from "../utils/thunkApis/auth.api";
import CropModal from "../components/reactCrop/cropFile";
import { getCroppedImg } from "../components/reactCrop/helperCrop";
import PreviewFile from "../components/pdfCanverter/previewFile";
import { useNavigate } from "react-router";
import ProfileUploader from "../components/ui/profileUploadButton/uploaderProfile";
import { uploadMultipleImages } from "../utils/supabase/supaFileUpload";



const roles = [
    { label: "User", value: "USER" },
    // { label: "Super Admin", value: "SUPER_ADMIN" },
    { label: "Franchise Admin", value: "FRANCHISE_ADMIN" },
    { label: "Warehouse Admin", value: "WAREHOUSE_ADMIN" }
];

const DocPreview = ({ label, image, onRemove }) => {
    if (!image) return null;

    return (
        <div className="border rounded-lg p-2 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <img
                src={image}
                alt={label}
                className="h-32  object-cover rounded"
            />
            <button
                onClick={onRemove}
                className="mt-2 text-xs text-red-600 hover:underline"
            >
                Remove
            </button>
        </div>
    );
};


const CreateAccount = () => {
    const [step, setStep] = useState(1);
    const axiosInstance = axiosConfig()
    const [cropImage, setCropImage] = useState(null);
    const [showCrop, setShowCrop] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [profileImgUrl, setProfileImgUrl] = useState("")
    const [croppedImage, setCroppedImage] = useState("");
    const [rawImage, setRawImage] = useState(null);
    const [cropField, setCropField] = useState("");

    const navigate = useNavigate()


    const [docPreview, setDocPreview] = useState({
        aadhaarFront: null,
        aadhaarBack: null,
        panImage: null,
        passportPhoto: null
    });


    const [formData, setFormData] = useState({
        // ===== Basic Details =====
        name: "",
        firstName: "",
        profileImage: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        countryCode: "+91",
        role: "",

        // ===== Government Docs =====
        aadhaarNumber: "",
        aadhaarFront: null,
        aadhaarBack: null,
        panNumber: "",
        panImage: null,
        passportPhoto: null,

        // ===== Bank Details =====
        accountHolderName: "",
        bankAccountNumber: "",
        ifscCode: "",
        bankName: "",
        branchName: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleFileChange = async (e) => {
        const { name, files } = e.target;

        const file = files[0];
        if (!file) return;
        // 🔥 ONLY PASSPORT PHOTO → CROP
        if (name === "passportPhoto") {
            const localUrl = URL.createObjectURL(file);

            setCropImage(localUrl);
            setCropField(name);
            setShowCrop(true);
            return;
        }

        // ❌ ALL OTHER DOCS → DIRECT UPLOAD
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            // const res = await fileUploader(uploadData);
            // const url = res?.filePath?.[0]?.url;
            const urls = await uploadMultipleImages(file);
            const url = urls?.[0];

            setFormData((prev) => ({ ...prev, [name]: url }));
            setDocPreview((prev) => ({ ...prev, [name]: url }));
        } catch (err) {
            console.error("Upload failed");
        }
    };
    const handlePassportCrop = async (croppedAreaPixels) => {
        try {
            const croppedBase64 = await getCroppedImg(
                cropImage,
                croppedAreaPixels
            );

            const blob = await (await fetch(croppedBase64)).blob();

            const uploadData = new FormData();
            uploadData.append("file", blob, "passport.jpg");
            const file = new File([blob], `passport_${Date.now()}.jpg`, {
                type: "image/jpeg",
            });
            const urls = await uploadMultipleImages(file);
            console.log(urls, "===>");
            const url = urls?.[0];
            // const res = await fileUploader(uploadData);
            // const url = res?.filePath?.[0]?.url;

            setFormData((prev) => ({
                ...prev,
                passportPhoto: url
            }));

            setDocPreview((prev) => ({
                ...prev,
                passportPhoto: url
            }));

            setShowCrop(false);
        } catch (error) {
            console.error("Passport crop upload failed");
        }
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const res = await axiosInstance.post("/super-admin/create-account", {
                name: formData.name,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                countryCode: formData.countryCode,
                phoneNumber: formData.phoneNumber,
                role: formData.role,
                aadhaarNumber: formData.aadhaarNumber,
                aadhaarFront: formData.aadhaarFront,
                aadhaarBack: formData.aadhaarBack,
                panNumber: formData.panNumber,
                panImage: formData.panImage,
                passportPhoto: formData.passportPhoto,
                accountHolderName: formData.accountHolderName,
                bankAccountNumber: formData.bankAccountNumber,
                ifscCode: formData.ifscCode,
                bankName: formData.bankName,
                branchName: formData.branchName,
                profileImage: formData.profileImage
            })

            // console.log(res, "resres=>res")
            if (res.status === 201) {
                setIsLoading(false)
                navigate("/franchises-list")
            }

        } catch (error) {
            setIsLoading(false)
            console.log(error, "====>")
        }
    };



    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">

            {/* Header */}
            <div className="mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Create Franchise Account
                </h2>
                <p className="text-sm text-gray-500">
                    Fill all details to create a new account
                </p>
            </div>
            {showCrop && (
                <CropModal
                    image={cropImage}
                    aspect={3 / 4}   // ✅ PASSPORT SIZE
                    onComplete={handlePassportCrop}
                    onClose={() => setShowCrop(false)}
                />
            )}
            {docPreview.passportPhoto && (
                <img
                    src={docPreview.passportPhoto}
                    alt="passport"
                    className="h-32 w-24 object-cover rounded"
                />
            )}


            {/* ================= BASIC DETAILS ================= */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Basic Details
                </h3>
                <div className="flex justify-center items-center">
                    <ProfileUploader
                        size={140} // optional
                        initialImage={formData.profileImage} // optional
                        setFn={setFormData}
                    />

                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Select Role
                    </label>
                    <select
                        name="role"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg outline-none 
                   focus:ring-2 focus:ring-blue-500 bg-white"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            -- Select Role --
                        </option>
                        {roles.map((role) => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <input name="name" placeholder="Store Name" onChange={handleChange} className="input" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input name="firstName" placeholder="First Name" onChange={handleChange} className="input" />
                    <input name="lastName" placeholder="Last Name" onChange={handleChange} className="input" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3">
                    <input name="email" placeholder="Email Address" onChange={handleChange} className="input" />
                    <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="input" />
                </div>

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="input mt-3"
                />
            </div>

            {/* ================= GOVERNMENT DOCUMENTS ================= */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Government Documents
                </h3>

                <input
                    name="aadhaarNumber"
                    placeholder="Aadhaar Number"
                    onChange={handleChange}
                    className="input"
                />

                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex flex-col w-full max-w-sm">
                        <label className="mb-2 font-medium text-gray-700" htmlFor="aadhaarFront">
                            Aadhaar Front
                        </label>

                        <label
                            htmlFor="aadhaarFront"
                            className="flex items-center justify-between border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition"
                        >
                            <span className="text-gray-500">
                                Choose a file...
                            </span>
                            <span className="text-blue-500 font-medium">Browse</span>
                        </label>

                        <input
                            id="aadhaarFront"
                            type="file"
                            name="aadhaarFront" onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    <DocPreview
                        label="Aadhaar Front"
                        image={docPreview.aadhaarFront}
                        onRemove={() =>
                            setDocPreview({ ...docPreview, aadhaarFront: null })
                        }
                    />
                    <div className="flex flex-col w-full max-w-sm">
                        <label className="mb-2 font-medium text-gray-700" htmlFor="aadhaarBack">
                            Aadhaar Back
                        </label>

                        <label
                            htmlFor="aadhaarBack"
                            className="flex items-center justify-between border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition"
                        >
                            <span className="text-gray-500">
                                Choose a file...
                            </span>
                            <span className="text-blue-500 font-medium">Browse</span>
                        </label>

                        <input
                            id="aadhaarBack"
                            type="file"
                            name="aadhaarBack" onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>


                    <DocPreview
                        label="Aadhaar Back"
                        image={docPreview.aadhaarBack}
                        onRemove={() =>
                            setDocPreview({ ...docPreview, aadhaarBack: null })
                        }
                    />
                </div>

                <input
                    name="panNumber"
                    placeholder="PAN Number"
                    onChange={handleChange}
                    className="input"
                />
                <label htmlFor="panImage" className="block text-sm text-gray-600 mb-1">
                    Upload PAN Card
                </label>
                <input type="file"  name="panImage" onChange={handleFileChange}  className="mb-3 flex items-center justify-between border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition"
 />
                <DocPreview
                    label="PAN Card"
                    image={docPreview.panImage}
                    onRemove={() =>
                        setDocPreview({ ...docPreview, panImage: null })
                    }
                />
                <label className="block text-sm text-gray-600 mb-1">
                    Passport Photo
                </label>
                <input type="file" name="passportPhoto" onChange={handleFileChange} className="mb-3 flex items-center justify-between border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition" />
                <DocPreview
                    label="Passport Size Photo"
                    image={docPreview.passportPhoto}
                    onRemove={() =>
                        setDocPreview({ ...docPreview, passportPhoto: null })
                    }
                />
            </div>

            {/* ================= BANK DETAILS ================= */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Bank Details
                </h3>

                <input
                    name="accountHolderName"
                    placeholder="Account Holder Name"
                    onChange={handleChange}
                    className="input"
                />

                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="bankAccountNumber"
                        placeholder="Account Number"
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        name="ifscCode"
                        placeholder="IFSC Code"
                        onChange={handleChange}
                        className="input"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3">
                    <input name="bankName" placeholder="Bank Name" onChange={handleChange} className="input" />
                    <input name="branchName" placeholder="Branch Name" onChange={handleChange} className="input" />
                </div>
            </div>

            {/* ================= SUBMIT ================= */}
            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-lg text-white bg-[#dc401f] hover:bg-[#11395c] transition"
                >
                    {isLoading ? "Loading..." : " Create Account"}
                </button>
            </div>
            {/* <PreviewFile id="" /> */}
        </div>

    );
};

export default CreateAccount;
