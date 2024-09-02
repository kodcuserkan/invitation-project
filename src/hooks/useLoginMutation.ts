// src/hooks/useLoginMutation.ts
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login } from '@/utils/userFunctions';
import { UserType } from '@/types';
import { LoginDataType } from '@components/forms/schemas';

// Define the mutation result types
export const useLoginMutation = (): UseMutationResult<
    UserType | null,
    Error,
    LoginDataType
> => {
    return useMutation<UserType | null, Error, LoginDataType>({
        mutationFn: login,
        onSuccess: (data) => {
            console.log('Login attempt:', data);

            if (data) {
                localStorage.setItem(
                    'app-user',
                    JSON.stringify({
                        user: data,
                        expiration: new Date().setMinutes(
                            new Date().getMinutes() + 15
                        )
                    })
                );

                // Redirect to the dashboard
                // window.location.href = '/';
                return;
            }

            alert('Something went wrong, Please try again.');
        },
        onError: (error) => {
            console.error('Login failed:', error);
            // Handle login error (e.g., show error message)
            alert('Login failed. Please try again.');
        }
    });
};
