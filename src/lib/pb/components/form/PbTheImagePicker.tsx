import { useRef, useState } from "react";
import { getFileURL } from "@/lib/pb/client";
import { ImagePlus } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Schema } from "@/lib/pb/database";

interface PbTheImagePickerProps {
  show_preview?: boolean;
  label?: React.ReactNode;
  label_classname?: string;
  img_classname?: string;
  collection_id_or_name?: keyof Schema;
  record_id?: string;
  file_name?: string;
  setFileImage?: (file: File | null) => void;
}

export function PBTheImagePicker({
  label,
  label_classname,
  img_classname,
  show_preview = true,
  collection_id_or_name,
  record_id,
  file_name,
  setFileImage,
}: PbTheImagePickerProps) {
  const img_url = getFileURL({ collection_id_or_name, record_id, file_name });
  const [pic, setPic] = useState(img_url);
  //  const [input_pic, setInputPic] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      //   setInputPic(e.target.files[0]);
      setPic((prev) => {
        if (e.target.files && e.target.files[0]) {
          return URL.createObjectURL(e.target.files[0]);
        }
        return prev;
      });
      setFileImage && setFileImage(e.target.files && e.target.files[0]);
    }
  }
  return (
    <div className="w-full  flex flex-col items-center gap-1 relative min-h-24 p-2 bg-base-200/70 rounded-md">
      <div className={twMerge("font-serif text-sm", label_classname)}>
        {label}
      </div>
      {/* <h2 className="text-sm text-accent">{label}</h2> */}
      <div className="md:min-w-[200px]   flex  items-center justify-center">
        {typeof pic === "string" && pic.length > 0 && show_preview ? (
          <div className="" onClick={() => ref.current?.click()}>
            <div className="w-full">
              <img
                className={twMerge("w-auto h-[200px]  object-cover", img_classname)}
                src={pic}
                height={"200"}
                width={"400"}
              />
            </div>
          </div>
        ) : null}

        <div className="flex flex-col items-center justify-center absolute top-[50%]  bg-base-300/50 p-3 rounded-lg">
          <input
            id="image_picket"
            type="file"
            ref={ref}
            className="hidden"
            onChange={(e) => handleChange(e)}
          />
          <ImagePlus
            onClick={() => ref.current?.click()}
            className="h-7 w-7"
          ></ImagePlus>
        </div>
      </div>
    </div>
  );
}
