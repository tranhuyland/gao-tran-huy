export const SHEET_WEBHOOK_URL = "";

export type SheetAction = "add" | "update" | "delete";

export async function syncToSheet(
  action: SheetAction,
  sheet: "sp" | "blog",
  data: Record<string, any>
): Promise<{ success: boolean; message: string }> {
  if (!SHEET_WEBHOOK_URL) {
    return {
      success: false,
      message: "Chưa cấu hình SHEET_WEBHOOK_URL. Mục 4 trong hướng dẫn để bật đồng bộ.",
    };
  }

  try {
    const res = await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, sheet, data }),
    });

    if (!res.ok) throw new Error("Webhook failed");
    return { success: true, message: "Đã đồng bộ lên Google Sheet." };
  } catch (err) {
    return {
      success: false,
      message: "Đã lưu trên web nhưng đồng bộ Sheet thất bại. Kiểm tra Apps Script.",
    };
  }
}
