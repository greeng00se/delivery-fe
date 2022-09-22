import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref("");

    const isLogined = computed(() => (token.value == "" ? false : true));

    const register = async (username, email, password) => {
      if (!username || !email || !password) return;

      const body = {
        name: username,
        email: email,
        password: password,
      };

      return await useFetch("https://api.myeats.me/api/owner/register", {
        method: "POST",
        body: body,
      });
    };

    const login = async (username, password) => {
      if (!username || !password) return;

      const body = {
        name: username,
        password: password,
      };

      const { data, error } = await useFetch(
        "https://api.myeats.me/api/owner/login",
        {
          method: "POST",
          body: body,
        }
      );

      if (!error.value) {
        token.value = data.value["token"];
      }

      return { data, error };
    };

    const logout = () => {
      token.value = "";
    };

    return { token, register, login, logout, isLogined };
  },
  {
    persist: true,
  }
);
