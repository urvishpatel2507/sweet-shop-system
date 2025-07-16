import { describe, it, expect, beforeEach } from 'vitest';
import { SweetService } from '../services/sweetService';

describe('SweetService', () => {
  let service;

  beforeEach(() => {
    service = new SweetService();
  });

  it('should initialize with empty sweets array', () => {
    expect(service.getAllSweets()).toEqual([]);
  });
});
