import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../app/hooks/useAuth';
import AuthService, { SigninParams } from '../../../app/services/AuthService';
import { FormData, schemaLogin } from '../../../app/validations/schemaLogin';

export default function useLogin() {
  const {
    register, handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaLogin),
  });

  const { signin } = useAuth();

  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SigninParams) => AuthService.signin(data),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigate('/');
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    const { accessToken } = await mutateAsync(data);

    signin(accessToken);
  });

  return {
    register, handleSubmit, errors, isLoading,
  };
}
