import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getRepoData = async () => {
  const data = await axios.get<any>("/repos-api/react-query");
  return data?.data;
};

export default function RepoData() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: getRepoData,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error?.message}</div>;

  return (
    <div
      style={{ border: "5px solid skyblue", margin: "10px", padding: "10px" }}
    >
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
      <strong>👀 {data?.subscribers_count}</strong>{" "}
      <strong>✨ {data?.stargazers_count}</strong>{" "}
      <strong>🍴 {data?.forks_count}</strong>
    </div>
  );
}
