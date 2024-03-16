import { Button } from "@/components/shadcn/ui/button";
import { Card, CardHeader, CardContent } from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { useViewer } from "@/lib/pb/hooks/useViewer";
interface ProfileFormProps {}

export function ProfileForm({}: ProfileFormProps) {
  const { data } = useViewer();
  return (
    <div className="w-full h-full  p-5">
      <Card className="w-full">
        <CardHeader>
          <div className="space-y-1.5">
            <h2 className="text-lg font-medium leading-6">Your Profile</h2>
            <p className="text-sm leading-5 muted">
              This information will be displayed on your public profile.
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 pt-6">
          <div className="flex items-center gap-4">
            <label
              className="w-24 flex items-center gap-2 text-sm font-medium"
              htmlFor="photo"
            >
              Photo
            </label>
            <div className="flex items-center space-x-4">
              <img
                alt="Your profile photo"
                className="rounded-full"
                height="80"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "80/80",
                  objectFit: "cover",
                }}
                width="80"
              />
              <Button size="sm">Upload</Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="username">
                  Username
                </Label>
                <Input defaultValue="janedoe" id="username" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="bio">
                  Bio
                </Label>
                <Textarea id="bio" placeholder="Designer." rows={3} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    defaultValue="email@example.com"
                    id="email"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm" htmlFor="skills">
                    Skills
                  </Label>
                  <Input id="skills" placeholder="Design, creativity" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm" htmlFor="github">
                    GitHub
                  </Label>
                  <Input id="github" placeholder="GitHub username" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm" htmlFor="linkedin">
                    LinkedIn
                  </Label>
                  <Input id="linkedin" placeholder="LinkedIn username" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm" htmlFor="city">
                    City
                  </Label>
                  <Input id="city" placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm" htmlFor="country">
                    Country
                  </Label>
                  <Input id="country" placeholder="Country" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="phone">
                  Phone
                </Label>
                <Input id="phone" placeholder="Phone number" type="tel" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
