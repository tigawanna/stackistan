import { useSuspenseQuery } from "@tanstack/react-query";
import { githubApi } from "./api/github";
import { OneGithubRepo } from "./GithubRepos";

interface GithubReposListProps {
  debouncedValue: string;
  githubUsername: string;
  selectedRepo: OneGithubRepo;
  setSelectedRepo: (item: OneGithubRepo) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function GithubReposList({
  selectedRepo,
  setSelectedRepo,
  debouncedValue,
  githubUsername,
  setOpen,
}: GithubReposListProps) {
  //   const [selectedRepo, setSelectedRepo] = useState<string[]>([]);
  //   const {data} = useViewer()
  //   const [githubUsername,setGithubUsername] = useState(data?.github_username??"")
  const query = useSuspenseQuery({
    queryKey: ["github-repositories", debouncedValue],
    queryFn: () =>
      githubApi.searchRepoByName({
        owner: githubUsername,
        keyword: debouncedValue,
      }),
  });
  const data = query?.data?.data?.items ?? [];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="h-full ">
        <ul className="w-full   flex flex-wrap justify-center gap-2 overflow-y-scroll py-[3%]">
          {data &&
            data.map((item) => {
              const checked = selectedRepo.name === item.name;
              return (
                <li
                  key={item.id}
                  className={
                    checked
                      ? "brightness-75 relative  hover:text-primary max-h-28 w-[95%] md:w-[40%] lg:w-[30%] flex flex-col justify-between bg-base-300 p-2 gap-2 rounded-lg group"
                      : "relative max-h-28 w-[95%]  hover:text-primary md:w-[40%] lg:w-[30%] flex flex-col justify-between bg-base-300 p-2 gap-2 rounded-lg group"
                  }
                  onClick={() => {
                    const random_number = Math.floor(Math.random() * 10000);
                    setSelectedRepo({
                      name: item.name ?? "",
                      description: item.description ?? "",
                      link: item.html_url ?? "",
                      image_url: `https://opengraph.githubassets.com/${random_number}/${item.owner.login}/${item.name}`,
                    });
                    setOpen(false);
                  }}
                >
                  <div className="w-full flex justify-between">
                    <h2 className="text-2xl font-bold">{item.name}</h2>
                  </div>
                  <p className="line-clamp-2">{item.description}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
