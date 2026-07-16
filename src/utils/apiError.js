export function extractApiError(err) {
  if (err?.response?.data) {
    return err.response.data.message || 'Request failed';
  }
  return err?.message || 'Request failed';
}

