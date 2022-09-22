<template>
  <div>
    <v-container align="center">
      <Form as="v-form" @submit="login" :validation-schema="loginSchema">
        <v-card variant="outlined" max-width="420px">
          <v-card-item>
            <v-card-title> 사장님 로그인 </v-card-title>
          </v-card-item>
          <v-card-item>
            <TextFieldWithValidation
              v-model="username"
              name="username"
              label="아이디"
              type="string"
            />
            <TextFieldWithValidation
              v-model="password"
              name="password"
              label="비밀번호"
              type="password"
            />
            <v-btn type="submit" width="100%" color="success">로그인</v-btn>
          </v-card-item>
          <v-card-actions>
            <v-btn type="button" to="/register" color="success">회원가입</v-btn>
          </v-card-actions>
        </v-card>
      </Form>
      <v-snackbar v-model="loginAlert" location="bottom"
        >로그인 실패
        <template v-slot:actions>
          <v-btn color="red" @click="loginAlert = false"> 닫기 </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { Form, useForm } from "vee-validate";
import * as yup from "yup";

const username = ref("");
const password = ref("");
const loginAlert = ref(false);

const loginSchema = yup.object({
  username: yup.string().min(4).required().label("아이디"),
  password: yup.string().min(8).required().label("비밀번호"),
});

useForm({
  validationSchema: loginSchema,
});

const login = async () => {
  const authStore = useAuthStore();

  const { error } = await authStore.login(username.value, password.value);

  if (error.value) {
    loginAlert.value = true;
    return;
  }

  return navigateTo({
    path: "/",
  });
};
</script>
