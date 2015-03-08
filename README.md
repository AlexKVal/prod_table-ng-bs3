#### It's an AngularJS + angular_ui/bootstrap version of [AlexKVal/react-thinking](https://github.com/AlexKVal/react-thinking/)

Tech stack:
- Bootstrap (CSS only)
- AngularJS
- [angular_ui/bootstrap](https://github.com/angular-ui/bootstrap)
- Gulp

For now only "typeahead"-directive used.

All styles are concatenating and minifying into one file.

Angular templates are embedding into one js file and then are concatenating
with all vendor and application js files into one minified.

In a console run:

    $ git clone https://github.com/AlexKVal/prod_table-ng-bs3
    $ cd prod_table-ng-bs3
    $ npm install -g gulp
    $ npm install
    $ gulp

Result should look like this:

![](https://raw.githubusercontent.com/AlexKVal/prod_table-ng-bs3/images/images/result.png)
