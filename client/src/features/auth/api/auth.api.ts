import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api/axios';
import { useAuthStore } from '@/entities/user/model/useAuthStore';
import { useRouter } from 'next/navigation';
import { LoginInput, RegisterInput, User } from '../types/auth.types';

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const { data: { access_token } } = await api.post<{ access_token: string }>('/auth/login', data);
      const { data: user } = await api.get<User>('/auth/me', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      return { access_token, user };
    },
    onSuccess: ({ access_token, user }) => {
      login(access_token, user);
      router.push('/dashboard');
    },
  });
};

export const useRegister = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: RegisterInput) => {
      await api.post('/auth/register', data);
      const { data: { access_token } } = await api.post<{ access_token: string }>('/auth/login', {
        email: data.email,
        password: data.password,
      });
      const { data: user } = await api.get<User>('/auth/me', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      return { access_token, user };
    },
    onSuccess: ({ access_token, user }) => {
      login(access_token, user);
      router.push('/dashboard');
    },
  });
};

export const useGoogleLoginCallback = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: async (token: string) => {
      const { data: user } = await api.get<User>('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { access_token: token, user };
    },
    onSuccess: ({ access_token, user }) => {
      login(access_token, user);
      router.push('/dashboard');
    },
  });
};
