# Nexis CRO — Quy Trình Tự Động Hóa PAVA (Perceive · Analyze · Validate · Act)

Quy trình tự động hóa chu kỳ cải thiện **SEO/AEO Ranking & Conversion (CRO)** cho ứng dụng và website Nexis CRO (`https://nexiscro.com`), tích hợp sức mạnh của **OpenSEO MCP (Google Search Console + GA4)**, **Princeton GEO Framework (ACM KDD 2024)** và **Hệ thống Kiểm soát An toàn Kỹ thuật**.

---

## 1. Kiến Trúc Vòng Lặp PAVA (The PAVA Engine Architecture)

```mermaid
graph TD
    subgraph 1. PERCEIVE (Nhận thức & Thu thập)
        P1[OpenSEO GSC API: 60+ Queries, Positions, Impressions, CTR]
        P2[OpenSEO GA4 API: AI Assistant, Organic, Referral Sessions]
        P3[Local AST Crawler: Markdown, Schema, Citations, Links, Tables]
        P4[Community Signal: last30days Reddit/X/Web GEO trends]
    end

    subgraph 2. ANALYZE (Phân tích & Phát hiện khoảng trống)
        A1[Striking Distance Hunter: Queries vị trí 8.0 - 40.0 có Impressions cao]
        A2[Princeton GEO Gap: Thiếu bảng số liệu thống kê & trích dẫn nguồn]
        A3[PageRank Funnel Gap: Bài Top không truyền juice về Trang Chủ]
        A4[Conversion Leaks: Link đối tác cũ & thiếu thẻ Mid-card/UTM]
    end

    subgraph 3. VALIDATE (Bộ lọc phản biện & Đạo đức)
        V1{Gate 1: Anti-Black Hat Filter}
        V2{Gate 2: Evidence-Backed Check}
        V3{Gate 3: Pre-Execution Regression Dry-Run}
    end

    subgraph 4. ACT (Thực thi & Tự động đóng vòng lặp)
        AC1[Cập nhật On-Page: Trả lời trực diện + Bảng dữ liệu]
        AC2[Đấu nối Internal Link Hub-and-Spoke về Trang Chủ /]
        AC3[Chèn Mid-Article Value Card + Tracking UTM]
        AC4[Chạy npm run build xác thực 100% không lỗi]
        AC5[Lưu trữ Log JSON vào docs/seo-pava-reports/]
    end

    P1 & P2 & P3 & P4 --> A1 & A2 & A3 & A4
    A1 & A2 & A3 & A4 --> V1 --> V2 --> V3
    V3 -- "Đạt chuẩn an toàn" --> AC1 & AC2 & AC3 & AC4 & AC5
    V3 -- "Vi phạm hoặc nghi ngờ" --> BLOCK[Chặn thực thi & Báo cáo kỹ thuật]
```

---

## 2. Chi Tiết 4 Giai Đoạn

### Giai Đoạn 1: PERCEIVE (Đa Giác Quan & Thu Thập Dữ Liệu)
*   **GSC Performance:** Lấy dữ liệu 28 ngày gần nhất qua OpenSEO MCP (`get_search_console_performance`), lọc toàn bộ danh sách truy vấn thực tế, lượt hiển thị và vị trí trung bình.
*   **GA4 AI Acquisition:** Lấy dữ liệu qua `get_google_analytics_organic_overview` để bóc tách lượng truy vấn từ AI Assistant (`chatgpt.com`, `perplexity.ai`...) so với Organic Search.
*   **Local Content Scanner:** Quét toàn bộ 15 bài viết trong `src/content/blog/`, kiểm tra:
    *   Sự tồn tại của link đối tác cũ `apps.shopify.com/partners/nexis-cro`.
    *   Đường dẫn app chính thức `https://apps.shopify.com/nexis-cro-ai-seo-aeo-audit`.
    *   Sự hiện diện của thẻ chuyển đổi giữa bài `.blog-mid-card`.
    *   Sự hiện diện của bảng dữ liệu (Table structure) theo tiêu chuẩn Princeton GEO.
    *   Liên kết ngữ cảnh trỏ về Trang Chủ (`/`).

