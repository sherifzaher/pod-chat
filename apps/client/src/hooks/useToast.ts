import { Theme, toast, ToastOptions } from 'react-toastify';

export function useToast(defaultOptions: ToastOptions) {
  const success = (message: string) => {
    toast(message, { ...defaultOptions, type: 'success' });
  };
  const error = (message: string, options?: ToastOptions) => {
    toast(message, { ...defaultOptions, ...options, type: 'error' });
  };

  const info = (message: string, options?: ToastOptions) => {
    toast(message, { ...defaultOptions, ...options, type: 'info' });
  };

  return { success, error, info };
}
