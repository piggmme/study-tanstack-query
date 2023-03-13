import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { completeTodo, deleteTodo, getTodos, postTodo } from "../api/todos";

export default function Todos() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Mutations
  const postTodoMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const completeTodoMutation = useMutation({
    mutationFn: completeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const [newTodo, setNewTodo] = useState("");

  if (isLoading) return <>isLoading</>;

  if (error) return <>{JSON.stringify(error)}</>;

  return (
    <div
      style={{ border: "5px solid tomato", margin: "10px", padding: "10px" }}
    >
      <input
        type={"text"}
        placeholder="할 일을 입력하세요"
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button
        onClick={() => {
          postTodoMutation.mutate({
            id: Date.now(),
            content: newTodo,
            completed: false,
          });
          setNewTodo("");
        }}
      >
        추가
      </button>

      <ul>
        {data?.map(({ id, content, completed }) => (
          <li key={id}>
            <input
              type={"checkbox"}
              checked={completed}
              onChange={() => {
                completeTodoMutation.mutate({
                  id,
                  completed: !completed,
                });
              }}
            />
            {content}
            <button
              type="button"
              onClick={() => {
                deleteTodoMutation.mutate({
                  id,
                });
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
