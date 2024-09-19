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
    <div className="flex flex-wrap bg-slate-100">
      {data.map((item: DataType) => (
        <div className="w-1/4  p-2 ">
          <p>Count: {item.count}</p>
          <p>Name: {item.name}</p>
          <p>Title: {item.title}</p>
          <p>Price: {item.price}</p>
          <Deleting id={item.id} />
          <div>
            <Put id={item.id} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowProduct;
