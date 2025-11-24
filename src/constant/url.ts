const AUTH_BASE = "/auth";

export const AUTH_URL = {
  BASE: AUTH_BASE,
  LOGIN: `${AUTH_BASE}/login`,
};

const ADMIN_BASE = "/admin";

export const ADMIN_URL = {
  BASE: ADMIN_BASE,
  DASHBOARD: `${ADMIN_BASE}/dashboard`,
  PROFILE: `${ADMIN_BASE}/profile`,
  PROFILE_WITH_ID: (id: string) => `${ADMIN_BASE}/profile/${id}`,
  USERS: `${ADMIN_BASE}/users`,
};

const USER_BASE = "/user";

export const USER_URL = {
  BASE: USER_BASE,
  DASHBOARD: `${USER_BASE}/dashboard`,
  PROFILE: `${USER_BASE}/profile`,
  PROFILE_WITH_ID: (id: string) => `${USER_BASE}/profile/${id}`,
  KYC: `${USER_BASE}/kyc`,
};
