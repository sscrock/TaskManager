import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, updateTask } from "../api/taskApi";

export const Form = ({ editTask, setEditTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
    }
  }, [editTask]);

  const createMutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setTitle("");
      setDescription("");
    },

    onError: (error) => {
      console.error(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, task }) => updateTask(id, task),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setTitle("");
      setDescription("");
      setEditTask(null);
    },

    onError: (error) => {
      console.error(error);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
    };

    if (editTask) {
      updateMutation.mutate({
        id: editTask.id,
        task,
      });
    } else {
      createMutation.mutate(task);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        disabled={createMutation.isPending || updateMutation.isPending}
        className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
      >
        {editTask ? "Update" : "Submit"}
      </button>
    </form>
  );
};
