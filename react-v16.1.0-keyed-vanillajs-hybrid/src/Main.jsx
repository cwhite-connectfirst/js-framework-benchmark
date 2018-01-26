'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
const { Row } = require('./Row');
const { run, runLots, add, update, swapRows, deleteRow } = require('./utils')
var startTime;
var lastMeasure;
var startMeasure = function (name) {
    startTime = performance.now();
    lastMeasure = name;
}
var stopMeasure = function () {
    var last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function () {
            lastMeasure = null;
            var stop = performance.now();
            var duration = 0;
            console.log(last + " took " + (stop - startTime));
        }, 0);
    }
}

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selected: undefined,
            id: 1,
            changed: {}
        };
        this.select = this.select.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.run = this.run.bind(this);
        this.update = this.update.bind(this);
        this.runLots = this.runLots.bind(this);
        this.clear = this.clear.bind(this);
        this.swapRows = this.swapRows.bind(this);
        this.start = 0;
    }
    printDuration() {
        stopMeasure();
    }
    componentDidUpdate() {
        this.printDuration();
    }
    componentDidMount() {
        this.printDuration();
    }
    run() {
        startMeasure("run");
        const { id } = this.state;
        const obj = run(id);
        this.setState({ data: obj.data, id: obj.id, selected: undefined, changed: {
            all: true
        }});
    }
    add() {
        startMeasure("add");
        const { id } = this.state;
        const obj = add(id, this.state.data);
        this.setState({ data: obj.data, id: obj.id, changed: {
            add: Array.from(new Array(obj.id - id), (x, i) => i + (id - 1))
        }});
    }
    update() {
        startMeasure("update");
        const { newData, updatedData } = update(this.state.data);
        this.setState({ data: newData, changed: {
            update: updatedData
        }});
    }
    select(id) {
        startMeasure("select");
        let changed = {};

        if (this.state.selected != id) {
            changed.select = {
                oldId: this.state.selected,
                newId: id
            };
        }

        this.setState({ selected: id, changed: changed });
    }
    delete(id) {
        startMeasure("delete");
        const data = deleteRow(this.state.data, id);
        this.setState({ data: data, changed: {
            delete: id
        }});
    }
    runLots() {
        startMeasure("runLots");
        const { id } = this.state;
        const obj = runLots(id);
        this.setState({ data: obj.data, id: obj.id, selected: undefined, changed: {
            all: true
        }});
    }
    clear() {
        startMeasure("clear");
        this.setState({ data: [], selected: undefined, changed: {
            all: true
        }});
    }
    swapRows() {
        startMeasure("swapRows");
        const { newData, swappedRows } = swapRows(this.state.data);
        this.setState({ data: newData, changed: {
            swap: swappedRows
        }});
    }

    componentDidMount() {
        this.tbody = document.querySelector('tbody');
        this.rows = [];
    }

    /**
     * Hacking shouldComponentUpdate to do custom rendering
     * 
     * @param {*} nextProps 
     * @param {*} nextState 
     */
    shouldComponentUpdate(nextProps, nextState) {
        // const { data, selected } = this.state;
        // const nextData = nextState.data;
        // const nextSelected = nextState.selected;
        // return !(data.length === nextData.length && data.every((v, i) => v === nextData[i])) || selected != nextSelected;
       
        // TODO - update rows here
        
        this.renderRows(this.state, nextState);

        return true;
    }

    addNewRowToView(state, dataIndex) {
        let data = state.data[dataIndex];

        let newRow = new Row({
            key: data.id,
            data: data,
            onClick: this.select,
            onDelete: this.delete,
            styleClass: data.id === state.selected ? 'danger' : ''
        });
        this.rows.push(newRow);
        this.tbody.appendChild(newRow.toHtmlElem());
    }

    reorderRow(index) {
        this.rows[index - 1].toHtmlElem().insertAdjacentElement("afterend", this.rows[index].toHtmlElem());
    }

    // steps:
    // createRow if it doesn't exist
    // updateRow if it does exist
    // swapRows if provided
    // remove row if it exists
    renderRows(previousState = {}, nextState = {}) {
        let changed = nextState.changed ? nextState.changed : {};

        switch (Object.keys(changed)[0]) {
            case "all": 
                this.tbody.innerHTML = "";
                this.rows = [];
                nextState.data.forEach((d, i) => this.addNewRowToView(nextState, i));
                break;
            case "add":
                changed.add.forEach((dataIndex) => this.addNewRowToView(nextState, dataIndex));
                break;
            case "update":
                changed.update.forEach((dataIndex) => this.rows[dataIndex].update({data: nextState.data[dataIndex]}));
                break;
            case "delete":
                this.rows.find((row) => row.props.key == changed.delete).destroyRow();
                break;
            case "swap":
                const {indexA, indexB} = changed.swap;

                let temp = this.rows[indexA];
                this.rows[indexA] = this.rows[indexB];
                this.rows[indexB] = temp;
                this.reorderRow(indexA);
                this.reorderRow(indexB);
                break;
            case "select":
                const {oldId, newId} = changed.select;
                let oldIdFound = false, newIdFound = false;

                for (let i = 0; i < this.rows.length; i++) {
                    if (this.rows[i].props.key == oldId) {
                        this.rows[i].update({styleClass: ''})
                        oldIdFound = true;
                    }

                    if (this.rows[i].props.key == newId) {
                        this.rows[i].update({styleClass: 'danger'});
                        newIdFound = true;
                    }

                    if (oldIdFound && newIdFound) {
                        break;
                    }
                }
                break;
        }
    }

    render() {
        return (<div className="container">
            <div className="jumbotron">
                <div className="row">
                    <div className="col-md-6">
                        <h1>React keyed</h1>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="run" onClick={this.run}>Create 1,000 rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="runlots" onClick={this.runLots}>Create 10,000 rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="add" onClick={this.add}>Append 1,000 rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="update" onClick={this.update}>Update every 10th row</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="clear" onClick={this.clear}>Clear</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="swaprows" onClick={this.swapRows}>Swap Rows</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-hover table-striped test-data">
                <tbody>
                </tbody>
            </table>
            <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
        </div>);
    }
}
