/* MIT License
Copyright(c) 2016 BuildIQ LIMITED, www.buildiq.co.uk
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var HTMLUtils = {

    // HTML Encodes all JSON objects and recursively calls itself to encode all children too
    HTMLEncodeJSONObject: function(JSONObj) {
        var result = null;
        if(JSONObj instanceof Array) {
            for(var i = 0; i < JSONObj.length; i++) {
                this.HTMLEncodeJSONObject(JSONObj[i]);
            }
        }
        else
        {
            for(var prop in JSONObj) {
                if(JSONObj[prop] instanceof Object || JSONObj[prop] instanceof Array) {
                    this.HTMLEncodeJSONObject(JSONObj[prop]);
                }
                else
                {
                    if (typeof JSONObj[prop] === 'string' || JSONObj[prop] instanceof String) {
                        JSONObj[prop] = this.HTMLEncodeString(JSONObj[prop]);
                    }
                }
            }
        }
    },

    // HTML Decodes a JSON object and all children
    HTMLDecodeJSONObject: function (JSONObj) {
        var result = null;
        if (JSONObj instanceof Array) {
            for (var i = 0; i < JSONObj.length; i++) {
                this.HTMLDecodeJSONObject(JSONObj[i]);
            }
        }
        else {
            for (var prop in JSONObj) {
                if (JSONObj[prop] instanceof Object || JSONObj[prop] instanceof Array) {
                    this.HTMLDecodeJSONObject(JSONObj[prop]);
                }
                else {
                    if (typeof JSONObj[prop] === 'string' || JSONObj[prop] instanceof String) {
                        JSONObj[prop] = this.HTMLDecodeString(JSONObj[prop]);
                    }
                }
            }
        }
    },

    // HTML Encodes a particular string
    HTMLEncodeString: function (str) {
        var aa = str;
        return str
       .replace(/&/g, '&amp;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#39;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;');
    },

    // HTML Decodes a particular string 
    HTMLDecodeString: function(str)
    {
        return str
     .replace(/&quot;/g, '"')
     .replace(/&#39;/g, "'")
     .replace(/&lt;/g, '<')
     .replace(/&gt;/g, '>')
     .replace(/&amp;/g, '&');
    }
}
