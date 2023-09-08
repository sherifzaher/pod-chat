import { Theme, toast, ToastOptions } from 'react-toastify';

export function useToast(options: ToastOptions) {
  const success = (message: string) => {
    toast(message, { ...options, type: 'success' });
  };
  const error = (message: string) => {
    toast(message, { ...options, type: 'error' });
  };

  return { success, error };
}
