import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with our database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export async function uploadImage(image: File) {
  const bucket = 'main-bucket';
  const path = `${crypto.randomUUID()}/${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, image, {
      cacheControl: '3600'
    });

  if (data) {
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  } else {
    throw new Error(error.message);
  }
}
