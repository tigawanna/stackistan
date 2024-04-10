import { useSuspenseQuery } from "@tanstack/react-query";
import { githubApi } from "./api/github";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { OneGithubRepo } from "./GithubRepos";

interface GithubReposListProps {
  debouncedValue: string;
  searchParam: string;
  githubUsername: string;
  selectedRows: OneGithubRepo[];
  setSelectedRows: React.Dispatch<React.SetStateAction<OneGithubRepo[]>>;
}

export function GithubReposList({
  selectedRows,
  setSelectedRows,
  debouncedValue,
  searchParam,
  githubUsername,
}: GithubReposListProps) {
  const page = debouncedValue.length > 0 ? 1 : searchParam;
  //   const [selectedRows, setSelectedRows] = useState<string[]>([]);
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
  function selectItem(repo: OneGithubRepo) {
    const find_repo = selectedRows.find((i) => i.name === repo.name);
    if (find_repo) {
      setSelectedRows((prev) => {
        if (prev) {
          return prev.filter((i) => i.name !== repo.name);
        }
        return prev;
      });
    } else {
      setSelectedRows((prev) => {
        if (!prev) {
          return prev;
        }
        return [...prev, repo];
      });
    }
  }
  const data = query?.data?.data?.items ?? [];
  function selectAllRows(checked: boolean) {
    if (checked) {
    const random_number = Math.floor(Math.random() * 10000);
      setSelectedRows(
        data.map((item) => {
          return {
            name: item.name ?? "",
            description: item.description ?? "",
            link: item.html_url ?? "",
            image_url: `https://opengraph.githubassets.com/${random_number}/${item.owner}/${item.name}`,
          };
        }),
      );
    } else {
      setSelectedRows([]);
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="h-full ">
        <ul className="w-full   flex flex-wrap justify-center gap-2 overflow-y-scroll py-[3%]">
          {data &&
            data.map((item) => {
              const checked = selectedRows.some((i) => i.name === item.name);
              return (
                <li
                  key={item.id}
                  className={
                    checked
                      ? "brightness-75 relative  hover:text-primary max-h-28 w-[95%] md:w-[40%] lg:w-[30%] flex flex-col justify-between bg-base-300 p-2 gap-2 rounded-lg group"
                      : "relative max-h-28 w-[95%]  hover:text-primary md:w-[40%] lg:w-[30%] flex flex-col justify-between bg-base-300 p-2 gap-2 rounded-lg group"
                  }
                >
                  <div className="w-full flex justify-between">
                    <h2 className="text-2xl font-bold">{item.name}</h2>
                    <Checkbox
                      className="absolute top-2 right-2 z-40 "
                      checked={checked}
                      onCheckedChange={() =>{
                           const random_number = Math.floor(
                             Math.random() * 10000,
                           );
                          selectItem({
                            name: item.name??"",
                            description: item.description??"",
                            link: item.html_url??"",
                            image_url: `https://opengraph.githubassets.com/${random_number}/${item.owner}/${item.name}`,
                          })

                      }
                      }
                    />
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
