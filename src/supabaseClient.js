import { createClient } from '@supabase/supabase-js';

// 使用 .env.local 中的環境變數
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// 創建 Supabase 客戶端
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
