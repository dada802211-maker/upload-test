import { useEffect, useState } from "react";
import './UploadHistory.css';

type Upload = {
  id: string;
  file_name: string;
  file_path: string;
  created_at: string;
};

function UploadHistory({ reload }: { reload: number }) {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUploads = async () => {
    setLoading(true);
    const res = await fetch("http://localhost/upload-test/back/getUploads.php", {
      credentials: "include",
    });
    const data = await res.json();
    // const text = await res.text();   // ← jsonじゃなくtext
    // console.log(text);
    setUploads(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUploads();
  }, [reload]); // ← ここ重要

  const handleDelete = async (id: string) => {
    if (!confirm("削除しますか？")) return;

    await fetch("http://localhost/upload-test/back/deleteUpload.php", {
      method: "POST",
      body: new URLSearchParams({ id }),
    });

    fetchUploads();
  };

  const handleDownload = (filePath: string, fileName: string) => {
    const url = `http://localhost/upload-test/back/uploads/zips/${filePath}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>アップロード履歴</h2>

      {uploads.length === 0 && <p>データがありません</p>}

      <table>
        <thead>
          <tr>
            <th>ファイル名</th>
            <th>日時</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          {uploads.map((item) => (
            <tr key={item.id}>
              <td>{item.file_name}</td>
              <td>{item.created_at}</td>
              <td>
                <button
                  onClick={() =>
                    handleDownload(item.file_path, item.file_name)
                  }
                >
                  ダウンロード
                </button>

                <button onClick={() => handleDelete(item.id)}>
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UploadHistory;
