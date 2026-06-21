import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, deleteTask, completeTask } from "../api/taskApi";
import { Form } from "../components/Form";

export const Tasks = () => {
  const queryClient = useQueryClient();
  const [editTask, setEditTask] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await getTasks();
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const completeMutation = useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading tasks</h2>;

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-10 bg-slate-950">
      <Link
        to="/completed"
        className="absolute top-10 right-10 px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white"
      >
        Completed Tasks
      </Link>

      <h2 className="text-3xl font-bold mb-6 text-white">Task List</h2>

      <Form editTask={editTask} setEditTask={setEditTask} />

      <div className="mt-8 w-full max-w-2xl shadow-lg bg-slate-900">
        {data
          ?.filter((task) => !task.completed)
          .map((task) => (
            <div
              key={task.id}
              className="border rounded-md p-4 mb-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-lg text-white">{task.title}</h3>

                <p className="my-2 text-white">{task.description}</p>

                <p className="text-sm text-gray-400">
                  Created: {new Date(task.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditTask(task)}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMutation.mutate(task.id)}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white"
                >
                  Delete
                </button>

                <button
                  onClick={() => completeMutation.mutate(task.id)}
                  className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white"
                >
                  Complete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
