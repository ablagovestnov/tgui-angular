import { Injectable, signal } from '@angular/core';

export interface RippleWave {
  x: number;
  y: number;
  date: number;
  pointerId: number;
}

@Injectable({
  providedIn: 'root'
})
export class RippleService {
  private RIPPLE_DELAY = 70;
  private WAVE_LIVE = 225;

  /**
   * Map to track pointer delay timers by pointerId
   */
  private pointerDelayTimers = new Map<number, ReturnType<typeof setTimeout>>();
  
  /**
   * Add a new ripple wave effect at the specified coordinates
   */
  addWave(x: number, y: number, pointerId: number, currentWaves: RippleWave[]): RippleWave[] {
    const dateNow = Date.now();
    // Filter out expired waves
    const filteredWaves = currentWaves.filter((wave) => wave.date + this.WAVE_LIVE > dateNow);

    // Add the new wave
    const newWaves = [
      ...filteredWaves,
      {
        x,
        y,
        date: dateNow,
        pointerId,
      }
    ];

    // Clean up the timer for this pointerId
    this.pointerDelayTimers.delete(pointerId);
    
    return newWaves;
  }

  /**
   * Handle pointer down event
   * @param event Pointer event
   * @param wavesSignal Signal для управления волнами
   */
  handlePointerDown(event: PointerEvent, wavesSignal: ReturnType<typeof signal<RippleWave[]>>): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Set a timeout to create the ripple effect after a short delay
    this.pointerDelayTimers.set(
      event.pointerId,
      setTimeout(() => {
        const newWaves = this.addWave(x, y, event.pointerId, wavesSignal());
        wavesSignal.set(newWaves);
        
        // Clear the waves after they've completed their animation
        setTimeout(() => {
          wavesSignal.set([]);
        }, this.WAVE_LIVE);
      }, this.RIPPLE_DELAY)
    );
  }

  /**
   * Handle pointer cancel/up event
   */
  handlePointerCancel(pointerId: number): void {
    const timer = this.pointerDelayTimers.get(pointerId);
    if (timer) {
      clearTimeout(timer);
      this.pointerDelayTimers.delete(pointerId);
    }
  }
} 