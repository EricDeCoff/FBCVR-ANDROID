function getAccountFilters(t){t.includeAccounts&&(t.includeAccounts=t.includeAccounts.map(function(t){return t.id.toString()})),t.excludeAccounts&&(t.excludeAccounts=t.excludeAccounts.map(function(t){return t.id.toString()}))}function populateSearchFields(t){var e,n,a,c={},o=[];for(e=0,n=t.length;n>e;e++)"*"===t[e]?(c[ContactFindOptions.SEARCH_FIELD_GIVEN_NAME]=!0,c[ContactFindOptions.SEARCH_FIELD_FAMILY_NAME]=!0,c[ContactFindOptions.SEARCH_FIELD_PHONE]=!0,c[ContactFindOptions.SEARCH_FIELD_EMAIL]=!0,c[ContactFindOptions.SEARCH_FIELD_ORGANIZATION_NAME]=!0):"displayName"===t[e]||"name"===t[e]?(c[ContactFindOptions.SEARCH_FIELD_GIVEN_NAME]=!0,c[ContactFindOptions.SEARCH_FIELD_FAMILY_NAME]=!0):"nickname"===t[e]||("phoneNumbers"===t[e]?c[ContactFindOptions.SEARCH_FIELD_PHONE]=!0:"emails"===t[e]?c[ContactFindOptions.SEARCH_FIELD_EMAIL]=!0:"addresses"===field||"ims"===field||"organizations"===field&&(c[ContactFindOptions.SEARCH_FIELD_ORGANIZATION_NAME]=!0));for(a in c)c.hasOwnProperty(a)&&o.push(window.parseInt(a));return o}function convertBirthday(t){var e;return t?(e=t.split("-"),new Date(e[0],e[1]-1,e[2]).getTime()):null}function processJnextSaveData(t,e){var n=e;n._success===!0?(n.birthday=convertBirthday(n.birthday),t.callbackOk(n,!1)):t.callbackError(n.code,!1)}function processJnextRemoveData(t,e){var n=e;n._success===!0?t.callbackOk(n):t.callbackError(ContactError.UNKNOWN_ERROR,!1)}function processJnextFindData(t,e,n){var a,c,o=n,i=!1,r={};if(o.contacts)for(a=0,c=o.contacts.length;c>a;a++)o.contacts[a].birthday=convertBirthday(o.contacts[a].birthday),o.contacts[a].name=new ContactName(o.contacts[a].name);else o.contacts=[];if(o._success===!0&&(e.error=!1),e.multiple){for(a=0,c=e.searchResult.length;c>a;a++)r[e.searchResult[a].id]=!0;for(a=0,c=o.contacts.length;c>a;a++)r[o.contacts[a].id]||e.searchResult.push(o.contacts[a]);e.searchFieldIndex++,e.searchFieldIndex<e.searchFields.length&&(i=!0)}else e.searchResult=o.contacts;i?pimContacts.getInstance().invokeJnextSearch(t):e.error?e.result.callbackError(o.code,!1):e.result.callbackOk(e.searchResult,!1)}var pimContacts,contactUtils=require("./contactUtils"),contactConsts=require("./contactConsts"),ContactError=require("./ContactError"),ContactName=require("./ContactName"),ContactFindOptions=require("./ContactFindOptions"),noop=function(){};module.exports={search:function(t,e,n,a){var c,o={},i=new PluginResult(n,a);for(c in n)n.hasOwnProperty(c)&&(o[c]=JSON.parse(decodeURIComponent(n[c])));pimContacts.getInstance().find(o,i,processJnextFindData),i.noResult(!0)},save:function(t,e,n,a){var c={},o=new PluginResult(n,a),i=[];c=JSON.parse(decodeURIComponent(n[0])),c.birthday&&(c.birthday=new Date(c.birthday).toDateString()),c.emails&&(c.emails.forEach(function(t){t.value&&i.push(t.type?{type:t.type,value:t.value}:{type:"home",value:t.value})}),c.emails=i),null!==c.id&&(c.id=window.parseInt(c.id)),c._eventId=o.callbackId,pimContacts.getInstance().save(c,o,processJnextSaveData),o.noResult(!0)},remove:function(t,e,n,a){var c=new PluginResult(n,a),o={contactId:window.parseInt(JSON.parse(decodeURIComponent(n[0]))),_eventId:c.callbackId};window.isNaN(o.contactId)?(c.error(ContactError.UNKNOWN_ERROR),c.noResult(!1)):(pimContacts.getInstance().remove(o,c,processJnextRemoveData),c.noResult(!0))}},JNEXT.PimContacts=function(){var t=this,e=!1;t.find=function(e,n,a){return t.eventHandlers[e.callbackId]={result:n,action:"find",multiple:e[1].filter?!0:!1,fields:e[0],searchFilter:e[1].filter,searchFields:e[1].filter?populateSearchFields(e[0]):null,searchFieldIndex:0,searchResult:[],handler:a,error:!0},t.invokeJnextSearch(e.callbackId),""},t.invokeJnextSearch=function(e){var n={},a=t.eventHandlers[e];n._eventId=e,n.fields=a.fields,n.options={},n.options.filter=[],a.multiple&&n.options.filter.push({fieldName:a.searchFields[a.searchFieldIndex],fieldValue:a.searchFilter}),JNEXT.invoke(t.m_id,"find "+JSON.stringify(n))},t.getContact=function(e){return JSON.parse(JNEXT.invoke(t.m_id,"getContact "+JSON.stringify(e)))},t.save=function(e,n,a){return t.eventHandlers[e._eventId]={result:n,action:"save",handler:a},JNEXT.invoke(t.m_id,"save "+JSON.stringify(e)),""},t.remove=function(e,n,a){return t.eventHandlers[e._eventId]={result:n,action:"remove",handler:a},JNEXT.invoke(t.m_id,"remove "+JSON.stringify(e)),""},t.getId=function(){return t.m_id},t.getContactAccounts=function(){var e=JNEXT.invoke(t.m_id,"getContactAccounts");return JSON.parse(e)},t.init=function(){return JNEXT.require("libpimcontacts")?(t.m_id=JNEXT.createObject("libpimcontacts.PimContacts"),""===t.m_id?!1:void JNEXT.registerEvents(t)):!1},t.onEvent=function(e){var n,a=e.split(" "),c=a[0],o={};"result"===c&&(o.result=escape(e.split(" ").slice(2).join(" ")),n=t.eventHandlers[a[1]],"save"===n.action||"remove"===n.action?n.handler(n.result,JSON.parse(decodeURIComponent(o.result))):"find"===n.action&&n.handler(a[1],n,JSON.parse(decodeURIComponent(o.result))))},t.m_id="",t.eventHandlers={},t.getInstance=function(){return e||(t.init(),e=!0),t}},pimContacts=new JNEXT.PimContacts;