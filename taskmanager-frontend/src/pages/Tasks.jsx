import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, deleteTask } from "../api/taskApi";
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

    onError: (error) => {
      console.error(error);
    },
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Error loading tasks</h2>;

  return (
    <div>
      <h2>Task List</h2>

      <Form editTask={editTask} setEditTask={setEditTask} />

      {data?.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <button onClick={() => setEditTask(task)}>Edit</button>

          <button
            onClick={() => deleteMutation.mutate(task.id)}
            disabled={deleteMutation.isPending}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
