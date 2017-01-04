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