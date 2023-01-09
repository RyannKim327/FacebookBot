# AnonFile Lib
**Welcome to the AnonFile Api Wrapper made by Jacub**

------------


###Docs:

<dl>
<dt><a href="#get">get(id)</a></dt>
<dd><p>Gets the specified file from anonfile and returns a promise of the info object.</p>
</dd>
<dt><a href="#upload">upload(filepath)</a></dt>
<dd><p>Uploads the specified file to anon file and returns a promise of the info object.</p>
</dd>
</dl>

<a name="get"></a>

## get(id)
Gets the specified file from anonfile and returns a promise of the info object.

**Kind**: module function

| Param | Type |
| --- | --- |
| id | <code>String</code> |

<a name="upload"></a>

## upload(filepath)
Uploads the specified file to anon file and returns a promise of the info object.

**Kind**: module function

| Param | Type |
| --- | --- |
| filepath | <code>String</code> |


------------


###Examples:
```js
const anonfile = require('anonfile-lib');
anonfile.get('FILE ID').then((info) => {
	console.log(info);
});

anonfile.upload('FILEPATH').then((info) => {
	console.log(info);
});

```


