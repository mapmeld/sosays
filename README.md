# sosays

sosays is a command-line helper written in Node.js, which shows you advice from
StackOverflow about what you should do in Bash.

The package comes with a database of StackOverflow questions and answers, so you
can use it offline. After a question you can enter 1 to view the original thread,
or 42 to execute a command.

## As a Command Line tool

```bash
npm install -g sosays

sosays check if process is running
searching...
Q: How to check if a process is running via a batch script
-----------------
tasklist /FI "IMAGENAME eq myapp.exe" 2>NUL | find /I /N "myapp.exe">NUL
if "%ERRORLEVEL%"=="0" echo Programm is running

-----------------
enter 1 to load URL, 42 to run, enter to quit
```

sometimes there are multiple results:

```bash
sosays pretty print
searching...
there were multiple answered questions:
Q: How to pretty print XML from the command line?
-----------------
echo '<root><foo a="b">lorem</foo><bar value="ipsum" /></root>' |
    xmllint --format -

-----------------
Q: How can I pretty-print JSON?
-----------------
echo '{"foo": "lorem", "bar": "ipsum"}' | python -m json.tool

-----------------
```

## As a module

```javascript
var sosays = require("sosays");
sosays('pretty-print', function (err, responses) {
  // responses format
  /*
  [
    { href: '', cmd: '', title: '', sum: '' }
  ]
  */
});
```

## Inspiration

I saw "Twitch Installs ArchLinux" and figured this couldn't be much worse.

Unless you used this in production, which would be worse.

## Disclaimer

I am not affiliated with StackOverflow website or producers in any way!

**Do not look up and trust commands from sosays. You need context.**

Use sosays when you know the right command but it's just \\ing you right now.

## License

MIT license
