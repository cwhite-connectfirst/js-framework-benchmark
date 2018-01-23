/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, NgModule, VERSION } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
/**
 * @record
 */
function Data() { }
function Data_tsickle_Closure_declarations() {
    /** @type {?} */
    Data.prototype.id;
    /** @type {?} */
    Data.prototype.label;
}
let /** @type {?} */ startTime;
let /** @type {?} */ lastMeasure;
let /** @type {?} */ startMeasure = function (name) {
    startTime = performance.now();
    lastMeasure = name;
};
const ɵ0 = startMeasure;
let /** @type {?} */ stopMeasure = function () {
    var /** @type {?} */ last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function () {
            lastMeasure = null;
            var /** @type {?} */ stop = performance.now();
            var /** @type {?} */ duration = 0;
            console.log(last + " took " + (stop - startTime));
        }, 0);
    }
};
const ɵ1 = stopMeasure;
export class AppComponent {
    constructor() {
        this.data = [];
        this.selected = undefined;
        this.id = 1;
        this.backup = undefined;
        console.info(VERSION.full);
    }
    /**
     * @param {?=} count
     * @return {?}
     */
    buildData(count = 1000) {
        var /** @type {?} */ adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var /** @type {?} */ colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var /** @type {?} */ nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var /** @type {?} */ data = [];
        for (var /** @type {?} */ i = 0; i < count; i++) {
            data.push({ id: this.id, label: adjectives[this._random(adjectives.length)] + " " + colours[this._random(colours.length)] + " " + nouns[this._random(nouns.length)] });
            this.id++;
        }
        return data;
    }
    /**
     * @param {?} max
     * @return {?}
     */
    _random(max) {
        return Math.round(Math.random() * 1000) % max;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    itemById(index, item) {
        return item.id;
    }
    /**
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    select(item, event) {
        startMeasure("select");
        event.preventDefault();
        this.selected = item.id;
    }
    /**
     * @param {?} item
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    delete(item, index, event) {
        event.preventDefault();
        startMeasure("delete");
        this.data.splice(index, 1);
        for (let /** @type {?} */ i = 0, /** @type {?} */ l = this.data.length; i < l; i++) {
            if (this.data[i].id === item.id) {
                this.data.splice(i, 1);
                break;
            }
        }
    }
    /**
     * @return {?}
     */
    run() {
        startMeasure("run");
        this.data = this.buildData();
    }
    /**
     * @return {?}
     */
    add() {
        startMeasure("add");
        this.data = this.data.concat(this.buildData(1000));
    }
    /**
     * @return {?}
     */
    update() {
        startMeasure("update");
        for (let /** @type {?} */ i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    }
    /**
     * @return {?}
     */
    runLots() {
        startMeasure("runLots");
        this.data = this.buildData(10000);
        this.selected = undefined;
    }
    /**
     * @return {?}
     */
    clear() {
        startMeasure("clear");
        this.data = [];
        this.selected = undefined;
    }
    /**
     * @return {?}
     */
    swapRows() {
        startMeasure("swapRows");
        if (this.data.length > 998) {
            var /** @type {?} */ a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        stopMeasure();
    }
}
AppComponent.decorators = [
    { type: Component, args: [{
                selector: 'my-app',
                template: `<div class="container">
    <div class="jumbotron">
        <div class="row">
            <div class="col-md-6">
                <h1>Angular v5.0.0</h1>
            </div>
            <div class="col-md-6">
                <div class="col-sm-6 smallpad">
                    <button type="button" class="btn btn-primary btn-block" id="run" (click)="run()" ref="text">Create 1,000 rows</button>
                </div>
                <div class="col-sm-6 smallpad">
                    <button type="button" class="btn btn-primary btn-block" id="runlots" (click)="runLots()">Create 10,000 rows</button>
                </div>
                <div class="col-sm-6 smallpad">
                    <button type="button" class="btn btn-primary btn-block" id="add" (click)="add()" ref="text">Append 1,000 rows</button>
                </div>
                <div class="col-sm-6 smallpad">
                    <button type="button" class="btn btn-primary btn-block" id="update" (click)="update()">Update every 10th row</button>
                </div>
                <div class="col-sm-6 smallpad">
                    <button type="button" class="btn btn-primary btn-block" id="clear" (click)="clear()">Clear</button>
                </div>
                <div class="col-sm-6 smallpad">
                    <button type="button" class="btn btn-primary btn-block" id="swaprows" (click)="swapRows()">Swap Rows</button>
                </div>
            </div>
        </div>
    </div>
    <table class="table table-hover table-striped test-data">
        <tbody>
            <tr [class.danger]="item.id === selected" *ngFor="let item of data; trackBy itemById; index as i">
                <td class="col-md-1">{{item.id}}</td>
                <td class="col-md-4">
                    <a href="#" (click)="select(item, $event)">{{item.label}}</a>
                </td>
                <td class="col-md-1"><a href="#" (click)="delete(item, i, $event)"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
                <td class="col-md-6"></td>
            </tr>
        </tbody>
    </table>
    <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
</div>`
            },] },
];
/** @nocollapse */
AppComponent.ctorParameters = () => [];
function AppComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AppComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AppComponent.ctorParameters;
    /** @type {?} */
    AppComponent.prototype.data;
    /** @type {?} */
    AppComponent.prototype.selected;
    /** @type {?} */
    AppComponent.prototype.id;
    /** @type {?} */
    AppComponent.prototype.backup;
}
export class AppModule {
}
AppModule.decorators = [
    { type: NgModule, args: [{
                imports: [BrowserModule],
                declarations: [AppComponent],
                bootstrap: [AppComponent],
            },] },
];
/** @nocollapse */
AppModule.ctorParameters = () => [];
function AppModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AppModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AppModule.ctorParameters;
}
export { ɵ0, ɵ1 };
//# sourceMappingURL=app.js.map