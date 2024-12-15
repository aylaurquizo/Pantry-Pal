import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hzktoiokvmegloflfkyv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6a3RvaW9rdm1lZ2xvZmxma3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzODI4NTcsImV4cCI6MjA0Nzk1ODg1N30.s9W81XXaWlxVIru3eglisZBXx2uhHe1A76EfucGjbAI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
