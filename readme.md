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

DB Setup
-----
MySQL database "items" in utf8_general_ci having two tables with the same charset:
"phones_list": ID (INT, Unique, AI), Phone_name (TEXT), OS (TEXT), Status (TEXT), Date (DATETIME), Comments (CHAR), HISTORY (VARCHAR)
"users": ID (INT, Unique, AI), Login (TEXT), Full_name (VARCHAR), Email (VARCHAR)