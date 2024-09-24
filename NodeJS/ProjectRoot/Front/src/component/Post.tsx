import { useState } from "react";
import { Post } from "../Utils/Fetching";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function PostData() {
  const queryClient = useQueryClient();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const mutationPost = useMutation({
    mutationFn: Post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Product"] });
    },
  });
  function handelPost() {
    let obj = { price, title, name, count };
    mutationPost.mutate(obj);
    setCount(0);
    setPrice(0);
    setTitle("");
    setName("");
  }
  // if (mutationPost.isError) {
  //   return (

  //   );
  // }

  // if (mutationPost.isPending) {
  //   return <>Loading...</>;
  // }

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Create a New Product
      </h2>

      <div className="flex flex-col sm:flex-row justify-between flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-2">
        <input
          className="border-2 border-gray-400 rounded-lg p-3 text-center placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          required
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          className="border-2 border-gray-400 rounded-lg p-3 text-center placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          required
          value={count === 0 ? "" : count}
          type="number"
          onChange={(e) => setCount(Number(e.target.value))}
          placeholder="Count"
        />
        <input
          className="border-2 border-gray-400 rounded-lg p-3 text-center placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          required
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product Title"
        />
        <input
          className="border-2 border-gray-400 rounded-lg p-3 text-center placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          required
          value={price === 0 ? "" : price}
          type="number"
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="bg-green-600 text-white p-3 rounded-lg shadow-md hover:bg-green-700 transition duration-200 font-semibold"
          onClick={(e) => {
            e.preventDefault();
            handelPost();
          }}
        >
          Create Product
        </button>
      </div>

      {mutationPost.isError && (
        <p className="mt-2 text-red-500 text-sm">
          Error creating product:{" "}
          {mutationPost.error?.message || "Unknown Error"}. Please check the
          details.
        </p>
      )}

      {mutationPost.isPending && (
        <p className="mt-2 text-blue-500 text-sm">Loading...</p>
      )}
    </div>
  );
}

export default PostData;
