#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Автоматизированное управление версиями для библиотеки TGUI Angular
 * 
 * Возможности:
 * 1. Семантическое версионирование (patch, minor, major)
 * 2. Автоматическое обновление package.json и CHANGELOG
 * 3. Git теги и коммиты
 * 4. Подготовка к публикации в npm
 * 5. Валидация перед релизом
 */

const PROJECT_ROOT = path.resolve(__dirname, '..');
const MAIN_PACKAGE_PATH = path.resolve(PROJECT_ROOT, '../../package.json');
const LIB_PACKAGE_PATH = path.join(PROJECT_ROOT, 'package.json');
const CHANGELOG_PATH = path.join(PROJECT_ROOT, 'CHANGELOG.md');

// Парсим аргументы командной строки
const args = process.argv.slice(2);
const command = args[0];
const versionType = args[1] || 'patch';
const dryRun = args.includes('--dry-run');
const skipValidation = args.includes('--skip-validation');

console.log('🔄 TGUI Angular Version Manager');
console.log(`📁 Project root: ${PROJECT_ROOT}`);

// Конфигурация
const config = {
  dryRun,
  skipValidation,
  createGitTag: true,
  updateChangelog: true,
  runTests: true,
  buildDocs: true
};

const versionTypes = ['patch', 'minor', 'major', 'prerelease'];

