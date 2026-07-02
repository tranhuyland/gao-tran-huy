/**
 * Cloudinary configuration for unsigned uploads.
 * Cloud Name: f9krxetg
 * Upload Preset (unsigned): gaotranhuy
 */
export const CLOUDINARY_CLOUD_NAME = "f9krxetg";
export const CLOUDINARY_UPLOAD_PRESET = "gaotranhuy";

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Upload a file to Cloudinary using unsigned upload preset.
 * Returns the secure URL of the uploaded image.
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Cloudinary upload failed: ${err}`);
  }

  const data = await res.json();
  return data.secure_url as string;
}