### Giai Đoạn 2: ANALYZE (Phân Tích Cơ Hội & Khoảng Trống)
*   **Striking Distance Mining:** Gom nhóm các từ khóa nằm trong khoảng vị trí **8.0 đến 40.0** có trên 10 impressions. Đây là những từ khóa chỉ cần một xung lực on-page nhỏ là có thể nhảy vào Top 3–5 Google.
*   **Princeton GEO Gap Analysis:** Đối chiếu cấu trúc bài viết với nghiên cứu của Đại học Princeton:
    *   *Thêm bảng số liệu (+41% citations)*
    *   *Thêm trích dẫn nguồn uy tín (+30-40% citations)*
    *   *Loại bỏ nhồi nhét từ khóa (-10% citations)*
*   **PageRank Funnel Gap:** Phát hiện các bài blog có thẩm quyền nhưng không phân phối sức mạnh ngược về trang chủ (`/`), làm trang chủ bị kẹt ở vị trí 11.2.
*   **CRO Leak Detection:** Phát hiện người đọc rời bài viết trước khi xem CTA cuối trang do thiếu điểm chạm chuyển đổi ở độ sâu 40–50% cuộn trang.

### Giai Đoạn 3: VALIDATE (Bộ Lọc Phản Biện & Đạo Đức Kỹ Thuật)
*   **Gate 1 (Anti-Black Hat):** Kiểm tra mã nguồn chống Prompt Injection (`[System directive...]`), chống chữ ẩn (`opacity: 0`, `font-size: 0`), chống Scaled AI Slop. Nếu phát hiện $\rightarrow$ **BLOCK NGAY LẬP TỨC**.
*   **Gate 2 (Evidence Rationale):** Mọi điều chỉnh nội dung phải giải quyết trực tiếp một truy vấn thực tế có trong Search Console, không sửa đổi cảm tính.
*   **Gate 3 (Technical Regression):** Đảm bảo giữ nguyên 100% slug, ngày tháng, và metadata frontmatter để tránh 404 hoặc mất index.

### Giai Đoạn 4: ACT (Thực Thi Hành Động & Xác Thực)
*   Tự động sửa các link rò rỉ và áp dụng thông số UTM tracking.
*   Tự động bổ sung các đoạn giải đáp trực diện và bảng số liệu.
*   Chạy `npm run build` để kiểm tra tĩnh toàn bộ website.
*   Tạo báo cáo kiểm toán JSON lưu tại `docs/seo-pava-reports/` làm lịch sử đối chiếu hàng tuần.

---

## 3. Hướng Dẫn Sử Dụng (Commands)

### 1. Chế độ kiểm toán không sửa file (Audit Only - Khuyến nghị chạy định kỳ):
```bash
npm run seo:pava
# hoặc: python3 scripts/seo-pava-loop.py --mode=audit
```
*Lệnh này sẽ quét dữ liệu GSC/GA4, đối chiếu mã nguồn và xuất file báo cáo phân tích tại `docs/seo-pava-reports/` mà không chạm vào code.*

### 2. Chế độ thực thi tự động (Act & Patch):
```bash
npm run seo:pava:act
# hoặc: python3 scripts/seo-pava-loop.py --mode=act
```
*Lệnh này sẽ tự động sửa các link lỗi thời, bổ sung tracking và chạy kiểm tra tính toàn vẹn của mã nguồn.*

---

## 4. Lịch Vận Hành Định Kỳ Đề Xuất (Weekly Cadence)

- **Thứ Hai:** Chạy `npm run seo:pava` để thu thập dữ liệu GSC sau 7 ngày. Xem xét các từ khóa bứt phá mới trong `docs/seo-pava-reports/`.
- **Thứ Ba:** Duyệt các đề xuất nội dung và bổ sung bảng số liệu/case study mới vào các bài viết striking-distance.
- **Thứ Sáu:** Chạy `npm run build` xác nhận trước khi deploy lên Cloudflare Pages.
