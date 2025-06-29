


// import { useState, useCallback } from 'react';
// import axios from 'axios';
// import { useDropzone } from 'react-dropzone';

// export default function UploadForm() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [formData, setFormData] = useState(null);
//   const [book, setBook] = useState(null);

//   // Handle file drop
//   // const onDrop = useCallback((acceptedFiles) => {
//   //   const file = acceptedFiles[0];
//   //   setImage(file);
//   //   setPreview(URL.createObjectURL(file));
//   //   setFormData(null);
//   // }, []);

//   const onDrop = useCallback((acceptedFiles) => {
//   if (acceptedFiles.length === 0) return;

//   const file = acceptedFiles[0];
//   setImage(file);
//   setPreview(URL.createObjectURL(file));
//   setFormData(null);
// }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { 'image/*': [] },
//   });

//   // Upload to backend and get AI extraction
//   const handleUpload = async () => {
//     if (!image) return alert("Please select a book cover");
    
//     const form = new FormData();
//     form.append('image', image);

//     try {
//       const res = await axios.post('http://localhost:5000/api/books', form);
//       setFormData(res.data);
//     } catch (err) {
//       alert("Upload failed");
//       console.error(err);
//     }
//   };

//   // Update field manually
//   const handleFieldChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Final save to backend
//   const handleFinalSave = async () => {
//     try {
//       const res = await axios.post(`http://localhost:5000/api/books/save`, formData);
//       console.log(res.data);
//       setBook(res.data);
//       alert("Book saved!");
//     } catch (err) {
//       alert("Failed to save");
//       console.error(err);
//     }
//   };
//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg font-sans">
//       <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">📚 Upload or Capture Book Cover</h2>

//       {/* Drag-and-Drop Upload */}
//       <div
//         {...getRootProps()}
//         className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
//           isDragActive ? 'bg-blue-100' : 'bg-gray-50'
//         }`}
//       >
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p className="text-blue-500">Drop the image here...</p>
//         ) : (
//           <p className="text-gray-600">📂 Drag & drop image here or click to select file</p>
//         )}
//       </div>

//       {/* Camera Input */}
//       <div className="mt-4">
//         <label className="block text-gray-700 font-medium mb-1">Or use your camera:</label>
//         <input
//           type="file"
//           accept="image/*"
//           capture="environment"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             setImage(file);
//             setPreview(URL.createObjectURL(file));
//             setFormData(null);
//           }}
//           className="block w-full mt-2 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50"
//         />
//       </div>

//       {/* Preview */}
//       {preview && (
//         <img src={preview} alt="Preview" className="w-48 mx-auto mt-4 rounded border border-gray-300" />
//       )}

//       {/* Upload Button */}
//       <button
//         onClick={handleUpload}
//         className="w-full bg-blue-600 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700 transition"
//       >
//         Upload & Extract
//       </button>

//       {/* AI Extracted Form with Editable Fields */}
//       {formData && (
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold mb-4 text-gray-700">✏️ Review & Edit Details</h3>
//           {['title', 'author', 'grade', 'subject', 'series', 'price'].map((field) => (
//             <div key={field} className="mb-4">
//               <label htmlFor={field} className="block font-medium capitalize text-gray-600 mb-1">
//                 {field}:
//               </label>
//               <input
//                 id={field}
//                 name={field}
//                 value={formData[field] || ''}
//                 onChange={handleFieldChange}
//                 placeholder={`Enter ${field}`}
//                 className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none shadow-sm"
//               />
//             </div>
//           ))}
//           <button
//             onClick={handleFinalSave}
//             className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
//           >
//             Save Book
//           </button>
//         </div>
//       )}

//       {/* Final Saved Confirmation */}
//       {book && (
//         <div className="mt-10 text-center">
//           <h3 className="text-lg font-semibold text-green-700">✅ Book Saved</h3>
//           <p className="mt-2 text-gray-700 font-medium">{book.title}</p>
//           <p className="text-gray-500">by {book.author}</p>
//           <img
//             src={`http://localhost:5000/${book.imagePath}`}
//             alt={book.title}
//             className="w-40 mt-4 mx-auto rounded shadow border"
//           />
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

export default function UploadForm() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState(null);
  const [book, setBook] = useState(null);

   const API_BASE = import.meta.env.VITE_API_URL;
   console.log(API_BASE)
;

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setFormData(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  const handleUpload = async () => {
    if (!image) return alert("Please select a book cover");

    const form = new FormData();
    form.append('image', image);

    try {
      const res = await axios.post(`${API_BASE}/api/books`, form);
      setFormData(res.data);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalSave = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/books/save`, formData);
      setBook(res.data);
      alert("Book saved!");
    } catch (err) {
      alert("Failed to save");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg font-sans">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        📚 Upload or Capture Book Cover
      </h2>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
          isDragActive ? 'bg-blue-100' : 'bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the image here...</p>
        ) : (
          <p className="text-gray-600">📂 Drag & drop image here or click to select file</p>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 font-medium mb-1">Or use your camera:</label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setFormData(null);
          }}
          className="block w-full mt-2 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50"
        />
      </div>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-48 mx-auto mt-4 rounded border border-gray-300"
        />
      )}

      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700 transition"
      >
        Upload & Extract
      </button>

      {formData && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">✏️ Review & Edit Details</h3>
          {['title', 'author', 'grade', 'subject', 'series', 'price'].map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block font-medium capitalize text-gray-600 mb-1">
                {field}:
              </label>
              <input
                id={field}
                name={field}
                value={formData[field] || ''}
                onChange={handleFieldChange}
                placeholder={`Enter ${field}`}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none shadow-sm"
              />
            </div>
          ))}
          <button
            onClick={handleFinalSave}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Save Book
          </button>
        </div>
      )}

      {book && (
        <div className="mt-10 text-center">
          <h3 className="text-lg font-semibold text-green-700">✅ Book Saved</h3>
          <p className="mt-2 text-gray-700 font-medium">{book.title}</p>
          <p className="text-gray-500">by {book.author}</p>
          <img
            src={`${API_BASE}/${book.imagePath}`}
            alt={book.title}
            className="w-40 mt-4 mx-auto rounded shadow border"
          />
        </div>
      )}
    </div>
  );
}

