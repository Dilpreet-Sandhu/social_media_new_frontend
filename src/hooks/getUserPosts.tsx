import {
  useGetSavedPostQuery,
  useGetUserPostsQuery,
} from "../redux/slices/apiSlice";

export const useGetUserPosts = (userId: string) => {
  const { data, isError, isLoading } = useGetUserPostsQuery(userId);

  return { data, loading: isLoading, isError };
};


export const useGetUserSavedPosts = () => {
    const {data,isError,isLoading} = useGetSavedPostQuery();

    return {data,isLoading,isError};
}