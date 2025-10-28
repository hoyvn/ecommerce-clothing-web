<!-- src/components/LoginTest.vue -->
<template>
  <div class="login-test">
    <h2>登入測試</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="帳號" />
      <input v-model="password" type="password" placeholder="密碼" />
      <select v-model="role">
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">登入</button>
    </form>
    <p v-if="loginResult !== null">{{ loginResult ? '登入成功' : '登入失敗' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AuthService} from "../../service/business/auth.service.ts";
import type { UserRoleModel } from '../../model/role';

const authService = new AuthService()

const username = ref('')
const password = ref('')
const role = ref<UserRoleModel>('customer')
const loginResult = ref<boolean | null>(null)

async function handleLogin() {
  loginResult.value = await authService.login(username.value, password.value, role.value)
}
</script>

<style scoped>
.login-test {
  max-width: 300px;
  margin: auto;
}
input, select {
  display: block;
  margin-bottom: 10px;
  width: 100%;
}
</style>