export type DummyProduct = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type ActionStatus = 'idle' | 'success' | 'error';

export type ActionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ status: ActionStatus; message: string }>;
