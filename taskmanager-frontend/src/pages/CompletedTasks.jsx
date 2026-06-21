import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCompletedTasks,
  clearCompletedTasks,
  deleteTask,
} from "../api/taskApi";

export const CompletedTasks = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["completedTasks"],
    queryFn: async () => {
      const response = await getCompletedTasks();
      return response.data;
    },
  });

  const clearCompletedMutation = useMutation({
    mutationFn: clearCompletedTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["completedTasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["completedTasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading completed tasks</h2>;

  return (
    <div className="min-h-screen bg-slate-950 p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Completed Tasks</h2>

        <div className="flex gap-3">
          <Link
            to="/"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
          >
            Go To Tasks
          </Link>

          <button
            onClick={() => clearCompletedMutation.mutate()}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white"
          >
            Clear All Completed
          </button>
        </div>
      </div>

      {data?.length === 0 ? (
        <h3 className="text-white">No completed tasks found.</h3>
      ) : (
        data?.map((task) => (
          <div
            key={task.id}
            className="border rounded-md p-4 mb-4 bg-slate-900 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg text-white">{task.title}</h3>

              <p className="text-white">{task.description}</p>

              <p className="text-sm text-gray-400 mt-2">
                Created: {new Date(task.createdAt).toLocaleString()}
              </p>

              <p className="text-sm text-green-400">
                Completed: {new Date(task.completedAt).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => deleteMutation.mutate(task.id)}
              className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};
