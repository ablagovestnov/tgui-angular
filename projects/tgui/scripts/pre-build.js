#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Pre-build скрипт для проверки и генерации документации
 * Автоматически запускается перед сборкой библиотеки
 */

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(PROJECT_ROOT, 'docs');

const requiredFiles = [
  'documentation.json',
  'API_REFERENCE.md',
  'API_SCHEMA.json'
];

console.log('🔍 Checking documentation files...');

let needsGeneration = false;

// Проверяем существование файлов документации
requiredFiles.forEach(file => {
  const filePath = path.join(DOCS_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Missing: ${file}`);
    needsGeneration = true;
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

if (needsGeneration) {
  console.log('\n📖 Generating missing documentation files...');
  try {
    execSync('node projects/tgui/scripts/generate-docs.js', { 
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '../../..')
    });
    console.log('✅ Documentation generation completed');
  } catch (error) {
    console.error('❌ Failed to generate documentation:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ All documentation files are present');
} 