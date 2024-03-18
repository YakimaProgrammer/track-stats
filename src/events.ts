// Event IDs used by Athletic.net

export const EVENTS = {
  1: '100 Meters',
  2: '200 Meters',
  3: '400 Meters',
  4: '800 Meters',
  7: '4x100 Relay',
  8: '4x400 Relay',
  9: 'High Jump',
  10: '110m Hurdles',
  11: '300m Hurdles',
  12: 'Shot Put',
  13: 'Discus',
  14: 'Javelin',
  16: 'Pole Vault',
  17: 'Long Jump',
  18: 'Triple Jump',
  19: '100 Meters',
  20: '200 Meters',
  21: '400 Meters',
  22: '800 Meters',
  25: '4x100 Relay',
  26: '4x400 Relay',
  27: 'High Jump',
  28: '100m Hurdles',
  29: '300m Hurdles',
  30: 'Shot Put',
  31: 'Discus',
  32: 'Javelin',
  34: 'Pole Vault',
  35: 'Long Jump',
  36: 'Triple Jump',
  38: '100m Hurdles',
  39: '4x800 Relay',
  40: 'DMR 4000m',
  50: '4x200 Relay',
  51: '4x200 Relay',
  52: '1600 Meters',
  53: '1600 Meters',
  54: '600 Meters',
  55: '600 Meters',
  60: '3200 Meters',
  61: '3200 Meters',
  64: 'DMR 4000m',
  66: 'SMR 800m',
  67: '4x800 Relay',
  73: '2k Steeplechase',
  105: '300 Meters',
  106: '300 Meters',
  111: '2k Steeplechase',
  158: '2000 Meters',
  159: '2000 Meters'
} as const;

export type EventID = keyof typeof EVENTS;

export function isValidEventID(id: number): id is EventID {
  if (id in EVENTS) {
    return true;
  } else {
    return false;
  }
}