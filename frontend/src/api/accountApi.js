import client from './client';

const unwrap = (response) => response?.data?.data || {};

export const exportAccountDataJson = async () => {
  const response = await client.get('/account/export', { timeout: 60000 });
  return unwrap(response);
};

export const deleteAccountProfileData = async () => {
  const response = await client.delete('/account/profile-data', {
    data: { confirm: true },
  });
  return unwrap(response);
};

export const deleteAccountAssessment = async (resultId) => {
  const response = await client.delete(`/account/assessment/${encodeURIComponent(resultId)}`, {
    data: { confirm: true },
  });
  return unwrap(response);
};

export const deleteAccountEntirely = async () => {
  const response = await client.delete('/account', {
    data: { confirm: true },
  });
  return unwrap(response);
};
