import { useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";

const PdfPage = () => {
  const { state } = useLocation();
  console.log(state);

  useEffect(() => {
    generatePDF();
  }, []);

  const generatePDF = () => {
    const pdf = new jsPDF();
    const container = document.getElementById("pdf-container");

    // Set options for html2canvas
    const options = {
      scale: 2, // Adjust the scale factor as needed
      useCORS: true, // Enable CORS to prevent security errors
    };

    // Capture the HTML content of the container
    html2canvas(container, options)
      .then((canvas) => {
        // Convert the captured canvas to an image data URL
        const imgData = canvas.toDataURL("image/png");

        // Calculate the width and height of the PDF page
        const pdfWidth = pdf.internal.pageSize.width;
        const pdfHeight = (canvas.height / canvas.width) * pdfWidth;

        // Add the image to the PDF, scaling it to fit the page size
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // Save the PDF
        pdf.save("page_content.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div>
      <div id="pdf-container" className="flex flex-col gap-4">
        {state.map((issue) => (
          <div key={issue.path} className="px-8 py-4">
            <div className="relative">
              <img src={issue.path} className="h-[480px] w-[900px]" />
              {issue.areas.length === 1 && (
                <div
                  className="absolute border border-red-500 bg-red-500/50"
                  style={{
                    left: `${issue.areas[0].x}px`,
                    top: `${issue.areas[0].y}px`,
                    width: `${issue.areas[0].width}px`,
                    height: `${issue.areas[0].height}px`,
                  }}
                />
              )}
            </div>
            <h1 className="text-lg font-semibold">
              Issue:{" "}
              <span className="text-base font-medium">{issue.issue}</span>
            </h1>
            <p className="text-sm font-medium">{issue.issueDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfPage;
