import axiosConfig from "../../utils/axios.config";
import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from "../../assets/svgLogo.svg"

const PreviewFile = (id) => {
    const axiosInstance = axiosConfig();
    const [data, setData] = useState(null);
    const pdfRef = useRef();

    const fetchDtls = async () => {
        try {
            const res = await axiosInstance.get(`/super-admin/get-account-details?id=${id}`);
            setData(res.data?.accountData[0]);
        } catch (error) {
            console.log(error, "==>");
        }
    };
    console.log(data, "datadata")
    useEffect(() => {
        fetchDtls();
    }, []);

    // ================= PDF DOWNLOAD =================
    const downloadPDF = async () => {
        const canvas = await html2canvas(pdfRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save("Franchise-Account.pdf");
    };


    if (!data) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Franchise Account Preview</h2>
                <button
                    onClick={downloadPDF}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                >
                    Download PDF
                </button>
            </div>

            {/* PREVIEW */}
            <div ref={pdfRef} className="bg-white p-6 rounded shadow">
                {/* USER DETAILS */}
                <div className="flex justify-center mb-4">
                    <img src={Logo} className="h-16 object-contain" alt="Logo" />
                </div>

                <h3 className="text-lg font-semibold border-b mb-4 pb-2">
                    User Details
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><b>Name:</b> {data.firstName} {data.lastName}</p>
                    <p><b>Email:</b> {data.email}</p>
                    <p><b>Phone:</b> {data.countryCode} {data.phoneNumber}</p>
                    <p><b>Role:</b> {data.role}</p>
                    <p><b>Account No:</b> {data.accountNumber}</p>
                    <p><b>Status:</b> {data.status}</p>
                </div>

                {/* FRANCHISE DETAILS */}
                <h3 className="text-lg font-semibold border-b mt-6 mb-4 pb-2">
                    Franchise Details
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><b>Franchise Name:</b> {data?.data?.name}</p>
                    <p><b>Franchise Code:</b> {data?.data?.code}</p>
                    <p><b>Active:</b> {data?.data?.isActive ? "Yes" : "No"}</p>
                </div>

                {/* DOCUMENTS */}
                <h3 className="text-lg font-semibold border-b mt-6 mb-4 pb-2">
                    Documents
                </h3>

                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                    <div>
                        <p className="mb-1 font-medium">Passport</p>
                        <img
                            src={data?.data?.documents.passportPhoto}
                            crossOrigin="anonymous"
                            className="h-24 w-20 mx-auto object-cover border rounded"
                        />
                    </div>

                    <div>
                        <p className="mb-1 font-medium">Aadhaar Front</p>
                        <img
                            src={data?.data?.documents.aadhaar.frontImage}
                            crossOrigin="anonymous"
                            className="h-24 w-28 mx-auto object-cover border rounded"
                        />
                    </div>

                    <div>
                        <p className="mb-1 font-medium">Aadhaar Back</p>
                        <img
                            src={data?.data?.documents.aadhaar.backImage}
                            crossOrigin="anonymous"
                            className="h-24 w-28 mx-auto object-cover border rounded"
                        />
                    </div>

                    <div>
                        <p className="mb-1 font-medium">PAN</p>
                        <img
                            src={data?.data?.documents.pan.image}
                            crossOrigin="anonymous"
                            className="h-24 w-28 mx-auto object-cover border rounded"
                        />
                    </div>
                </div>

                {/* BANK DETAILS */}
                <h3 className="text-lg font-semibold border-b mt-6 mb-4 pb-2">
                    Bank Details
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><b>Account Holder:</b> {data?.data?.bankDetails.accountHolderName}</p>
                    <p><b>Bank Name:</b> {data?.data?.bankDetails.bankName}</p>
                    <p><b>IFSC:</b> {data?.data?.bankDetails.ifscCode}</p>
                    <p><b>Branch:</b> {data?.data?.bankDetails.branchName}</p>
                </div>

                {/* FOOTER */}
                <p className="text-xs text-gray-400 mt-6">
                    Created on: {new Date(data.createdAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default PreviewFile;
