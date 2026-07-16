import { useState } from 'react';
import './App.css'
import UploadHistory from './UploadHistory'
import ZipUploader from './ZipUploader'

function App() {
  const [reload, setReload] = useState(0);

  return (
    <>
      <ZipUploader onSuccess={() => setReload(prev => prev + 1)} />
      <UploadHistory reload={reload} />
    </>
  );
}

export default App
