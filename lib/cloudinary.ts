export const CLOUDINARY_CLOUD_NAME = "f9krxetg";
export const CLOUDINARY_UPLOAD_PRESET = "gaotranhuy";

export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Upload thất bại. Vui lòng thử lại.");
  }

  const data = await res.json();
  return data.secure_url as string;
}
