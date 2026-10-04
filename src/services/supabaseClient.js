import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rewxqwdwqtxiqgjttnrv.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_oU5A18--bJ7QlnO5t2-LWw__Ppm9ZXh';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Supabase Auth Helper Functions
 */

// Sign Up new user with email & password
export async function signUpWithEmail(email, password, fullName = '') {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });
    if (error) throw error;
    return { success: true, user: data.user, session: data.session };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Log In existing user with email & password
export async function signInWithEmail(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return { success: true, user: data.user, session: data.session };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Log Out current user
export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    localStorage.removeItem('blindspot_active_demo_user');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Get current session user
export async function getCurrentUser() {
  try {
    // Check local demo user first if active
    const demoUser = localStorage.getItem('blindspot_active_demo_user');
    if (demoUser) {
      return JSON.parse(demoUser);
    }

    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
  } catch (err) {
    return null;
  }
}

// Quick Demo Login for testing without email confirmation delays
export function loginAsDemoUser(name = 'Demo User', email = 'user@example.com') {
  const userObj = {
    id: 'demo-user-id-' + Date.now(),
    email: email,
    user_metadata: { full_name: name },
    isDemo: true
  };
  localStorage.setItem('blindspot_active_demo_user', JSON.stringify(userObj));
  return userObj;
}

/**
 * Database & Connection Helpers
 */
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('evaluations').select('id').limit(1);
    return { connected: true, url: supabaseUrl };
  } catch (err) {
    return { connected: false, url: supabaseUrl, error: err.message };
  }
}

export async function saveEvaluationToSupabase(evaluation, user = null) {
  try {
    const payload = {
      user_id: user?.id || 'anonymous',
      user_email: user?.email || 'anonymous',
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
      saveToLocalCloudCache(payload);
      return { success: true, mode: 'local_cloud', payload };
    }

    return { success: true, mode: 'supabase', data };
  } catch (err) {
    saveToLocalCloudCache(evaluation);
    return { success: true, mode: 'local_fallback', error: err.message };
  }
}

export async function getSavedEvaluations(user = null) {
  try {
    let query = supabase.from('evaluations').select('*').order('created_at', { ascending: false });
    
    if (user?.id && !user?.isDemo) {
      query = query.eq('user_id', user.id);
    }

    const { data, error } = await query;
    if (error || !data) {
      return getLocalCloudCache();
    }

    return data;
  } catch (err) {
    return getLocalCloudCache();
  }
}

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
