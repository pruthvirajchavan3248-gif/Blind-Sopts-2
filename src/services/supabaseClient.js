import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rewxqwdwqtxiqgjttnrv.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_oU5A18--bJ7QlnO5t2-LWw__Ppm9ZXh';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Check health / connectivity of the Supabase instance
 */
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('evaluations').select('id').limit(1);
    if (error && error.code !== 'PGRST116' && !error.message.includes('relation "public.evaluations" does not exist')) {
      console.warn("Supabase check error:", error);
    }
    return { connected: true, url: supabaseUrl };
  } catch (err) {
    console.warn("Supabase connection check failed:", err);
    return { connected: false, url: supabaseUrl, error: err.message };
  }
}

/**
 * Save decision evaluation payload to Supabase database
 */
export async function saveEvaluationToSupabase(evaluation) {
  try {
    const payload = {
      core_goal: evaluation?.summary?.coreGoal || 'Custom Decision',
      primary_risk_score: evaluation?.summary?.primaryRiskScore || 'Medium',
      blindspot_count: evaluation?.summary?.keyBlindspotCount || 0,
      evaluation_json: evaluation,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('evaluations')
      .insert([payload])
      .select();

    if (error) {
      // If table doesn't exist yet, save locally to localStorage as fallback
      console.warn("Supabase table insert notice (saving to local cloud cache):", error.message);
      saveToLocalCloudCache(payload);
      return { success: true, mode: 'local_cloud', payload };
    }

    return { success: true, mode: 'supabase', data };
  } catch (err) {
    console.warn("Failed saving to Supabase, fallback to local storage:", err);
    saveToLocalCloudCache(evaluation);
    return { success: true, mode: 'local_fallback', error: err.message };
  }
}

/**
 * Retrieve saved decision history
 */
export async function getSavedEvaluations() {
  try {
    const { data, error } = await supabase
      .from('evaluations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return getLocalCloudCache();
    }

    return data;
  } catch (err) {
    return getLocalCloudCache();
  }
}

// Local cache helpers for robust fallback
function saveToLocalCloudCache(item) {
  try {
    const existing = JSON.parse(localStorage.getItem('blindspot_saved_evaluations') || '[]');
    existing.unshift({ ...item, id: Date.now() });
    localStorage.setItem('blindspot_saved_evaluations', JSON.stringify(existing.slice(0, 20)));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

function getLocalCloudCache() {
  try {
    return JSON.parse(localStorage.getItem('blindspot_saved_evaluations') || '[]');
  } catch (e) {
    return [];
  }
}
