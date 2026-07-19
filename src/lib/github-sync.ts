export interface GitHubConfig {
  owner: string;
  repo: string;
  path: string;
  token: string;
}

export interface SyncStatus {
  lastSyncedAt: string;
  sha: string;
}

const CONFIG_KEY = "books-ledger:github-config";
const STATUS_KEY = "books-ledger:github-sync-status";

export function getGitHubConfig(): GitHubConfig | null {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GitHubConfig;
      if (parsed.owner && parsed.repo && parsed.path) return parsed;
    }
  } catch {
    // ignore
  }
  return null;
}

export function saveGitHubConfig(config: GitHubConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch {
    // storage unavailable
  }
}

export function clearGitHubConfig(): void {
  try {
    localStorage.removeItem(CONFIG_KEY);
    localStorage.removeItem(STATUS_KEY);
  } catch {
    // ignore
  }
}

export function getSyncStatus(): SyncStatus | null {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    if (raw) return JSON.parse(raw) as SyncStatus;
  } catch {
    // ignore
  }
  return null;
}

function saveSyncStatus(status: SyncStatus): void {
  try {
    localStorage.setItem(STATUS_KEY, JSON.stringify(status));
  } catch {
    // ignore
  }
}

/**
 * Push book data to GitHub as a JSON file.
 * Uses the GitHub Contents API.
 */
export async function pushToGitHub(
  data: unknown,
  config: GitHubConfig
): Promise<{ commitSha: string }> {
  const content = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  const encoded = btoa(unescape(encodeURIComponent(content)));

  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${config.token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };

  // Check if file already exists to get the SHA
  let sha: string | undefined;
  try {
    const getRes = await fetch(url, { headers });
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
    }
  } catch {
    // File doesn't exist yet, will create new
  }

  const body: Record<string, unknown> = {
    message: `Update books data - ${new Date().toISOString().slice(0, 10)}`,
    content: encoded,
  };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `GitHub API error: ${res.status}`);
  }

  const result = await res.json();
  const commitSha = result.content?.sha ?? "";

  saveSyncStatus({ lastSyncedAt: new Date().toISOString(), sha: commitSha });

  return { commitSha };
}

/**
 * Pull book data from a GitHub raw content URL.
 */
export async function pullFromGitHub(config: GitHubConfig): Promise<unknown> {
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${config.token}`,
    Accept: "application/vnd.github.v3+json",
  };

  const res = await fetch(url, { headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `GitHub API error: ${res.status}`);
  }

  const data = await res.json();
  const decoded = decodeURIComponent(escape(atob(data.content)));
  const parsed = JSON.parse(decoded);

  saveSyncStatus({ lastSyncedAt: new Date().toISOString(), sha: data.sha });

  return parsed;
}