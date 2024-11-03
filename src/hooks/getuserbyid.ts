import { useFetchUserQuery } from "../redux/slices/apiSlice";

export const useGetUserById = (userId: string) => {
  const { data, isLoading, isError } = useFetchUserQuery(userId);

  return { user: data?.data, loading: isLoading, isError };
};
