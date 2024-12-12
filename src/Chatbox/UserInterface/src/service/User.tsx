import { get, putJson } from "@/utils/fetch";

/**
 * 获取当前用户信息
 * @returns 返回用户信息
 */
export async function getCurrentUser(): Promise<{
  data: {
    id: string;
    avatar: string;
    username: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    createdAt: string;
    lastLoginAt: string | null;
    roles: string[];
  },
  code: number;
  message: string;
}> {
  const url = "/apis/user";
  return await get(url);
} 

// change-password 
export async function changePassword(data: {
  oldPassword: string;
  newPassword: string;
  captchaKey: string;
  captchaCode: string;
}) {
  const url = "/apis/user/change-password";
  return await putJson(url, data);
}