async function main() {
  try {
    switch (command) {
      case 'bump':
        await bumpVersion(versionType);
        break;
      case 'prepare':
        await prepareRelease();
        break;
      case 'publish':
        await publishRelease();
        break;
      case 'status':
        await showStatus();
        break;
      default:
        showHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (!config.dryRun) {
      process.exit(1);
    }
  }
}

/**
 * Повышает версию библиотеки
 */
async function bumpVersion(type) {
  if (!versionTypes.includes(type)) {
    throw new Error(`Invalid version type: ${type}. Must be one of: ${versionTypes.join(', ')}`);
  }

  console.log(`\n🚀 Bumping version (${type})...`);

  // Валидация перед изменением версии
  if (!config.skipValidation) {
    await validateBeforeRelease();
  }

  // Читаем текущую версию
  const currentVersion = getCurrentVersion();
  console.log(`📦 Current version: ${currentVersion}`);

  // Вычисляем новую версию
  const newVersion = getNextVersion(currentVersion, type);
  console.log(`🎯 New version: ${newVersion}`);

  if (config.dryRun) {
    console.log('🔍 DRY RUN - No changes will be made');
    return;
  }

  // Обновляем версии в package.json файлах
  await updatePackageVersions(newVersion);

  // Обновляем CHANGELOG
  if (config.updateChangelog) {
    await updateChangelog(newVersion);
  }

  // Генерируем документацию
  if (config.buildDocs) {
    await buildDocumentation();
  }

  // Создаем Git коммит и тег
  if (config.createGitTag) {
    await createGitRelease(newVersion);
  }

  console.log(`\n✅ Version bumped to ${newVersion}`);
  console.log('📋 Next steps:');
  console.log('   1. Review changes in git');
  console.log('   2. Run: npm run version-manager prepare');
  console.log('   3. Run: npm run version-manager publish');
}

/**
 * Подготавливает релиз для публикации
 */
async function prepareRelease() {
  console.log('\n🎁 Preparing release...');

  const version = getCurrentVersion();
  console.log(`📦 Preparing version: ${version}`);

  // Запускаем тесты
  if (config.runTests) {
    await runTests();
  }

  // Собираем библиотеку
  await buildLibrary();

  // Проверяем качество сборки
  await validateBuild();

  console.log('\n✅ Release prepared successfully');
  console.log('📋 Ready for publishing:');
  console.log(`   Version: ${version}`);
  console.log(`   Build: ${path.resolve(PROJECT_ROOT, '../../dist/tgui')}`);
}

/**
 * Публикует релиз в npm
 */
async function publishRelease() {
  console.log('\n📤 Publishing release...');

  const version = getCurrentVersion();
  const distPath = path.resolve(PROJECT_ROOT, '../../dist/tgui');

  if (!fs.existsSync(distPath)) {
    throw new Error('Build not found. Run "prepare" first.');
  }

  // Проверяем авторизацию npm
  await checkNpmAuth();

  if (config.dryRun) {
    console.log('🔍 DRY RUN - Would publish to npm');
    return;
  }

  // Публикуем в npm
  console.log('📦 Publishing to npm...');
  execSync('npm publish', { cwd: distPath, stdio: 'inherit' });

  // Пушим теги в git
  console.log('🏷️ Pushing git tags...');
  execSync('git push origin --tags', { stdio: 'inherit' });

  console.log(`\n🎉 Successfully published version ${version}!`);
  console.log('🔗 Links:');
  console.log(`   npm: https://www.npmjs.com/package/tgui-angular`);
  console.log(`   GitHub: https://github.com/ablagovestnov/tgui-angular/releases/tag/v${version}`);
}

/**
 * Показывает статус текущей версии
 */
async function showStatus() {
  console.log('\n📊 Status Report:');
  
  const version = getCurrentVersion();
  const gitStatus = getGitStatus();
  const distExists = fs.existsSync(path.resolve(PROJECT_ROOT, '../../dist/tgui'));
  
  console.log(`📦 Current version: ${version}`);
  console.log(`🌿 Git branch: ${gitStatus.branch}`);
  console.log(`📝 Git status: ${gitStatus.clean ? 'Clean' : 'Has changes'}`);
  console.log(`🏗️ Build exists: ${distExists ? 'Yes' : 'No'}`);
  
  if (!gitStatus.clean) {
    console.log('\n⚠️ Uncommitted changes:');
    gitStatus.changes.forEach(change => console.log(`   ${change}`));
  }

  // Проверяем npm версию
  try {
    const npmVersion = execSync('npm view tgui-angular version', { encoding: 'utf8' }).trim();
    console.log(`🌐 Published version: ${npmVersion}`);
    
    if (version !== npmVersion) {
      console.log(`💡 Local version (${version}) differs from published (${npmVersion})`);
    }
  } catch {
    console.log('🌐 Published version: Not published yet');
  }
}

/**
 * Валидирует проект перед релизом
 */
async function validateBeforeRelease() {
  console.log('🔍 Validating project...');

  const gitStatus = getGitStatus();
  
  if (!gitStatus.clean) {
    throw new Error('Repository has uncommitted changes. Commit or stash them first.');
  }

  if (gitStatus.branch !== 'main' && gitStatus.branch !== 'master') {
    console.warn(`⚠️ Warning: Not on main branch (current: ${gitStatus.branch})`);
  }

  // Проверяем что package.json файлы синхронизированы
  const mainPkg = JSON.parse(fs.readFileSync(MAIN_PACKAGE_PATH, 'utf8'));
  const libPkg = JSON.parse(fs.readFileSync(LIB_PACKAGE_PATH, 'utf8'));
  
  if (mainPkg.version !== libPkg.version) {
    throw new Error('Package versions are out of sync');
  }

  console.log('✅ Validation passed');
}

/**
 * Получает текущую версию из package.json
 */
function getCurrentVersion() {
  const packageData = JSON.parse(fs.readFileSync(LIB_PACKAGE_PATH, 'utf8'));
  return packageData.version;
}

/**
 * Вычисляет следующую версию
 */
function getNextVersion(currentVersion, type) {
  const parts = currentVersion.split('.').map(Number);
  const [major, minor, patch] = parts;

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    case 'prerelease':
      return `${major}.${minor}.${patch + 1}-beta.${Date.now()}`;
    default:
      throw new Error(`Unknown version type: ${type}`);
  }
}

/**
 * Обновляет версии в package.json файлах
 */
async function updatePackageVersions(newVersion) {
  console.log('📝 Updating package.json files...');

  // Обновляем library package.json
  const libPkg = JSON.parse(fs.readFileSync(LIB_PACKAGE_PATH, 'utf8'));
  libPkg.version = newVersion;
  fs.writeFileSync(LIB_PACKAGE_PATH, JSON.stringify(libPkg, null, 2) + '\n');

  // Обновляем main package.json
  const mainPkg = JSON.parse(fs.readFileSync(MAIN_PACKAGE_PATH, 'utf8'));
  mainPkg.version = newVersion;
  fs.writeFileSync(MAIN_PACKAGE_PATH, JSON.stringify(mainPkg, null, 2) + '\n');

  console.log('✅ Package versions updated');
}

/**
 * Обновляет CHANGELOG.md
 */
