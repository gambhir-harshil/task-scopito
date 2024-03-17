import { useState, useEffect } from "react";
import { AreaSelector } from "@bmunozg/react-image-area";
import Map from "./Map";
import { Crop } from "lucide-react";
import { Link } from "react-router-dom";

const images = ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png"];

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [openIssueDialog, setOpenIssueDialog] = useState(false);
  const [issueData, setIssueData] = useState({
    issue: "",
    issueDescription: "",
  });
  const [imageData, setImageData] = useState([]);

  console.log(imageData);

  const onChangeHandler = (areas) => {
    const updatedImageData = imageData.map((item) => {
      if (item.path === selectedImage) {
        return {
          ...item,
          areas,
          issue: issueData.issue,
          issueDescription: issueData.issueDescription,
        };
      }
      return item;
    });

    setImageData(updatedImageData);
  };

  const handleImageClick = (img) => {
    setSelectedImage(img);
    const existingImageData = imageData.find((item) => item.path === img);
    if (existingImageData) {
      // If data already exists for the selected image, set issueData accordingly
      setIssueData({
        issue: existingImageData.issue || "",
        issueDescription: existingImageData.issueDescription || "",
      });
    } else {
      // If no data exists for the selected image, reset issueData
      setIssueData({
        issue: "",
        issueDescription: "",
      });
    }
  };

  const handleCreateIssue = () => {
    setOpenIssueDialog(!openIssueDialog);
  };

  // Add image data when selecting an image
  useEffect(() => {
    if (
      selectedImage &&
      !imageData.some((item) => item.path === selectedImage)
    ) {
      setImageData([
        ...imageData,
        {
          path: selectedImage,
          areas: [],
          issue: issueData.issue,
          issueDescription: issueData.issueDescription,
        },
      ]);
    }
  }, [selectedImage, issueData, imageData]);

  return (
    <div className="flex flex-col w-full h-full gap-8">
      {!selectedImage && (
        <div className="h-[calc(100vh-200px)]">
          <Map />
        </div>
      )}
      {selectedImage && (
        <div className="flex gap-2">
          <div className="flex items-center justify-center p-8 bg-gray-400">
            <button
              className="absolute flex items-center justify-center w-8 h-8 p-2 bg-white rounded-full shadow-md left-2 top-2"
              onClick={handleCreateIssue}
            >
              <Crop />
            </button>
            {openIssueDialog ? (
              <>
                <p className="absolute font-semibold top-2 left-12">
                  Select the area of the image
                </p>
                <AreaSelector
                  areas={
                    (imageData.find((item) => item.path === selectedImage) &&
                      imageData.find((item) => item.path === selectedImage)
                        .areas) ||
                    []
                  }
                  onChange={onChangeHandler}
                  globalAreaStyle={{
                    border: "2.5px blue",
                    backgroundColor: "red",
                    opacity: "0.5",
                  }}
                  maxAreas={1}
                >
                  <img
                    src={selectedImage}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </AreaSelector>
              </>
            ) : (
              <img
                src={selectedImage}
                alt=""
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="w-[600px] flex flex-col justify-between items-center px-4 py-8">
            <p>Previously added issues</p>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center w-full gap-2">
                <label className="font-semibold">Name the issue</label>
                <input
                  type="text"
                  value={issueData.issue}
                  onChange={(e) =>
                    setIssueData({ ...issueData, issue: e.target.value })
                  }
                  className="h-8 px-4 py-2 border rounded-md shadow-md"
                />
              </div>
              <div className="flex flex-col items-center w-full gap-2">
                <label className="font-semibold">Describe the issue</label>
                <textarea
                  type="text"
                  value={issueData.issueDescription}
                  onChange={(e) =>
                    setIssueData({
                      ...issueData,
                      issueDescription: e.target.value,
                    })
                  }
                  className="h-24 px-4 py-2 border rounded-md shadow-md resize-none"
                />
              </div>
            </div>
            <div className="flex flex-col items-center w-full gap-4">
              <button
                className="w-40 px-4 py-2 text-sm font-semibold text-white bg-blue-400 rounded-md shadow-md"
                onClick={handleCreateIssue}
              >
                {!openIssueDialog ? "Create Issue" : "Save Issue"}
              </button>
              <Link
                className="w-40 px-4 py-2 text-sm font-semibold text-white bg-blue-400 rounded-md shadow-md"
                to={"/pdf"}
                state={imageData}
              >
                Generate Pdf
              </Link>
            </div>
          </div>
          <div className="w-[600px]">
            <Map />
          </div>
        </div>
      )}
      <div className="flex gap-2 h-[200px]">
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => handleImageClick(image)}
          >
            <img src={image} alt="" className="rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
