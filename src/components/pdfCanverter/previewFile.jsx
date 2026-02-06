import axiosConfig from "../../utils/axios.config";
import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from "../../assets/svgLogo.svg"
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountDetails } from "../../utils/thunkApis/stats.apis";

const PreviewFile = ({ id }) => {
    const { viewDetails } = useSelector(state => state.stats)
    const axiosInstance = axiosConfig();
    const pdfRef = useRef();
    const dispatch = useDispatch()
    // const fetchDtls = async () => {
    //     try {
    //         const res = await axiosInstance.get(`/super-admin/get-account-details?id=${id}&role=${role}`);
    //         setviewDetails(res.viewDetails?.accountviewDetails[0]);

    //         setUserviewDetails(res.viewDetails?.accountviewDetails[0])
    //     } catch (error) {
    //         console.log(error, "==>");
    //     }
    // };
    useEffect(() => {
        dispatch(fetchAccountDetails(id));
    }, []);

    console.log(viewDetails,"viewDetails==>")
    // ================= PDF DOWNLOAD =================
    const downloadPDF = async () => {
        const canvas = await html2canvas(pdfRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
        });

        const imgviewDetails = canvas.toviewDetailsURL("image/jpg");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgviewDetails, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgviewDetails, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save("Franchise-Account.pdf");
    };


    if (!viewDetails) return <p className="text-center mt-10">Loading...</p>;

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
                    <p><b>Name:</b> {viewDetails.firstName} {viewDetails.lastName}</p>
                    <p><b>Email:</b> {viewDetails.email}</p>
                    <p><b>Phone:</b> {viewDetails.countryCode} {viewDetails.phoneNumber}</p>
                    <p><b>Role:</b> {viewDetails.role}</p>
                    <p><b>Account No:</b> {viewDetails.accountNumber}</p>
                    <p><b>Status:</b> {viewDetails.status}</p>
                </div>

                {/* FRANCHISE DETAILS */}
                <h3 className="text-lg font-semibold border-b mt-6 mb-4 pb-2">
                    Franchise Details
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><b>Franchise Name:</b> {viewDetails?.data?.name}</p>
                    <p><b>Franchise Code:</b> {viewDetails?.data?.code}</p>
                    <p><b>Active:</b> {viewDetails?.data?.isActive ? "Yes" : "No"}</p>
                </div>

                {/* DOCUMENTS */}
                <h3 className="text-lg font-semibold border-b mt-6 mb-4 pb-2">
                    Documents
                </h3>

                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                    <div>
                        <p className="mb-1 font-medium">Passport</p>
                        <img
                            src={viewDetails?.data?.documents.passportPhoto}
                            crossOrigin="anonymous"
                            className="h-24 w-20 mx-auto object-cover border rounded"
                        />
                    </div>

                    <div>
                        <p className="mb-1 font-medium">Aadhaar Front</p>
                        <img
                            src={viewDetails?.data?.documents.aadhaar.frontImage}
                            crossOrigin="anonymous"
                            className="h-24 w-28 mx-auto object-cover border rounded"
                        />
                    </div>

                    <div>
                        <p className="mb-1 font-medium">Aadhaar Back</p>
                        <img
                            src={viewDetails?.data?.documents.aadhaar.backImage}
                            crossOrigin="anonymous"
                            className="h-24 w-28 mx-auto object-cover border rounded"
                        />
                    </div>

                    <div>
                        <p className="mb-1 font-medium">PAN</p>
                        <img
                            src={viewDetails?.data?.documents.pan.image}
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
                    <p><b>Account Holder:</b> {viewDetails?.data?.bankDetails.accountHolderName}</p>
                    <p><b>Bank Name:</b> {viewDetails?.data?.bankDetails.bankName}</p>
                    <p><b>IFSC:</b> {viewDetails?.data?.bankDetails.ifscCode}</p>
                    <p><b>Branch:</b> {viewDetails?.data?.bankDetails.branchName}</p>
                </div>

                {/* FOOTER */}
                <p className="text-xs text-gray-400 mt-6">
                    Created on: {new Date(viewDetails.createdAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default PreviewFile;
