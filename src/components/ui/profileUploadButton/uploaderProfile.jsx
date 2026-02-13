import { useRef, useState } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { fileUploader } from "../../../utils/thunkApis/auth.api";
import { uploadMultipleImages } from "../../../utils/supabase/supaFileUpload";

const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

export default function ProfileUploader({
    size = 120,
    initialImage = null,
    setFn, // callback with File
}) {
    const fileRef = useRef(null);
    const [image, setImage] = useState(initialImage);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const imgUrl = URL.createObjectURL(file);
        const uploadData = new FormData();
        uploadData.append("file", file);
         const urls = await uploadMultipleImages(file);
// console.log(urls,"===>");
        // const res = await fileUploader(uploadData);
        // const url = res?.filePath?.[0]?.url;
        const url = urls?.[0];
        setImage(url);
        setFn((prev) => ({ ...prev, profileImage: url }));

        // if (onChange) onChange(file);
    };

    const removeImage = () => {
        setImage(null);
        fileRef.current.value = "";
        if (onChange) onChange(null);
    };

    return (
        <div style={{ position: "relative", width: size, height: size }}>
            {/* Image */}
            <img
                src={image || defaultAvatar}
                alt="profile"
                style={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #ddd",
                }}
            />

            {/* Pencil Icon */}
            {!image && (
                <button
                    onClick={() => fileRef.current.click()}
                    style={iconStyle("bottom")}
                >
                    <PencilIcon style={{ width: 20, height: 20 }} />
                </button>
            )}

            {/* Remove Icon */}
            {image && (
                <button onClick={removeImage} style={iconStyle("top")}>
                    <XMarkIcon style={{ width: 20, height: 20 }} />
                </button>
            )}

            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                name="profileImage"
                ref={fileRef}
                hidden
                onChange={handleFileChange}
            />
        </div>
    );
}

const iconStyle = (position) => ({
    position: "absolute",
    ...(position === "bottom"
        ? { bottom: 5, right: 5 }
        : { top: 5, right: 5 }),
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
});
