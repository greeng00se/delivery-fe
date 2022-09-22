import { defineStore } from "pinia";
import { useMyFetch } from "~~/composable/useMyFetch";
import { OwnerLogin } from "~~/models/auth/OwnerLogin";
import { OwnerRegister } from "~~/models/auth/OwnerRegister";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      token: "",
    };
  },
  getters: {
    isLogined: (state) => !!state.token,
  },
  actions: {
    async login(owner: OwnerLogin) {
      const { data, error } = await useMyFetch("/owner/login", {
        method: "POST",
        body: owner,
      });

      if (!error.value) {
        this.token = data.value["token"];
      }

      return { data, error };
    },
    async register(owner: OwnerRegister) {
      return await useMyFetch("/owner/register", {
        method: "POST",
        body: owner,
      });
    },
    async logout() {
      this.token = "";
    },
  },
  persist: true,
});