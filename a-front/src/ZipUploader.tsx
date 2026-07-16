import JSZip from "jszip";
import { useState } from "react";

function ZipUploader({ onSuccess }: { onSuccess: () => void }) {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = async () => {
    const zip = new JSZip();

    files.forEach(file => {
      zip.file(file.name, file);
    });

    const blob = await zip.generateAsync({ type: "blob" });

    const formData = new FormData();
    formData.append("zip", blob, "files.zip");

    const res = await fetch("http://localhost/upload-test/back/uploadZip.php", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const text = await res.text();

    try {
      const data = JSON.parse(text);

      if (!data.success) {
        alert("アップロード失敗");
        return;
      }

      onSuccess();
    } catch (e) {
      console.error("サーバーがJSONじゃない:", text);
    }
  };

  return (
    <>
      <input
        type="file"
        multiple
        onChange={(e) => {
          if (!e.target.files) return;
          setFiles(Array.from(e.target.files));
        }}
      />
      <button onClick={handleUpload}>アップロード</button>
    </>
  );
}

export default ZipUploader;
