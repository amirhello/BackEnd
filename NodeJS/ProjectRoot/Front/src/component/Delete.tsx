import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Delete } from "../Utils/Fetching";

export default function Deleting({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: Delete,
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Product"] });
    },
  });

  function handelDelete(id: number) {
    mutationDelete.mutate(id);
  }

  return (
    <div className="text-center">
      <button
        className="bg-red-600 text-white px-4 py-2 rounded-xl m-1 shadow-lg hover:bg-red-700 transition-all duration-200 ease-in-out transform hover:scale-105"
        onClick={() => handelDelete(id)}
      >
        Delete Product
      </button>
    </div>
  );
}
