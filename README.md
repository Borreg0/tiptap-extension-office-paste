# Tiptap office paste extension
This extension fixes format of text copied from MS Office and/or Google Docs and pasted into the [Tiptap](https://tiptap.dev/) editor. 

## Installing
```
npm i --save @intevation/tiptap-extension-office-paste
```

## Features

# MS Office
* Fixes lists
  * Convertes mso lists into actual html lists
  * Corrects list levels
  * Parse list type and start
* Removes bookmark tags
* Removes `<o:p>` tags
* Converts `mso` styles
* Removes black text color style

# Google Docs
* Cleans lists
  * Respects lists' nesting levels
  * Removes redundant and/or repeated tags
  * Parses list type and rebuilds it accordingly
* Respects original formatting style
* Replaces `<br>`, `&nbsp;`, `\u00A0` tags for blank spaces respecting document's structure
* Removes only redundant styles like `color:rgb(0, 0, 0);`
  
# Apple Pages
* Cleans lists
  * Respects lists' nesting levels
  * Removes redundant and/or repeated tags
  * Parses list type and rebuilds it accordingly
* Respects the original formatting style

## Usage
```javascript
import OfficePaste from "@intevation/tiptap-extension-office-paste";

const editor = Editor({
    extensions: [
        StarterKit,
        OfficePaste,
        BackgroundColor
    ]
});
```

# License

The MIT License (MIT). Please see [License File](https://github.com/Intevation/tiptap-extension-office-paste/blob/main/LICENSE) for more information.
