import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../app/hooks/useAuth';
import AuthService, { SignupParams } from '../../../app/services/AuthService';
import { FormData, schemaRegister } from '../../../app/validations/schemaRegister';

export default function useRegister() {
  const {
    register, handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaRegister),
  });

  const { signin } = useAuth();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => AuthService.signup(data),
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
    register, handleSubmit, errors, isLoading, t,
  };
}
