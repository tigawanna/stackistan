import { StackistanUserProjectsCreate } from "@/lib/pb/database";
import {
  IRawPkgJason,
  RepositoryResponse,
  RequiredDecodedPackageJson,
} from "./types";

export interface RepoSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: RepositoryResponse[];
}

export async function getUserRepos(input: { owner: string }) {
  return await fetch(
    `https://api.github.com/search/repositories?q=user:${input.owner}+fork:false&sort=pushed&order=desc`,
  )
    .then((res) => res.json())
    .then((data: RepoSearchResponse) => {
      // @ts-expect-error
      if (data.message && data.documentation_url) throw new Error(data.message);
      return data;
    })
    .catch((error: any) => {
      // console.log("getUserRepo error ============= ", error)
      return {
        error: {
          message: error.message,
          original_error: error,
        },
      };
    });
}

export async function searchUserRepos(input: {
  owner: string;
  keyword: string;
}) {
  return await fetch(
    `https://api.github.com/search/repositories?q=${input.keyword}+user:${input.owner}+fork:false&sort=pushed&order=desc&per_page=12`,
  )
    .then((res) => res.json())
    .then((data: RepoSearchResponse) => {
      // @ts-expect-error
      if (data.message && data.documentation_url) throw new Error(data.message);
      return {data,error:null}
    })
    .catch((error: any) => {
      // console.log(" searchUserRepos error ============= ", error.message)
      return {
        data: null,
        error: {
          message: error.message,
          original_error: error,
        },
      };
    });
}

export async function getOneRepo(input: { owner: string; repo: string }) {
  return await fetch(
    `https://api.github.com/repos/${input.owner}/${input.repo}`,
  )
    .then((res) => res.json())
    .then((data: RepositoryResponse) => {
      // @ts-expect-error
      if (data.message && data.documentation_url) throw new Error(data.message);
      return data;
    })
    .catch((error: any) => {
      // console.log("getOneRepo error ============= ", error)
      return {
        error: {
          message: error.message,
          original_error: error,
        },
      };
    });
}

export async function getOneRepoLanguages(input: {
  owner: string;
  repo: string;
}) {
  return await fetch(
    `https://api.github.com/repos/${input.owner}/${input.repo}/languages`,
  )
    .then((res) => res.json())
    .then((data: Record<string, number>) => {
      // @ts-expect-error
      if (data.message && data.documentation_url) throw new Error(data.message);
      return Object.keys(data);
    })
    .catch((error: any) => {
      // console.log("getOneRepoLanguages error ============= ",error)
      return {
        error: {
          message: error.message,
          original_error: error,
        },
      };
    });
}

export async function getOneRepoPackages(input: {
  owner: string;
  repo: string;
}) {
  return await fetch(
    `https://api.github.com/repos/${input.owner}/${input.repo}/contents/package.json`,
    {
      headers: {
        "Content-Type": "application/vnd.github+json",
      },
    },
  )
    .then((res) => {
      if (!res.ok) {
        return;
      }
      return res.json();
    })
    .then((data: IRawPkgJason) => {
      if (!data) return;
      const pkg_json_string = Buffer.from(data.content, "base64").toString();
      if (data && data.encoding === "base64" && data.content) {
        const pkg_json = JSON.parse(
          pkg_json_string,
        ) as RequiredDecodedPackageJson;
        const packages = Object.keys(pkg_json.dependencies)
          .concat(Object.keys(pkg_json.devDependencies))
          .filter((key) => !key.includes("@types"));
        //  use set to dedup
        const deduped_pkgs = [...new Set(packages)];
        return deduped_pkgs;
      }
      return [];
    })
    .catch((error: any) => {
      // console.log("getOneRepoPackages error ================  ",error)
      return {
        error: {
          message: error.message,
          original_error: error,
        },
      };
    });
}

export async function getProfileProject(input: {
  owner: string;
  repo: string;
}) {
  try {
    const one_repo = await getOneRepo(input);
    const one_repo_langs = await getOneRepoLanguages(input);
    const one_repo_pkgs = await getOneRepoPackages(input);
    if (one_repo_pkgs && "error" in one_repo_pkgs) {
      throw one_repo_pkgs;
    }
    if (one_repo && "error" in one_repo) {
      throw one_repo;
    }
    if (one_repo_langs && "error" in one_repo_langs) {
      throw one_repo_langs;
    }
    // console.log("one repo  ==== ",one_repo)
    const random_number = Math.floor(Math.random() * 10000);
    const project: Omit<StackistanUserProjectsCreate, "user"> = {
      name: one_repo.name ?? "",
      description: one_repo.description ?? "",
      link: one_repo.html_url ?? "",
      image_url: `https://opengraph.githubassets.com/${random_number}/${input.owner}/${input.repo}`,
    //   libraries: one_repo_pkgs?.join(",") ?? "",
    //   languages: one_repo_langs?.join(",") ?? "",
  
    };
    return project;
  } catch (error: any) {
    // console.log("getProfileProject error========= ",error)
    return {
      error: {
        message: error.message,
        original_error: error,
      },
    };
  }
}
