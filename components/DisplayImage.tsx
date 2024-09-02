import React from "react";
import { ColourPalette } from "./ColourPalette";
import { ImageUp } from "lucide-react";

interface DisplayImageProps {
  uploadedImage: any;
  colorPalette: any;
  uploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DisplayImage = ({
  uploadedImage,
  colorPalette,
  uploadImage,
}: DisplayImageProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative h-[25rem] w-[48rem] border-2 border-gray-900 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-200 ease-in-out">
        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt="uploaded"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <label
            className="font-semibold font-mono hover:cursor-pointer flex gap-1 text-gray-400"
            htmlFor="file"
          >
            <ImageUp />
            Upload Image
            <input type="file" id="file" hidden onChange={uploadImage} />
          </label>
        )}
      </div>
      {colorPalette && (
        <div className="mt-4">
          <ColourPalette palette={colorPalette} />
        </div>
      )}
    </div>
  );
};

export default DisplayImage;
