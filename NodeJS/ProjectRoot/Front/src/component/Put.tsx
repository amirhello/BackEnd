import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Put } from "../Utils/Fetching";
import { useState } from "react";

function Updating({ id }: { id: number }) {
  const queryClient = useQueryClient();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [count, setCount] = useState<number | undefined>(undefined);
  const [showUpdata, setShowUpdata] = useState<boolean>(false);

  const mutationPut = useMutation({
    mutationFn: Put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Product"] });
      setName("");
      setPrice(0);
      setTitle("");
      setCount(0);
    },
  });

  function handleUpdate() {
    let obj = { price, title, name, count, id };
    mutationPut.mutate(obj);
    setShowUpdata(false);
  }

  return (
    <div className="bg-slate-100 p-1 rounded-lg shadow-lg max-w-md mx-auto">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 w-full mb-4"
        onClick={() => setShowUpdata(!showUpdata)}
      >
        Click to Edit Product
      </button>

      {showUpdata && (
        <div className="space-y-4">
          <input
            className="w-full px-4 py-2 bg-gray-100 text-black placeholder-gray-500 border-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            required
          />
          <input
            className="w-full px-4 py-2 bg-gray-100 text-black placeholder-gray-500 border-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            type="number"
            value={count === 0 ? "" : count}
            onChange={(e) => setCount(Number(e.target.value))}
            placeholder="Count"
            required
          />
          <input
            className="w-full px-4 py-2 bg-gray-100 text-black placeholder-gray-500 border-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input
            className="w-full px-4 py-2 bg-gray-100 text-black placeholder-gray-500 border-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            type="number"
            value={price === 0 ? "" : price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
            required
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
          >
            Update Product
          </button>
        </div>
      )}

      {mutationPut.isError && (
        <div className="mt-4 space-y-2">
          {mutationPut.error.message.split(",").map((mesg, index) => (
            <p key={index} className="text-red-500">
              {mesg}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Updating;
