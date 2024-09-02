import React, { Dispatch } from "react";
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
      <div className="h-[25rem] w-[48rem] flex items-center justify-center border-2 border-gray-900 rounded-xl overflow-hidden transition-all duration-200 ease-in-out">
        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt="uploaded"
            className="w-[100%] h-[100%] object-cover rounded-xl"
          />
        ) : (
          <>
            <label
              className="font-semibold font-mono hover:cursor-pointer flex gap-1 text-gray-400"
              htmlFor="file"
            >
              <ImageUp />
              Upload Image
            </label>
            <input type="file" id="file" hidden onChange={uploadImage} />
          </>
        )}
      </div>
      {colorPalette && (
        <div className="-mt-12">
          <ColourPalette palette={colorPalette} />
        </div>
      )}
    </div>
  );
};

export default DisplayImage;
