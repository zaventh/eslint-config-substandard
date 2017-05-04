var eslint = require('eslint');
var test = require('tape');
var path = require('path');

var linter = new eslint.CLIEngine({
	configFile: path.join(__dirname, '..', 'eslintrc.json')
});

test('api: lintText', function (t) {
	t.plan(1);
	var result = linter.executeOnText("console.log('hi there')\n\n");
	t.equals(result.results[0].messages[0].message, 'Missing semicolon.');
});

test('api: guard for-in', function (t) {
	t.plan(1);
	var result = linter.executeOnText("var arr = ['one', 'two', 'three']; for (var i in arr) { console.log(i); }");
	t.equals(result.results[0].messages[0].message, 'The body of a for-in should be wrapped in an if statement to filter unwanted properties from the prototype.');
});
