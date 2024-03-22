"use client";

import { FileUploader } from "./FileUploader";

export default function Page() {
  return (
    <div>
      <h1>Upload an image:</h1>

      <FileUploader onUploadSuccess={(result) => console.log(result)} />
    </div>
  );
}
