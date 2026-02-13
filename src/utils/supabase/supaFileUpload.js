import { supabase } from "./supabase.config";

const BUCKET = "super saving market";

export const uploadMultipleImages = async (input) => {
  try {
    // 🔹 normalize input
    let files = [];

    if (!input) return [];

    if (Array.isArray(input)) files = input;
    else if (input instanceof FileList) files = Array.from(input);
    else if (input instanceof File) files = [input];
    else return [];

    if (!files.length) return [];

    // 🔹 parallel upload
    const uploadPromises = files.map(async (file) => {
      if (!file?.type?.startsWith("image/")) return null;

      const ext = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(fileName);

      return data.publicUrl;
    });

    const urls = await Promise.all(uploadPromises);
    return urls.filter(Boolean);

  } catch (err) {
    console.error("Supabase upload error:", err);
    throw err;
  }
};
