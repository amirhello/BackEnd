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
  }
  // if (mutationPost.isError) {
  //   return (

  //   );
  // }

  // if (mutationPost.isPending) {
  //   return <>Loading...</>;
  // }

  return (
    <div
      className=" border bg-slate-200 border-black p-3 flex-row w-full
     "
    >
      <div className=" flex justify-between items-center ">
        <input
          className="border-2 ml-1 rounded-lg text-center"
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <input
          className="border-2 ml-1 rounded-lg text-center"
          required
          type="number"
          onChange={(e) => setCount(Number(e.target.value))}
          placeholder="count"
        />
        <input
          className="border-2 rounded-lg ml-1 text-center"
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <input
          className="border-2 ml-1 text-center rounded-lg "
          required
          type="number"
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="price"
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          className="bg-green-300 p-2 rounded-xl mt-2 text-center "
          onClick={(e) => {
            e.preventDefault(); // غیرفعال کردن رفتار پیش‌فرض
            handelPost();
          }}
        >
          creat a new product
        </button>
      </div>
      <>
        {mutationPost.isError ? (
          <p className="text-red-400">
            You have some error in creating new product:{" "}
            {mutationPost.error?.message || "Unknown Error"}
            ,You should make correct product
          </p>
        ) : (
          <></>
        )}
        {mutationPost.isPending ? <>Loading...</> : <></>}
      </>
    </div>
  );
}

export default PostData;
