export const SITE = {
  name: "Gạo Trần Huy",
  url: "https://gaotranhuy.vn",
  description:
    "Gạo Trần Huy – Cửa hàng gạo, nước mắm nhĩ NAM Ô, dầu lạc nguyên chất. Gạo đặc sản, gạo bình dân, gạo lứt, nếp. Giao hàng tận nơi, giá tốt.",
  phone: "0905 123 456",
  zalo: "0905123456",
  email: "lienhe@gaotranhuy.vn",
  address: "123 Đường Trần Phú, Phường Hòa Cường Nam, Quận Hải Châu, Đà Nẵng",
  workingHours: "7:00 – 20:00 (T2 – CN)",
  facebook: "https://facebook.com/gaotranhuy",
  zaloLink: "https://zalo.me/0905123456",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0!2d108.2!3d16.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDAzJzAwLjAiTiAxMDjCsDEyJzAwLjAiRQ!5e0!3m2!1svi!2s!4v1700000000000",
};

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}
