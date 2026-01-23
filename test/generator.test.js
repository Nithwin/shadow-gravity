import { describe, it, expect } from 'vitest';
import { generateMission } from '../lib/shadow.js';

describe('Shadow Gravity Generator', () => {
  it('should generate correct mission for Node/Express stack', () => {
    const mission = generateMission('node_express');
    expect(mission).toContain('BACKEND API (Express + TS)');
    expect(mission).toContain('Use `zod` for validation');
  });

  it('should generate correct mission for Flutter stack', () => {
    const mission = generateMission('flutter');
    expect(mission).toContain('FLUTTER (DART)');
    expect(mission).toContain('NO HTML/CSS/JS');
  });

  it('should generate correct mission for Python FastAPI stack', () => {
    const mission = generateMission('python_fastapi');
    expect(mission).toContain('PYTHON FASTAPI');
    expect(mission).toContain('PEP 8');
  });
});
