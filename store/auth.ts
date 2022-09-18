import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const accessToken = ref("");

    const register = async (username, password) => {
      if (!username || !password) return;

      const body = {
        username: username,
        password: password,
      };

      return await useFetch("https://api.myeats.dev/api/owner/register", {
        method: "POST",
        body: body,
      });
    };

    const login = async (username, password) => {
      if (!username || !password) return;

      const body = {
        username: username,
        password: password,
      };

      const { data, error } = await useFetch(
        "https://api.myeats.dev/api/owner/login",
        {
          method: "POST",
          body: body,
        }
      );

      if (!error.value) {
        accessToken.value = data.value["accessToken"];
      }

      return { data, error };
    };

    const logout = () => {
      accessToken.value = "";
    };

    return { accessToken, register, login, logout };
  },
  {
    persist: true,
  }
);
