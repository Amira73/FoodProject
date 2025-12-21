import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useApiGet({ http, key, path, enabled = true, config }) {
  return useQuery({
    queryKey: key,
    enabled,
    queryFn: async () => {
      const res = await http.get(path, config);
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 60_000,

  });
}


export function useApiPost({ http, invalidateKeys = [], config }) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ path, body }) => {
      const res = await http.post(path, body, config);
      return res.data;
    },
    onSuccess: () => {
      invalidateKeys.forEach((k) => qc.invalidateQueries({ queryKey: k }));
    },
  });
}


export function useApiDelete({ http, invalidateKeys = [], config } = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ path }) => {
      const res = await http.delete(path, config);
      return res.data;
    },
    onSuccess: () => {
      invalidateKeys.forEach((k) => qc.invalidateQueries({ queryKey: k }));
    },
  });
   }