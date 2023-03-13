import axios from "axios";

type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

export const getTodos = async () => {
  const data = await axios.get<Todo[]>("/api/todos");
  return data?.data;
};

export const postTodo = async ({ id, content, completed }: Todo) => {
  const data = await axios.post<Todo[]>("/api/todos", {
    id,
    content,
    completed,
  });
  return data?.data;
};

export const completeTodo = async ({
  id,
  completed,
}: Omit<Todo, "content">) => {
  const data = await axios.patch<Todo[]>(`/api/todos/${id}`, {
    completed,
  });
  return data?.data;
};

export const deleteTodo = async ({ id }: Pick<Todo, "id">) =>
  axios.delete<Todo[]>(`/api/todos/${id}`);
