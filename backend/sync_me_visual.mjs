// 10_sync_me_to_visual_editor.mjs
import pg from 'pg';
import 'dotenv/config';

const { Client } = pg;
const connectionString = process.env.DATABASE_URL;

const pageContent = {
  sections: [
    {
      id: 'hero',
      type: 'hero',
      props: { 
        badge: 'Giải pháp Kỹ thuật Toàn diện',
        title: 'Hệ Thống Cơ Điện (M&E)', 
        description: 'VietVinhCorp cung cấp các giải pháp cơ điện hiện đại, từ khâu tư vấn thiết kế đến thi công và bảo trì, cam kết chất lượng vượt trội và hiệu quả vận hành tối ưu cho dự án của bạn.',
        alignment: 'left',
        backgroundImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
        buttonText: 'Nhận báo giá ngay',
        buttonLink: '/contact',
        button2Text: 'Xem dự án tiêu biểu',
        button2Link: '/projects'
      }
    },
    {
      id: 'systems-title',
      type: 'rich_text',
      props: {
        content: `
          <div style="text-align: center; margin-bottom: 3rem;">
            <h2 style="font-size: 2.25rem; font-weight: bold; color: #0c4a6e; margin-bottom: 1rem;">Các Giải Pháp Hệ Thống</h2>
            <div style="width: 5rem; height: 4px; background-color: #eab308; margin: 0 auto;"></div>
          </div>
        `
      }
    },
    {
      id: 'systems-grid',
      type: 'rich_text',
      props: {
        content: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
            <div style="padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); background: white; border-top: 4px solid #eab308;">
              <h3 style="color: #0c4a6e; font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">HỆ THỐNG ĐIỆN</h3>
              <p style="color: #4b5563; font-size: 0.875rem; margin-bottom: 1rem;">Trạm biến áp, tủ điện tổng MSB, chiếu sáng và nguồn dự phòng Generator/UPS.</p>
              <ul style="color: #6b7280; font-size: 0.875rem; list-style: none; padding: 0;">
                <li style="margin-bottom: 0.5rem;">✓ Trạm biến áp trung thế</li>
                <li style="margin-bottom: 0.5rem;">✓ Tủ điện phân phối DB</li>
                <li style="margin-bottom: 0.5rem;">✓ Hệ thống chống sét</li>
              </ul>
            </div>
            <div style="padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); background: white; border-top: 4px solid #3b82f6;">
              <h3 style="color: #0c4a6e; font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">HỆ THỐNG PHÒNG SẠCH</h3>
              <p style="color: #4b5563; font-size: 0.875rem; margin-bottom: 1rem;">Thi công đạt chuẩn GMP, ISO cho dược phẩm, thực phẩm và điện tử.</p>
              <ul style="color: #6b7280; font-size: 0.875rem; list-style: none; padding: 0;">
                <li style="margin-bottom: 0.5rem;">✓ Panel cách nhiệt chuyên dụng</li>
                <li style="margin-bottom: 0.5rem;">✓ Hệ thống lọc HEPA/ULPA</li>
                <li style="margin-bottom: 0.5rem;">✓ Sàn chống tĩnh điện</li>
              </ul>
            </div>
            <div style="padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); background: white; border-top: 4px solid #06b6d4;">
              <h3 style="color: #0c4a6e; font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">HỆ THỐNG HVAC</h3>
              <p style="color: #4b5563; font-size: 0.875rem; margin-bottom: 1rem;">Giải pháp Chiller/VRV tối ưu nhiệt độ và thông gió nhà xưởng.</p>
              <ul style="color: #6b7280; font-size: 0.875rem; list-style: none; padding: 0;">
                <li style="margin-bottom: 0.5rem;">✓ Điều hòa trung tâm Chiller</li>
                <li style="margin-bottom: 0.5rem;">✓ Hệ thống hút khí thải</li>
                <li style="margin-bottom: 0.5rem;">✓ Cung cấp khí tươi</li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 'why-choose-us',
      type: 'features',
      props: {
        title: 'Tại sao chọn dịch vụ M&E của chúng tôi?',
        subtitle: 'VietVinhCorp cam kết mang lại giá trị bền vững thông qua các giải pháp tích hợp thông minh.',
        items: [
          { id: '1', title: 'Đồng bộ & Tích hợp', description: 'Giải pháp được thiết kế đồng bộ giữa hệ thống cơ điện và kỹ thuật lạnh.', icon: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80' },
          { id: '2', title: 'Tiêu chuẩn Quốc tế', description: 'Tuân thủ nghiêm ngặt TCVN, IEC, ASHRAE và các quy chuẩn an toàn.', icon: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80' },
          { id: '3', title: 'Tiết kiệm Năng lượng', description: 'Ứng dụng công nghệ Inverter và BMS giúp giảm chi phí vận hành.', icon: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80' }
        ]
      }
    },
    {
      id: 'cta',
      type: 'hero',
      props: {
        title: 'Sẵn sàng triển khai cho dự án của bạn?',
        description: 'Liên hệ với đội ngũ chuyên gia của chúng tôi để được khảo sát và tư vấn giải pháp cơ điện tối ưu nhất.',
        alignment: 'center',
        buttonText: 'Yêu cầu khảo sát',
        buttonLink: '/contact',
        button2Text: 'Gọi ngay: 028 3833 3333',
        button2Link: 'tel:02838333333'
      }
    }
  ]
};

async function seed() {
  const client = new Client({ 
    connectionString,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    console.log('🔄 Đang đồng bộ trang he-thong-co-dien...');
    
    const query = `
      INSERT INTO public.static_pages (slug, title, content, is_active)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (slug) 
      DO UPDATE SET 
        content = EXCLUDED.content,
        title = EXCLUDED.title,
        updated_at = NOW();
    `;
    
    await client.query(query, ['he-thong-co-dien', 'Hệ Thống Cơ Điện (M&E)', JSON.stringify(pageContent), true]);
    console.log('✅ Đồng bộ thành công!');
  } catch (err) {
    console.error('❌ Thất bại:', err.message);
  } finally {
    await client.end();
  }
}

seed();
