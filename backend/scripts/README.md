# Backend Scripts Directory

Thư mục này chứa các script bảo trì, nạp dữ liệu và kiểm tra hệ thống. Các script này đã được tổ chức lại để đảm bảo tính ngăn nắp:

- **`seeding/`**: Chứa các script nạp dữ liệu ban đầu cho Database (Content, Banners, SEO, v.v.).
- **`migrations/`**: Chứa các script di cư dữ liệu, sửa lỗi schema hoặc cập nhật hàng loạt.
- **`checks/`**: Chứa các script kiểm tra (verify), test Supabase/Database.
- **`tools/`**: Chứa các công cụ hỗ trợ như khởi tạo Admin, Upload ảnh, Đồng bộ Visual Editor.

## Cách chạy
Để chạy các script này, bạn nên đứng ở thư mục gốc project hoặc `backend/`:
```bash
node backend/scripts/seeding/seed_about_new.mjs
```
*Lưu ý: Các script đã được cập nhật đường dẫn để tìm tệp `.env` tại `backend/.env`.*
