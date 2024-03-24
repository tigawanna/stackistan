interface GenericTableProps {}

export function GenericTable({}: GenericTableProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-x-auto px-2">
      <table className="w-full table bg-base-300/40 ">
        <thead className="w-full bg-base-300">
          <tr className="w-full text-lg">
            <th>School</th>
            <th>Field of study</th>
            <th>Qualification</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}


