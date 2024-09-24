import { useQuery } from "@tanstack/react-query";
import Deleting from "./Delete";
import { DataType } from "../Type/ProductType";
import { Fetching } from "../Utils/Fetching";
import Put from "./Put";
function ShowProduct() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Product"],
    queryFn: Fetching,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Count</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: DataType) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">${item.price}</td>
                <td className="px-4 py-2">{item.count}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
                    <div className="block sm:inline w-full sm:w-auto">
                      <Deleting id={item.id} />
                    </div>
                    <div className="block sm:inline w-full sm:w-auto">
                      <Put id={item.id} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowProduct;