async function updateChangelog(version) {
  console.log('📝 Updating CHANGELOG...');

  const date = new Date().toISOString().split('T')[0];
  const newEntry = `## [${version}] - ${date}

### Added
- New features and improvements

### Changed
- Updated existing functionality

### Fixed
- Bug fixes and stability improvements

`;

  if (fs.existsSync(CHANGELOG_PATH)) {
    const content = fs.readFileSync(CHANGELOG_PATH, 'utf8');
    const updatedContent = content.replace('# Changelog\n\n', `# Changelog\n\n${newEntry}`);
    fs.writeFileSync(CHANGELOG_PATH, updatedContent);
  } else {
    const newChangelog = `# Changelog

All notable changes to this project will be documented in this file.

${newEntry}`;
    fs.writeFileSync(CHANGELOG_PATH, newChangelog);
  }

  console.log('✅ CHANGELOG updated');
}

/**
 * Создает Git коммит и тег для релиза
 */
async function createGitRelease(version) {
  console.log('🏷️ Creating git release...');

  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "chore: bump version to ${version}"`, { stdio: 'inherit' });
  execSync(`git tag -a v${version} -m "Release version ${version}"`, { stdio: 'inherit' });

  console.log(`✅ Git tag v${version} created`);
}

/**
 * Собирает документацию
 */
async function buildDocumentation() {
  console.log('📖 Building documentation...');
  
  try {
    execSync('npm run generate-docs', { 
      cwd: path.resolve(PROJECT_ROOT, '../..'),
      stdio: 'inherit' 
    });
    console.log('✅ Documentation built');
  } catch (error) {
    console.warn('⚠️ Warning: Documentation build failed');
  }
}

/**
 * Запускает тесты
 */
async function runTests() {
  console.log('🧪 Running tests...');
  
  try {
    execSync('npm test -- --watch=false', { 
      cwd: path.resolve(PROJECT_ROOT, '../..'),
      stdio: 'inherit' 
    });
    console.log('✅ Tests passed');
  } catch (error) {
    throw new Error('Tests failed');
  }
}

/**
 * Собирает библиотеку
 */
async function buildLibrary() {
  console.log('🏗️ Building library...');
  
  execSync('npm run build', { 
    cwd: path.resolve(PROJECT_ROOT, '../..'),
    stdio: 'inherit' 
  });
  
  console.log('✅ Library built');
}

/**
 * Валидирует сборку
 */
async function validateBuild() {
  console.log('🔍 Validating build...');
  
  const distPath = path.resolve(PROJECT_ROOT, '../../dist/tgui');
  
  if (!fs.existsSync(distPath)) {
    throw new Error('Build directory not found');
  }

  const packageJsonPath = path.join(distPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('package.json not found in build');
  }

  const buildSize = getDirSize(distPath);
  console.log(`📏 Build size: ${formatBytes(buildSize)}`);
  
  if (buildSize < 10000) { // Меньше 10KB подозрительно
    throw new Error('Build seems too small');
  }

  console.log('✅ Build validation passed');
}

/**
 * Проверяет авторизацию npm
 */
async function checkNpmAuth() {
  try {
    execSync('npm whoami', { stdio: 'pipe' });
    console.log('✅ npm authentication verified');
  } catch {
    throw new Error('Not logged in to npm. Run: npm login');
  }
}

/**
 * Получает статус Git репозитория
 */
function getGitStatus() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    
    return {
      branch,
      clean: status === '',
      changes: status ? status.split('\n') : []
    };
  } catch {
    return {
      branch: 'unknown',
      clean: false,
      changes: ['Git not available']
    };
  }
}

/**
 * Вычисляет размер директории
 */
function getDirSize(dirPath) {
  let size = 0;
  
  function calculateSize(currentPath) {
    const stat = fs.statSync(currentPath);
    
    if (stat.isFile()) {
      size += stat.size;
    } else if (stat.isDirectory()) {
      fs.readdirSync(currentPath).forEach(file => {
        calculateSize(path.join(currentPath, file));
      });
    }
  }
  
  calculateSize(dirPath);
  return size;
}

/**
 * Форматирует байты в читаемый формат
 */
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + 'KB';
  return Math.round(bytes / (1024 * 1024) * 10) / 10 + 'MB';
}

/**
 * Показывает справку
 */
function showHelp() {
  console.log(`
🔄 TGUI Angular Version Manager

Usage:
  node version-manager.js <command> [options]

Commands:
  bump <type>     Bump version (patch|minor|major|prerelease)
  prepare         Prepare release (test + build)
  publish         Publish to npm
  status          Show current status

Options:
  --dry-run           Show what would be done without making changes
  --skip-validation   Skip pre-release validation
  
Examples:
  node version-manager.js bump patch
  node version-manager.js bump minor --dry-run
  node version-manager.js prepare
  node version-manager.js publish
  node version-manager.js status
`);
}

// Запускаем основную функцию
main().catch(console.error); 