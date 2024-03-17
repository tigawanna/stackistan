import { Input } from "@/components/shadcn/ui/input";


interface ProfileImageProps {
  field_key:string;  
  image?: string | URL;
  setImage: (image: string) => void;
}

export function ProfileImage({ field_key,image, setImage }: ProfileImageProps) {
  const image_url = typeof image === "string" ? image : image?.href;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
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
          className="w-auto h-[150px] "
          src={image_url}
          alt="profile image"
          loading="lazy"
        />
      )}
    </div>
  );
}
