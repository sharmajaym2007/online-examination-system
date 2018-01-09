QUnit.module('ESLint | app');

QUnit.test('adapters/application.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
});

QUnit.test('app.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'app.js should pass ESLint\n\n');
});

QUnit.test('components/login-form.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'components/login-form.js should pass ESLint\n\n');
});

QUnit.test('controllers/login.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/login.js should pass ESLint\n\n10:33 - \'login\' is defined but never used. (no-unused-vars)');
});

QUnit.test('models/login.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/login.js should pass ESLint\n\n');
});

QUnit.test('resolver.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'resolver.js should pass ESLint\n\n');
});

QUnit.test('router.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'router.js should pass ESLint\n\n');
});

QUnit.test('routes/about.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/about.js should pass ESLint\n\n');
});

QUnit.test('routes/contact.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/contact.js should pass ESLint\n\n');
});

QUnit.test('routes/login.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/login.js should pass ESLint\n\n');
});

QUnit.test('serializers/application.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
});

