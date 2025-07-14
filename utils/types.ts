export type ActionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ status: 'idle' | 'success' | 'error'; message: string }>;
