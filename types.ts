export enum TreeMode {
  CHAOS = 'CHAOS',
  FORMED = 'FORMED'
}

export type ShowState = 'idle' | 'waiting' | 'playing' | 'stopped';

export interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export interface ParticleData {
  chaosPos: [number, number, number];
  formedPos: [number, number, number];
  speed: number;
  color: string;
}
