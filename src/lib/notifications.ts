import { toast } from 'sonner';

type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export const notify = {
  success: (message: string, options?: { description?: string }) => {
    toast.success(message, {
      description: options?.description,
      className: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
    });
  },
  
  error: (message: string, options?: { description?: string }) => {
    toast.error(message, {
      description: options?.description,
      className: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
    });
  },
  
  info: (message: string, options?: { description?: string }) => {
    toast(message, {
      description: options?.description,
      className: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
    });
  },
  
  warning: (message: string, options?: { description?: string }) => {
    toast.warning(message, {
      description: options?.description,
      className: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
    });
  },
  
  loading: (message: string, options?: { description?: string }) => {
    return toast.loading(message, {
      description: options?.description,
      className: 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-200',
    });
  },
  
  dismiss: (id: string | number) => {
    toast.dismiss(id);
  },
  
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    },
    options?: {
      loadingDescription?: string;
      successDescription?: string | ((data: T) => string);
      errorDescription?: string | ((error: Error) => string);
    }
  ) => {
    const toastId = toast.loading(messages.loading, {
      description: options?.loadingDescription,
    });
    
    promise
      .then((data) => {
        const successMessage = typeof messages.success === 'function' ? messages.success(data) : messages.success;
        const successDescription = typeof options?.successDescription === 'function' 
          ? options.successDescription(data) 
          : options?.successDescription;
        
        toast.success(successMessage, {
          id: toastId,
          description: successDescription,
          className: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
        });
        return data;
      })
      .catch((error) => {
        const errorMessage = typeof messages.error === 'function' ? messages.error(error) : messages.error;
        const errorDescription = typeof options?.errorDescription === 'function'
          ? options.errorDescription(error)
          : options?.errorDescription;
        
        toast.error(errorMessage, {
          id: toastId,
          description: errorDescription || error.message,
          className: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
        });
        throw error;
      });
      
    return promise;
  }
};

export default notify;
