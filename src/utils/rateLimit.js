/**
 * Client-side rate limiter using a sliding window.
 */
class RateLimiter {
  constructor(maxCalls, windowMs) {
    this.maxCalls = maxCalls;
    this.windowMs = windowMs;
    this.timestamps = [];
  }

  /** Remove expired timestamps */
  _cleanup() {
    const now = Date.now();
    this.timestamps = this.timestamps.filter((t) => now - t < this.windowMs);
  }

  /** Check if a call is allowed */
  canCall() {
    this._cleanup();
    if (this.timestamps.length < this.maxCalls) {
      return { allowed: true, retryAfterMs: 0 };
    }
    const oldest = this.timestamps[0];
    const retryAfterMs = this.windowMs - (Date.now() - oldest);
    return { allowed: false, retryAfterMs: Math.max(0, retryAfterMs) };
  }

  /** Record a call */
  record() {
    this._cleanup();
    this.timestamps.push(Date.now());
  }

  /** Get remaining calls in current window */
  remaining() {
    this._cleanup();
    return Math.max(0, this.maxCalls - this.timestamps.length);
  }
}

/** AI chat — 10 calls per 60 seconds */
export const aiLimiter = new RateLimiter(10, 60_000);

/** Code execution — 15 calls per 60 seconds */
export const executionLimiter = new RateLimiter(15, 60_000);
