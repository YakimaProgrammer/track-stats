// A variety of helper functions

import * as crypto from 'crypto';
import * as fs from 'fs/promises';

// Hash function to generate a unique filename based on URL and headers
function generateHash(url: string, headers: Record<string, string>): string {
  const hash = crypto.createHash('sha256');
  hash.update(url);
  hash.update(JSON.stringify(headers));
  return hash.digest('hex');
};

export async function fetchDataWithCache(url: string, headers: Record<string, string> = {}): Promise<any> {
  const filePath = `./cache/${generateHash(url, headers)}`;
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    return JSON.parse(data);
  } catch {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

    const data = await response.json();

    await fs.writeFile(filePath, JSON.stringify(data));
    return data;
  }
};

export function groupBy<T, K>(arr: T[], key: (i: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();

  for (let item of arr) {
    const k = key(item);
    const items = (map.get(k) ?? []);
    items.push(item);
    map.set(k, items);
  }

  return map;
}

export function mapFrom<T, K extends keyof T, V extends keyof T>(
  array: T[],
  key: K,
  value: V
): Map<T[K], T[V]> {
  const result = new Map<T[K], T[V]>();
  for (const item of array) {
    result.set(item[key], item[value]);
  }
  return result;
}


export function mapMap<K, V1, V2>(obj: Map<K, V1>, f: (value: V1) => V2): Map<K, V2> {
  const newmap: Map<K, V2> = new Map();

  for (let [key, value] of obj.entries()) {
    newmap.set(key, f(value));
  }

  return newmap;
}
