import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bdsifrgbwfdnyuirafdy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkc2lmcmdid2Zkbnl1aXJhZmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MTcwOTAsImV4cCI6MjA3MDQ5MzA5MH0.9umBeOlkt-sG-2b45veUhreLzCknddFp05g2LEfrQIM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
