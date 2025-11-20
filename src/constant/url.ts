const AUTH_BASE = "/auth";

export const AUTH_URL = {
  BASE: AUTH_BASE,
  LOGIN: `${AUTH_BASE}/login`,
};

const ADMIN_BASE = "/admin";

export const ADMIN_URL = {
  BASE: ADMIN_BASE,
  DASHBOARD: `${ADMIN_BASE}/dashboard`,
};

const USER_BASE = "/user";

export const USER_URL = {
  BASE: USER_BASE,
  DASHBOARD: `${USER_BASE}/dashboard`,
  PROFILE: `${USER_BASE}/profile`,
  KYC: `${USER_BASE}/kyc`,
};
