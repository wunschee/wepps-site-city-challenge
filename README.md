# \<wepps-site-city-challenge\>

Mobile App for **_city challenge_**

## Sections

- [Architecture](#architecture)
- [Language](#language)
- [Development tool](#development-tool)
- [App location for testing purposes](#app-location-for-testing-purposes)
- [Publishing and development notes](#publishing-and-development-notes)
- [Further investigations](#further-investigations)

## Architecture

SAPUI5 *(v1.63.0)* [visit](https://sapui5.hana.ondemand.com)
OpenUI5 *(v1.63.0)* [visit](https://openui5.hana.ondemand.com)

## Language

JavaScript, XML

## Development tool

SAP Web IDE Full-Stack *(v190228)* [visit](https://webidecp-p2001052300trial.dispatcher.hanatrial.ondemand.com/)

## App location for testing purposes

Published on SAP Web Ide: [visit](https://webidetesting5618431-p2001052300trial.dispatcher.hanatrial.ondemand.com/webapp/extended_runnable_file.html?hc_orionpath=%2FDI_webide_di_workspacef8t9q21065og7yyj%2Fchallenge&neo-di-affinity=BIGipServer~jpaas_folder~disapwebide.hanatrial.ondemand.com+%211hpOiM7wrGitWhJ3IS33XMl29%2F2pYFGfxT0CuXQfZ2bx%2BHVwBY7fo84jijECCqNhKHE9jjHY%2BerhGeA%3D&origional-url=index.html&sap-ui-appCacheBuster=..%2F&sap-ui-xx-componentPreload=off)

## Publishing and development notes

- For publishing this app to public sites, or in case of developing app outside of SAP Web IDE, only **_webapp_** folder needed without **_test_** folder inside
- *test* folder inside, and other files and folders outside of *webapp* folder only needed for SAP Web IDE development
- OpenUI5 environment tested with the same functions, only src modifies to `src="https://openui5.hana.ondemand.com/1.63.0/resources/sap-ui-core.js"`

## Further investigations

> [Microsoft Azure](https://azure.microsoft.com/hu-hu/) Cloud Platform including: Single Instance Azure SQL Database, oData model with Node.js or .NET Core

> OData JavaScript library - [o.js explained](https://www.odata.org/blog/OData-JavaScript-library-o.js-explained/)

> Olingo OData Client for JavaScript - [Documentation](https://olingo.apache.org/doc/javascript/index.html), [Download](http://olingo.apache.org/doc/javascript/download.html), [Usage](https://github.com/ODataOrg/home-samples/blob/master/snippets/olingo-odata-client-for-javascript.md)