"use client";
import React from "react";
import { ColourPalette } from "./ColourPalette";
import ReactDropzone, { FileRejection } from "react-dropzone";
import { IconPhoto, IconX } from "@tabler/icons-react";

interface DisplayImageProps {
  uploadedImage: any;
  setUploadedImage: () => void;
  colorPalette: any;
  url: string;
  uploadImage: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
}

const DisplayImage = ({
  uploadedImage,
  setUploadedImage,
  colorPalette,
  url,
  uploadImage,
}: DisplayImageProps) => {
  return (
    <div>
      {uploadedImage ? (
        <div className="flex flex-col justify-center items-center z-20 mt-4 h-full">
          <div className="relative">
            <img
              src={uploadedImage}
              alt="uploaded"
              className="w-full h-80 object-cover rounded-xl"
              width={440}
              height={320}
            />

            <IconX
              className="absolute text-primary size-8 p-2 hover:bg-muted-foreground z-50 top-2 right-2 bg-muted-foreground/90 rounded-full"
              onClick={setUploadedImage}
            />
          </div>

          {colorPalette && (
            <div className="w-full">
              <ColourPalette palette={colorPalette} />
            </div>
          )}
        </div>
      ) : (
        <ReactDropzone
          onDrop={(acceptedFiles, fileRejections) =>
            uploadImage(acceptedFiles, fileRejections)
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section className="h-80 border-dashed border w-full rounded-xl flex items-center justify-center bg-card">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-zinc-800 dark:hover:text-slate-200">
                  <IconPhoto className="size-12" />
                  <p className="text-lg sm:text-md text-center tracking-tight">
                    Drop an image here, or click to select
                  </p>
                </div>
              </div>
            </section>
          )}
        </ReactDropzone>
      )}
    </div>
  );
};

export default DisplayImage;
