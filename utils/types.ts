export type ActionStatus = 'idle' | 'success' | 'error';

export type ActionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ status: ActionStatus; message: string }>;
