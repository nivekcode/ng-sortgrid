[![Travis build badge](https://img.shields.io/travis/kreuzerk/ng-sortgrid.svg)](https://travis-ci.org/kreuzerk/ng-sortgrid)
[![codecov](https://codecov.io/gh/kreuzerk/ng-sortgrid/branch/master/graph/badge.svg)](https://codecov.io/gh/kreuzerk/ng-sortgrid)
[![angular10](https://img.shields.io/badge/angular%2010%20ready-true-green.svg)]()

# Ng-sortgrid

![Logo](https://raw.githubusercontent.com/kreuzerk/ng-sortgrid/master/projects/ng-sortgrid-demo/src/assets/ng-sortgrid-logo.png)

![Grid demo](https://raw.githubusercontent.com/kreuzerk/ng-sortgrid/master/projects/ng-sortgrid-demo/src/assets/grid-demo.gif)

[Demo](https://kreuzerk.github.io/ng-sortgrid/)

- [Getting started](#getting-started)
  - [Download the module](#download-the-module)
  - [Apply the directive](#apply-the-directive)
  - [React on changes](#react-on-changes)
- [API](#api)
  - [Inputs](#inputs)
  - [Outputs](#outputs)

# Getting started
## Download the module

```
npm i -s ng-sortgrid
```

Import the ```NgsgModule``` in your ```AppModule```.

```
  import {NgsgModule} from 'ng-sortgrid'
  ...
  @NgModule({
    imports: [BrowserModule, NgsgModule],
    //...
  })  
  ...
```

## Apply the directive
Loop over your elements with *ngFor. 🛎️ the items needs to be an array. Alternate you can also use the async pipe to pass in your items.

![Grid demo](https://raw.githubusercontent.com/kreuzerk/ng-sortgrid/master/projects/ng-sortgrid-demo/src/assets/gs1.png)

Apply the ngSortgridItem directive

![Grid demo](https://raw.githubusercontent.com/kreuzerk/ng-sortgrid/master/projects/ng-sortgrid-demo/src/assets/gs2.png)

## React on changes
In most cases you are interested in the new sort order. Often you want to store them in local storage or even send them to the backend. To do so the following two steps are needed in addition to the "Getting started" step.

Pass your items to the directive via the ngSortGridItems input.

![Grid demo](https://raw.githubusercontent.com/kreuzerk/ng-sortgrid/master/projects/ng-sortgrid-demo/src/assets/gs3.png)
React on the 'sorted' output event. The `sorted` output event emits a `NgsgOrderChange` which contains the `previousOrder` and the `currentOrder`

![Grid demo](https://raw.githubusercontent.com/kreuzerk/ng-sortgrid/master/projects/ng-sortgrid-demo/src/assets/gs4.png)

## Group sortgrids
In case you have more than one sortgriditem on the page you need to group the sortgriditems to avoid dropping drags from one group in another group.
Pass in a unique name to the ngSortGridGroup input

![Grid demo](https://raw.githubusercontent.com/kreuzerk/ng-sortgrid/master/projects/ng-sortgrid-demo/src/assets/gs5.png)

## Use the async pipe
You can also use the async pipe to display items

![Grid demo](https://raw.githubusercontent.com/kreuzerk/ng-sortgrid/master/projects/ng-sortgrid-demo/src/assets/gs6.png)

# Style your items on different events
The ng-sortgrid adds different classes on different events to your items. You can either use those classes to style the appereance
of your items on certain events or you can include the build in CSS from the ng-sortgrid library.

## Integrate the build in CSS
To integrate the built in Stylesheet just import in in your angular.json.

```
    "styles": [
              "node_modules/ng-sortgrid/styles/ngsg.css",
            ],
```

Alternative you can provide custom styles for the different classes listed bellow

| Class             | Description                                                                                                                                    |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| ng-sg-placeholder | This class is added to the placeholder item which previews where the item is inserted                                                          |
| ng-sg-dropped     | This class is added as soon after you drop an item. The class will be on the item for 500 milliseconds before it gets removed                  |
| ng-sg-selected    | This class is added when you press the CMD or the Ctrl Key and Click on an item. It indicates which items are selected for the multi drag&drop |

# Scrolling
The ng-sortgrid has a *autoScroll* flag which you can use to enable autoScroll. If you enable autoScroll the screen will start to scroll 
in the following scenario. 

![Grid demo](https://raw.githubusercontent.com/kreuzerk/ng-sortgrid/master/projects/ng-sortgrid-demo/src/assets/scrolling.png)

- If you drag an element in the top 50px of the screen
- If you drag an element in the bottom 50px of the screen

## Custom scroll points
Sometimes its not enough to onyl scroll once you drag over the top view port border. Imagine that you have a fixed navbar 
at the top of your page. In this case you need to scroll once you drag an element over the navbar.

## Scroll speed (*default 50*)
The *scrollSpeed* property accepts a number and allows you to specify the scrolling speed.

[Check out the scroll demo](https://kreuzerk.github.io/ng-sortgrid/scrolling)

# API

## Inputs
| Value             | Description                                                                                                                                    | Default|
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------|--------|
| ngSortGridGroup: string | Groups a grid - avoids that items from one grid can be dragged to another grid                                                         |undefined|
| ngSortGridItems: any[] | Sort grid items. Pass down a list of all your items. This list is needed to enable the sorting feature.|undefined|
| autoScroll: boolean | Flag to enable autoscrolling|false|
| scrollPointTop: number | Custom top scrollpoint in pixels|if autoscroll is applied we start scrolling if we pass the top border|
| scrollPointBottom: number | Custom bottom scrollpoint in pixels|if autoscroll is applied we start scrolling if we pass the bottom border|
| scrollSpeed: number | Scrollspeed, the higher the value, the higher we scroll.|50 - only applies if autoscrolling is on|

## Outputs
| Value             | Description                                                                                                                                    | Default|
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------|--------|
| sorted: EventEmitter<NgsgOrderChange<T> | Emits an event after we sorted the items, each event is of type NgsgOrderChange. The NgsgOrderChange contains the previousOrder and the currentOrder                                                         |undefined|
