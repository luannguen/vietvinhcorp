import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rfzuevsyegqbdlttmloa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmenVldnN5ZWdxYmRsdHRtbG9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMzQwNDAsImV4cCI6MjA5MDYxMDA0MH0.3nv_Wirt8oaifiJdSkbG4ZaXMCTyN0ZefOti5dkz6ec'
);

// Step 1: Login as admin
const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
  email: 'admin@vvc.com.vn',
  password: 'Admin@123456'
});

if (authError) {
  console.error('Auth failed:', authError.message);
  process.exit(1);
}
console.log('✅ Logged in as admin');

// Step 2: Structured branches data
const branches = [
  {
    id: 'hq-hcm',
    title: 'Trụ sở chính (HCM)',
    address: 'Tầng 14, Tòa nhà HM Town, 412 Nguyễn Thị Minh Khai, Phường Bàn Cờ, Quận 3, TP.HCM',
    phone: '+84 775 842 789',
    email: 'contact@vietvinhcorp.com',
    map_url: ''
  },
  {
    id: 'branch-thuduc',
    title: 'Văn phòng Thủ Đức',
    address: '59 Bis, Đường số 2, Phường Trường Thọ, TP. Thủ Đức, TP.HCM',
    phone: '+84 384 898 284',
    email: 'thuduc@vietvinhcorp.com',
    map_url: ''
  },
  {
    id: 'branch-hanoi',
    title: 'Văn phòng Hà Nội',
    address: 'BT1 Đường Phạm Văn Đồng, Quận Bắc Từ Liêm, Hà Nội',
    phone: '+84 705 789 345',
    email: 'hanoi@vietvinhcorp.com',
    map_url: ''
  },
  {
    id: 'cskh',
    title: 'Trung tâm CSKH',
    address: 'Hỗ trợ toàn quốc 24/7',
    phone: '+84 981 789 248',
    email: 'support@vietvinhcorp.com',
    map_url: ''
  }
];

const jsonValue = JSON.stringify(branches);

// Step 3: Update setting
const { data, error } = await supabase
  .from('site_settings')
  .update({ value: jsonValue })
  .eq('key', 'contact_address');

if (error) {
  console.error('Update failed:', error.message);
  process.exit(1);
}

console.log('✅ Branch data updated successfully!');
console.log('📋 Branches:', branches.map(b => b.title).join(', '));
console.log('\nPlease reload the client page to see the changes.');
