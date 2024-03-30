import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { usePocketbase } from "@/lib/pb/hooks/use-pb";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSuspenseQuery } from "@tanstack/react-query";

interface ResumeListProps {}

export function ResumeList({}: ResumeListProps) {
  const { pb } = usePocketbase();
  const query = useSuspenseQuery({
    queryKey: ["resume"],
    queryFn: () => {
      return pbTryCatchWrapper(
        pb.from("stackistan_resume_profile").getFullList(),
      );
    },
  });
  const data = query?.data?.data;
  if (query.data?.error) {
    return <ErrorOutput error={query.data?.error} />;
  }
  if (query.isError) {
    return (
      <ErrorOutput
        error={{
          name: "Error getting resumes",
          message: query?.error?.message ?? "something went wrong",
        }}
      />
    );
  }
  if (!data || data.length === 0)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">no resumes found</div>
      </div>
    );
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="w-full h-full flex flex-wrap items-center justify-center gap-3">
        {data?.map((item) => {
          return (
            <li
              key={item.id}
              className="p-2 bg-base-100 rounded-md w-[90%] md:w-[45%] lg:w-[30%]"
            >
              <h1 className="text-3xl">{item.type}</h1>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
