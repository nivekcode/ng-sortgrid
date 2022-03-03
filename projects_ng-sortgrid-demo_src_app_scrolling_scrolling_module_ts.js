"use strict";
(self["webpackChunkng_sortgrid_demo"] = self["webpackChunkng_sortgrid_demo"] || []).push([["projects_ng-sortgrid-demo_src_app_scrolling_scrolling_module_ts"],{

/***/ 4304:
/*!****************************************************************************!*\
  !*** ./projects/ng-sortgrid-demo/src/app/scrolling/scrolling.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollingComponent": () => (/* binding */ ScrollingComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_nav_nav_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/nav/nav.component */ 1541);
/* harmony import */ var _shared_step_step_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/step/step.component */ 253);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _shared_card_card_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/card/card.component */ 4207);
/* harmony import */ var _ng_sortgrid_src_lib_ngsg_item_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ng-sortgrid/src/lib/ngsg-item.directive */ 1018);






function ScrollingComponent_ngsg_card_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ngsg-card", 6);
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("autoScroll", true)("scrollPointTop", ctx_r0.height)("ngSortGridItems", ctx_r0.items)("item", item_r1);
} }
class ScrollingComponent {
    constructor() {
        this.height = 350;
        this.items = Array.from(Array(50).keys());
    }
    ngOnInit() {
    }
}
ScrollingComponent.ɵfac = function ScrollingComponent_Factory(t) { return new (t || ScrollingComponent)(); };
ScrollingComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: ScrollingComponent, selectors: [["app-scrolling"]], decls: 8, vars: 3, consts: [["subtitle", "Scrolling demo", 3, "fixed", "height"], [1, "container", 2, "margin-top", "400px"], ["title", "Sample code to enable scrolling with a custom top scroll point.", "image", "scrolling-code.png"], ["title", "Scroll down to the bottom of the page, drag an item over the blue header (which is the top scroll point) and watch it scroll \uD83D\uDE0A"], [1, "example-container"], ["ngSortgridItem", "", "ngSortGridGroup", "getting-started", "class", "example-box", 3, "autoScroll", "scrollPointTop", "ngSortGridItems", "item", 4, "ngFor", "ngForOf"], ["ngSortgridItem", "", "ngSortGridGroup", "getting-started", 1, "example-box", 3, "autoScroll", "scrollPointTop", "ngSortGridItems", "item"]], template: function ScrollingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ngsg-demo-nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1)(2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Scrolling");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "ngsg-demo-step", 2)(5, "ngsg-demo-step", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ScrollingComponent_ngsg_card_7_Template, 1, 4, "ngsg-card", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("fixed", true)("height", ctx.height + "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.items);
    } }, directives: [_shared_nav_nav_component__WEBPACK_IMPORTED_MODULE_0__.NavComponent, _shared_step_step_component__WEBPACK_IMPORTED_MODULE_1__.StepComponent, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _shared_card_card_component__WEBPACK_IMPORTED_MODULE_2__.CardComponent, _ng_sortgrid_src_lib_ngsg_item_directive__WEBPACK_IMPORTED_MODULE_3__.NgsgItemDirective], encapsulation: 2 });


/***/ }),

/***/ 7722:
/*!*************************************************************************!*\
  !*** ./projects/ng-sortgrid-demo/src/app/scrolling/scrolling.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollingModule": () => (/* binding */ ScrollingModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _ng_sortgrid_src_lib_ngsg_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../ng-sortgrid/src/lib/ngsg.module */ 3275);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/shared.module */ 5786);
/* harmony import */ var _scrolling_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scrolling.component */ 4304);
/* harmony import */ var _scrolling_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scrolling.routing.module */ 4558);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);






class ScrollingModule {
}
ScrollingModule.ɵfac = function ScrollingModule_Factory(t) { return new (t || ScrollingModule)(); };
ScrollingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: ScrollingModule });
ScrollingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
            _scrolling_routing_module__WEBPACK_IMPORTED_MODULE_3__.ScrollingRoutingModule,
            _ng_sortgrid_src_lib_ngsg_module__WEBPACK_IMPORTED_MODULE_0__.NgsgModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ScrollingModule, { declarations: [_scrolling_component__WEBPACK_IMPORTED_MODULE_2__.ScrollingComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
        _scrolling_routing_module__WEBPACK_IMPORTED_MODULE_3__.ScrollingRoutingModule,
        _ng_sortgrid_src_lib_ngsg_module__WEBPACK_IMPORTED_MODULE_0__.NgsgModule] }); })();


/***/ }),

/***/ 4558:
/*!*********************************************************************************!*\
  !*** ./projects/ng-sortgrid-demo/src/app/scrolling/scrolling.routing.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollingRoutingModule": () => (/* binding */ ScrollingRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _scrolling_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scrolling.component */ 4304);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);




class ScrollingRoutingModule {
}
ScrollingRoutingModule.ɵfac = function ScrollingRoutingModule_Factory(t) { return new (t || ScrollingRoutingModule)(); };
ScrollingRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: ScrollingRoutingModule });
ScrollingRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild([
                { path: '', component: _scrolling_component__WEBPACK_IMPORTED_MODULE_0__.ScrollingComponent }
            ])]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ScrollingRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ })

}]);
//# sourceMappingURL=projects_ng-sortgrid-demo_src_app_scrolling_scrolling_module_ts.js.map