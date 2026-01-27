import jsPDF from "jspdf";

export const downloadPdf = (imageBase64, fileName = "document.pdf") => {
  const pdf = new jsPDF("p", "mm", "a4");

  const imgProps = pdf.getImageProperties(imageBase64);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imageBase64, "JPEG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);
};
