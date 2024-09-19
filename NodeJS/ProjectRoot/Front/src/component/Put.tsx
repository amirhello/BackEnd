import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Put } from "../Utils/Fetching";
import { useState } from "react";

function Updating({ id }: { id: number }) {
  const queryClient = useQueryClient();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [count, setCount] = useState<number | undefined>(undefined);

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
  }

  return (
    <div className="bg-slate-200 p-3">
      <div>
        <input
          className="px-2  bg-slate-400 text-black placeholder-black border-2 rounded-lg hover:bg-slate-300 border-gray-600"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          required
        />
        <input
          className=" px-2 bg-slate-400 text-black placeholder-black border-2 rounded-lg hover:bg-slate-300 border-gray-600"
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          placeholder="count"
          required
        />
        <input
          className="px-2 bg-slate-400 text-black placeholder-black border-2 rounded-lg hover:bg-slate-300 border-gray-600"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          required
        />
        <input
          className=" px-2 bg-slate-400 text-black placeholder-black border-2 rounded-lg hover:bg-slate-300 border-gray-600"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="price"
          required
        />
        <button
          onClick={handleUpdate}
          className="bg-green-300 p-2 rounded-md ml-2"
        >
          Update Product
        </button>
      </div>
      {mutationPut.isError && (
        <>
          {mutationPut.error.message.split(",").map((mesg, index) => (
            <p key={index} className="text-rose-400">
              {mesg}
            </p>
          ))}
        </>
      )}
    </div>
  );
}

export default Updating;
