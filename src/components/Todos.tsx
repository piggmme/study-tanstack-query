import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

const getTodos = () => axios.get<Todo[]>("/api/todos");
const postTodo = ({ id, content, completed }: Todo) =>
  axios.post<Todo[]>("/api/todos", {
    id,
    content,
    completed,
  });
const completeTodo = ({ id, completed }: Omit<Todo, "content">) =>
  axios.patch<Todo[]>(`/api/todos/${id}`, {
    completed,
  });
const deleteTodo = ({ id }: Pick<Todo, "id">) =>
  axios.delete<Todo[]>(`/api/todos/${id}`);

export default function Todos() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data } = useQuery({ queryKey: ["todos"], queryFn: getTodos });

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
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const [newTodo, setNewTodo] = useState("");

  return (
    <div>
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
        {data?.data?.map(({ id, content, completed }) => (
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
