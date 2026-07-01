import type { Category, Product, NewsArticle } from "@/types";

export const categories: Category[] = [
  {
    slug: "gao-binh-dan",
    name: "Gạo Bình Dân – Gạo Quê",
    description:
      "Gạo quê truyền thống, giá hợp lý, phù hợp dùng hàng ngày cho mọi gia đình. Hạt gạo chắc, cơm dẻo vừa, ngon miệng.",
    image:
      "https://images.pexels.com/photos/713465/pexels-photo-713465.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "gao-dac-san",
    name: "Gạo Đặc Sản – Dẻo Thơm",
    description:
      "Các loại gạo đặc sản vùng miền, hạt dài, dẻo thơm đặc trưng, dành cho những bữa cơm đẳng cấp.",
    image:
      "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "gao-nep-lut",
    name: "Gạo Nếp – Gạo Lứt",
    description:
      "Nếp cái hoa vàng, nếp thơm, gạo lứt trắng và lứt đỏ giàu dinh dưỡng, tốt cho sức khỏe.",
    image:
      "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "gao-pho-thong",
    name: "Gạo Phổ Thông – Thơm Dẻo Vừa",
    description:
      "Gạo thơm dẻo vừa phải, giá hợp lý, cân bằng cho nhu cầu hàng ngày của gia đình và nhà hàng.",
    image:
      "https://images.pexels.com/photos/713465/pexels-photo-713465.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "nuoc-mam-nam-o",
    name: "Nước Mắm Nhĩ NAM Ô – Dầu Lạc Nguyên Chất",
    description:
      "Nước mắm nhĩ NAM Ô truyền thống Đà Nẵng và dầu lạc nguyên chất, hương vị đậm đà quê hương.",
    image:
      "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "san-pham-khac",
    name: "Sản Phẩm Khác",
    description: "Các sản phẩm phụ trợ, gia vị và đặc sản khác từ Gạo Trần Huy.",
    image:
      "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const products: Product[] = [
  {
    id: "p01",
    slug: "gao-st25",
    name: "Gạo ST25 – Gạo Thơm Ngon Nhất Việt Nam",
    categorySlug: "gao-dac-san",
    price: 32000,
    oldPrice: 38000,
    unit: "kg",
    origin: "Sóc Trăng",
    shortDescription:
      "Gạo thơm ngon nhất Việt Nam, hạt dài, dẻo mềm, hương thơm đặc trưng.",
    description:
      "Gạo ST25 là giống lúa thơm nổi tiếng của Việt Nam, từng đạt giải Gạo ngon nhất thế giới. Hạt gạo dài, trắng trong, khi nấu chín cho cơm dẻo mềm, hương thơm thoang thoảng đặc trưng. Phù hợp cho gia đình, nhà hàng cao cấp và làm quà biếu.",
    image:
      "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/713465/pexels-photo-713465.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    rating: 4.9,
    sold: 1280,
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    tags: ["đặc sản", "thơm", "dẻo", "quà biếu"],
    nutrition: [
      { label: "Tinh bột", value: "78%" },
      { label: "Protein", value: "7%" },
      { label: "Độ dẻo", value: "Cao" },
      { label: "Hương thơm", value: "Đậm" },
    ],
  },
  {
    id: "p02",
    slug: "gao-thom-lai",
    name: "Gạo Thơm Lài",
    categorySlug: "gao-pho-thong",
    price: 22000,
    oldPrice: 26000,
    unit: "kg",
    origin: "Đồng bằng sông Cửu Long",
    shortDescription:
      "Gạo thơm lài dẻo vừa, cơm mềm, giá hợp lý, dùng hàng ngày.",
    description:
      "Gạo Thơm Lài là dòng gạo phổ thông được nhiều gia đình Việt ưa chuộng. Hạt gạo dài vừa, trắng đẹp, cơm chín dẻo mềm, hương thơm nhẹ. Giá hợp lý, phù hợp dùng hàng ngày.",
    image:
      "https://images.pexels.com/photos/713465/pexels-photo-713465.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    sold: 2150,
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    tags: ["phổ thông", "hàng ngày"],
    nutrition: [
      { label: "Tinh bột", value: "80%" },
      { label: "Protein", value: "6.5%" },
      { label: "Độ dẻo", value: "Vừa" },
      { label: "Hương thơm", value: "Nhẹ" },
    ],
  },
  {
    id: "p03",
    slug: "gao-nep-cai-hoa-vang",
    name: "Nếp Cái Hoa Vàng",
    categorySlug: "gao-nep-lut",
    price: 28000,
    unit: "kg",
    origin: "Hải Dương",
    shortDescription:
      "Nếp cái hoa vàng, hạt tròn đều, dẻo thơm, làm bánh chưng, xôi nếp.",
    description:
      "Nếp Cái Hoa Vàng là giống nếp truyền thống nổi tiếng, hạt tròn đều, màu vàng nhạt, dẻo thơm. Là lựa chọn hàng đầu để làm bánh chưng, xôi nếp, bánh cốm và các món nếp truyền thống.",
    image:
      "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    sold: 860,
    inStock: true,
    isFeatured: true,
    tags: ["nếp", "bánh chưng", "xôi"],
    nutrition: [
      { label: "Tinh bột", value: "82%" },
      { label: "Protein", value: "7%" },
      { label: "Độ dẻo", value: "Rất cao" },
      { label: "Hương thơm", value: "Đậm" },
    ],
  },
  {
    id: "p04",
    slug: "gao-lut-do",
    name: "Gạo Lứt Đỏ",
    categorySlug: "gao-nep-lut",
    price: 30000,
    unit: "kg",
    origin: "An Giang",
    shortDescription:
      "Gạo lứt đỏ giàu dinh dưỡng, tốt cho tim mạch và người ăn kiêng.",
    description:
      "Gạo Lứt Đỏ giữ nguyên lớp cám ngoài giàu chất xơ, vitamin và khoáng chất. Tốt cho tim mạch, hỗ trợ tiêu hóa, phù hợp cho người ăn kiêng, người tiểu đường và người muốn giảm cân.",
    image:
      "https://images.pexels.com/photos/713465/pexels-photo-713465.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.6,
    sold: 540,
    inStock: true,
    tags: ["lứt", "dinh dưỡng", "eat clean"],
    nutrition: [
      { label: "Chất xơ", value: "Cao" },
      { label: "Vitamin B", value: "Đầy đủ" },
      { label: "Sắt", value: "Cao" },
      { label: "Độ dẻo", value: "Thấp" },
    ],
  },
  {
    id: "p05",
    slug: "gao-tam-thom",
    name: "Gạo Tám Thơm",
    categorySlug: "gao-binh-dan",
    price: 18000,
    oldPrice: 21000,
    unit: "kg",
    origin: "Bắc Bộ",
    shortDescription:
      "Gạo tám thơm hạt tròn, cơm dẻo, hương thơm nhẹ, giá bình dân.",
    description:
      "Gạo Tám Thơm là dòng gạo quê truyền thống, hạt tròn đều, trắng ngà, cơm chín dẻo mềm, hương thơm nhẹ nhàng. Giá bình dân, phù hợp cho bữa cơm gia đình hàng ngày.",
    image:
      "https://images.pexels.com/photos/713465/pexels-photo-713465.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.5,
    sold: 3200,
    inStock: true,
    isBestSeller: true,
    tags: ["bình dân", "gạo quê", "hàng ngày"],
    nutrition: [
      { label: "Tinh bột", value: "79%" },
      { label: "Protein", value: "6.8%" },
      { label: "Độ dẻo", value: "Vừa" },
      { label: "Hương thơm", value: "Nhẹ" },
    ],
  },
  {
    id: "p06",
    slug: "gao-jasmine",
    name: "Gạo Jasmine Hạt Dài",
    categorySlug: "gao-dac-san",
    price: 35000,
    unit: "kg",
    origin: "Đồng bằng sông Cửu Long",
    shortDescription:
      "Gạo Jasmine hạt dài, thơm dẻo, xuất khẩu chuẩn, cơm mềm xốp.",
    description:
      "Gạo Jasmine là dòng gạo thơm hạt dài nổi tiếng, được xuất khẩu đi nhiều nước. Hạt gạo dài, trắng trong, cơm chín mềm xốp, hương thơm dịu nhẹ. Phù hợp cho nhà hàng và gia đình.",
    image:
      "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    sold: 980,
    inStock: true,
    isFeatured: true,
    tags: ["đặc sản", "xuất khẩu", "hạt dài"],
    nutrition: [
      { label: "Tinh bột", value: "78%" },
      { label: "Protein", value: "7%" },
      { label: "Độ dẻo", value: "Cao" },
      { label: "Hương thơm", value: "Đậm" },
    ],
  },
  {
    id: "p07",
    slug: "nuoc-mam-nhi-nam-o",
    name: "Nước Mắm Nhĩ NAM Ô 500ml",
    categorySlug: "nuoc-mam-nam-o",
    price: 65000,
    unit: "chai",
    origin: "Đà Nẵng",
    shortDescription:
      "Nước mắm nhĩ NAM Ô truyền thống Đà Nẵng, đạm cao, vị mặn đậm đà.",
    description:
      "Nước mắm nhĩ NAM Ô được ủ truyền thống tại làng chài NAM Ô, Đà Nẵng. Đạm cá tự nhiên cao, vị mặn đậm đà, hậu vị ngọt thanh. Phù hợp chấm, nêm nếm và tẩm ướp.",
    image:
      "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    sold: 720,
    inStock: true,
    isFeatured: true,
    isBestSeller: true,
    tags: ["nước mắm", "NAM Ô", "đặc sản Đà Nẵng"],
    nutrition: [
      { label: "Đạm cá", value: "40°N" },
      { label: "Độ mặn", value: "Cao" },
      { label: "Thành phần", value: "Cá cơm + muối" },
      { label: "Ủ", value: "12 tháng" },
    ],
  },
  {
    id: "p08",
    slug: "dau-lac-nguyen-chat",
    name: "Dầu Lạc Nguyên Chất 1L",
    categorySlug: "nuoc-mam-nam-o",
    price: 85000,
    unit: "chai",
    origin: "Việt Nam",
    shortDescription:
      "Dầu lạc nguyên chất, ép lạnh, giữ trọn hương vị và dinh dưỡng.",
    description:
      "Dầu lạc nguyên chất được ép lạnh từ hạt lạc chọn lọc, giữ trọn hương vị thơm bùi và dinh dưỡng. Phù hợp cho xào, chiên, trộn gỏi và các món ăn Việt.",
    image:
      "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    sold: 430,
    inStock: true,
    tags: ["dầu lạc", "nguyên chất", "ép lạnh"],
    nutrition: [
      { label: "Chất béo", value: "100%" },
      { label: "Vitamin E", value: "Cao" },
      { label: "Phương pháp", value: "Ép lạnh" },
      { label: "Dung tích", value: "1 lít" },
    ],
  },
  {
    id: "p09",
    slug: "gao-thom-nang-huong",
    name: "Gạo Thơm Nàng Hương",
    categorySlug: "gao-pho-thong",
    price: 25000,
    unit: "kg",
    origin: "Đồng bằng sông Cửu Long",
    shortDescription:
      "Gạo Nàng Hương hạt dài, thơm dẻo, cơm mềm, dùng hàng ngày.",
    description:
      "Gạo Thơm Nàng Hương là dòng gạo thơm phổ thông, hạt dài, trắng đẹp, cơm chín dẻo mềm, hương thơm dịu. Phù hợp cho bữa cơm gia đình hàng ngày.",
    image:
      "https://images.pexels.com/photos/713465/pexels-photo-713465.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.6,
    sold: 1560,
    inStock: true,
    tags: ["phổ thông", "thơm", "hàng ngày"],
    nutrition: [
      { label: "Tinh bột", value: "79%" },
      { label: "Protein", value: "6.7%" },
      { label: "Độ dẻo", value: "Vừa" },
      { label: "Hương thơm", value: "Vừa" },
    ],
  },
  {
    id: "p10",
    slug: "gao-lut-trang",
    name: "Gạo Lứt Trắng",
    categorySlug: "gao-nep-lut",
    price: 28000,
    unit: "kg",
    origin: "An Giang",
    shortDescription:
      "Gạo lứt trắng, giữ cám, giàu dinh dưỡng, tốt cho sức khỏe.",
    description:
      "Gạo Lứt Trắng giữ nguyên lớp cám ngoài giàu chất xơ và vitamin B. Tốt cho tiêu hóa, tim mạch, phù hợp cho người ăn kiêng và người muốn sống khỏe.",
    image:
      "https://images.pexels.com/photos/713465/pexels-photo-713465.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.5,
    sold: 380,
    inStock: true,
    tags: ["lứt", "dinh dưỡng", "eat clean"],
    nutrition: [
      { label: "Chất xơ", value: "Cao" },
      { label: "Vitamin B", value: "Đầy đủ" },
      { label: "Sắt", value: "Cao" },
      { label: "Độ dẻo", value: "Thấp" },
    ],
  },
  {
    id: "p11",
    slug: "gao-tai-nguyen",
    name: "Gạo Tài Nguyên",
    categorySlug: "gao-binh-dan",
    price: 16000,
    unit: "kg",
    origin: "Đồng bằng sông Cửu Long",
    shortDescription:
      "Gạo Tài Nguyên hạt dài, cơm mềm, giá rẻ, dùng hàng ngày.",
    description:
      "Gạo Tài Nguyên là dòng gạo bình dân, hạt dài, cơm chín mềm, giá hợp lý. Phù hợp cho hộ gia đình, quán ăn và bếp công nghiệp.",
    image:
      "https://images.pexels.com/photos/713465/pexels-photo-713465.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.3,
    sold: 2800,
    inStock: true,
    tags: ["bình dân", "giá rẻ", "hàng ngày"],
    nutrition: [
      { label: "Tinh bột", value: "80%" },
      { label: "Protein", value: "6.5%" },
      { label: "Độ dẻo", value: "Thấp" },
      { label: "Hương thơm", value: "Nhẹ" },
    ],
  },
  {
    id: "p12",
    slug: "muoi-hat-toi",
    name: "Muối Hạt Tỏi",
    categorySlug: "san-pham-khac",
    price: 15000,
    unit: "hũ",
    origin: "Việt Nam",
    shortDescription: "Muối hạt tỏi, gia vị chấm, nêm nếm đậm đà.",
    description:
      "Muối hạt tỏi là gia vị chấm và nêm nếm đậm đà, kết hợp muối biển và tỏi tươi. Phù hợp chấm thịt, cá, hải sản và nêm nếm các món mặn.",
    image:
      "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.4,
    sold: 290,
    inStock: true,
    tags: ["gia vị", "muối tỏi"],
    nutrition: [
      { label: "Thành phần", value: "Muối + tỏi" },
      { label: "Độ mặn", value: "Cao" },
      { label: "Dung tích", value: "200g" },
      { label: "Bảo quản", value: "Nơi khô ráo" },
    ],
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: "n01",
    slug: "cach-chen-gao-st25-ngon",
    title: "Cách chê gạo ST25 ngon và dẻo nhất",
    excerpt:
      "Tỷ lệ nước, thời gian ngâm và cách nấu quyết định độ dẻo thơm của gạo ST25. Bài viết hướng dẫn chi tiết.",
    content:
      "Gạo ST25 là giống lúa thơm nổi tiếng, nhưng để có nồi cơm ngon nhất cần chú ý tỷ lệ nước, thời gian ngâm và cách nấu. Trước tiên, vo gạo nhẹ nhàng 2-3 lần nước để giữ dưỡng chất. Ngâm gạo 30 phút trước khi nấu giúp hạt gạo nở đều. Tỷ lệ nước khuyến nghị là 1:1.2 (1 chén gạo : 1.2 chén nước). Nấu bằng nồi cơm điện, sau khi nấu xong để yên 10 phút rồi xới nhẹ.",
    image:
      "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Mẹo vặt",
    author: "Gạo Trần Huy",
    date: "2025-06-15",
    readTime: 4,
  },
  {
    id: "n02",
    slug: "gao-lut-co-tot-khong",
    title: "Gạo lứt có tốt không? Ai nên ăn gạo lứt?",
    excerpt:
      "Gạo lứt giàu chất xơ, vitamin B và khoáng chất. Tốt cho người tiểu đường, ăn kiêng và tim mạch.",
    content:
      "Gạo lứt là gạo chỉ xay bỏ vỏ trấu, giữ nguyên lớp cám giàu dinh dưỡng. Gạo lứt chứa nhiều chất xơ, vitamin B, sắt và magie. Tốt cho người tiểu đường vì chỉ số đường huyết thấp, tốt cho tim mạch và hỗ trợ giảm cân. Tuy nhiên người tiêu hóa yếu nên ăn vừa phải và nấu mềm.",
    image:
      "https://images.pexels.com/photos/713465/pexels-photo-713465.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Sức khỏe",
    author: "Gạo Trần Huy",
    date: "2025-06-10",
    readTime: 5,
  },
  {
    id: "n03",
    slug: "nuoc-mam-nam-o-truyen-thong",
    title: "Nước mắm NAM Ô truyền thống – Tinh hoa ẩm thực Đà Nẵng",
    excerpt:
      "Làng chài NAM Ô với hàng trăm năm làm nước mắm nhĩ, đạm cao, vị đậm đà, là tinh hoa ẩm thực Đà Nẵng.",
    content:
      "Nước mắm NAM Ô được ủ truyền thống tại làng chài NAM Ô, Đà Nẵng với hàng trăm năm lịch sử. Cá cơm than đánh bắt tươi được ủ với muối theo tỷ lệ vàng, ủ từ 10-12 tháng cho ra nước mắm nhĩ đạm cao, vị mặn đậm đà, hậu vị ngọt thanh. Đây là tinh hoa ẩm thực Đà Nẵng được nhiều đầu bếp và thực khách ưa chuộng.",
    image:
      "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Văn hóa ẩm thực",
    author: "Gạo Trần Huy",
    date: "2025-06-05",
    readTime: 6,
  },
];
