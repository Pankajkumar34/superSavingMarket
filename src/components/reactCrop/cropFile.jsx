import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";

const CropModal = ({ image, onComplete, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl w-[400px]">
        <div className="relative h-[300px]">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}   // 🔥 CUSTOM RATIO HERE
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          className="w-full mt-3"
        />

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="btn bg-gray-500">
            Cancel
          </button>
          <button
            onClick={() => onComplete(croppedAreaPixels)}
            className="btn bg-green-600"
          >
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
