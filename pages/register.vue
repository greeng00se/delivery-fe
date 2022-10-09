<template>
  <div>
    <v-container align="center">
      <Form as="v-form" @submit="register" :validation-schema="registerSchema">
        <v-card variant="outlined" max-width="420px">
          <v-card-item>
            <v-card-title> 사장님 회원가입 </v-card-title>
          </v-card-item>
          <v-card-item>
            <TextFieldWithValidation
              v-model="owner.name"
              name="name"
              label="아이디"
              type="string"
            />
            <TextFieldWithValidation
              v-model="owner.email"
              name="email"
              label="이메일"
              type="string"
            />
            <TextFieldWithValidation
              v-model="owner.password"
              name="password"
              label="비밀번호"
              type="password"
            />
            <TextFieldWithValidation
              v-model="owner.passwordConfirm"
              name="passwordConfirm"
              label="비밀번호 확인"
              type="password"
            />
            <v-btn type="submit" width="100%" color="success">회원가입</v-btn>
          </v-card-item>
        </v-card>
      </Form>
      <v-snackbar v-model="registerAlert" location="bottom"
        >회원가입 실패
        <template v-slot:actions>
          <v-btn color="red" @click="registerAlert = false"> 닫기 </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { Form, useForm } from "vee-validate";
import * as yup from "yup";
import { useAuthStore } from "@/stores/auth";
import { OwnerRegister } from "~~/models/auth/OwnerRegister";

let owner: OwnerRegister = {} as OwnerRegister;
let registerAlert = ref(false);

const registerSchema = yup.object({
  name: yup.string().min(4).required().label("아이디"),
  email: yup.string().email().label("이메일"),
  password: yup.string().min(8).required().label("비밀번호"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required(),
});

useForm({
  validationSchema: registerSchema,
});

const register = async () => {
  const authStore = useAuthStore();

  const { error } = await authStore.register(owner);

  if (error.value) {
    registerAlert.value = true;
    return;
  }

  return navigateTo({
    path: "/",
  });
};
</script>
