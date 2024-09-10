import { get, post } from "@/helper/web.requests";
import { FilterState } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await get("/get-users");
      return res;
    },
  });
};

export const useContacts = (data: FilterState) => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await post("/v1/contacts/all", data);
      return res;
    },
  });
};

export const useContact = (id: String) => {
  return useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const res = await get("/v1/contacts/" + id);
      return res;
    },
  });
};
