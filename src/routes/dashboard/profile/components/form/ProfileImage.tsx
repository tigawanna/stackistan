import { Input } from "@/components/shadcn/ui/input";
import { X } from "lucide-react";


interface ProfileImageProps {
  field_key:string;  
  image?: string ;
  setImage: (image: string) => void;
}

export function ProfileImage({ field_key,image, setImage }: ProfileImageProps) {
  // const image_url = typeof image === "string" ? image : image?.href;
  const image_url = image
  return (
    <div className="w-full h-full flex  justify-center gap-1">
    <div className="w-full h-full flex flex-col  items-center gap-2">
      <Input
        id={field_key}
        name={field_key}
        className=""
        placeholder="Image Url"
        value={image_url ?? ""}
        type="url"
        onChange={(e) => setImage(e.target.value)}
      />
      {image && (
        <img
          className="w-auto h-[150px] object-cover"
          src={image_url}
          alt="profile image"
          loading="lazy"
        />
      )}
    </div>
      <X className="h-6 w-6  bg-base-300 rounded-full " 
      onClick={() => setImage("")}/>
    </div>
  );
}
