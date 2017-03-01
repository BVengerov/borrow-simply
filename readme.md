borrow-simply
=============

What is this?
-----
This is a web-app which goal is to provide simple yet functional interface for "borrowing" things that are stored in DB.
Currently those things are a bunch of test phones is shared by a group of users. Thus, the app can be used for tracking the items, so that people involved can see which items are available or who took them (and when), or take the items themselves.

Dependencies
-----
PHP 5.5+  
AngularJS 1.5+  
angular-cookies  
jQuery  
qtip2  
ng-qtip2
grunt-hashres

Installation
-----
`npm install -g bower`

`bower install`

DB Schema
-----
MySQL database with name **items** is used. It is in utf8_general_ci and has two tables with the said charset:  
**phones_list**: ID (INT, Unique, AI), Name (TEXT), Type (TEXT), OS (TEXT), Display (TEXT), Resolution (TEXT), Home (TEXT), Status (TEXT), Date (DATETIME), Comment (CHAR), HISTORY (VARCHAR)  
**users**: ID (INT, Unique, AI), Login (TEXT), Full_name (VARCHAR), Email (VARCHAR)

How It Looks
-----
![The look](how_it_looks.gif?raw=true)
