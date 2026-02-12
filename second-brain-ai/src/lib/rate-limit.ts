type RateRecord = {
  count: number;
  windowStart: number;
};

const requests = new Map<string, RateRecord>();

const LIMIT = 15; // 15 requests
const WINDOW = 60 * 1000; // per 1 minute

export function checkRateLimit(ip: string) {
  const now = Date.now();
  const record = requests.get(ip);

  if (!record) {
    requests.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (now - record.windowStart > WINDOW) {
    requests.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (record.count >= LIMIT) {
    return false;
  }

  record.count += 1;
  return true;
}
