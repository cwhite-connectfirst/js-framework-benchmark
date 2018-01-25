'use strict';

window.rowsUpdated = 0;
window.rowsMounted = 0;

export class Row {
	constructor(props) {
		this.props = props;
		this.onDelete = this.onDelete.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	update(props) {
		let {oldStyleClass, oldData} = this.props;
		Object.assign(this.props, props);
		
		if (!(this.props.styleClass === oldStyleClass && this.props.data === oldData)) 
		{
			this.refreshElem();
		}
	}

	onDelete() {
		this.props.onDelete(this.props.data.id);
	}

	onClick() {
		this.props.onClick(this.props.data.id);
	}

	toHtmlElem() {
		if (!this.cachedElem) {
			let {styleClass, onClick, onDelete, data} = this.props,
			html = `
			<tr class=${styleClass}>
				<td class="col-md-1 data-id">${data.id}</td>
				<td class="col-md-4">
					<a class="data-label">${data.label}</a>
				</td>
				<td class="col-md-1"><a><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
				<td class="col-md-6"></td>
			</tr>`,
			container = document.createElement('table');
			
			container.appendChild(document.createElement('tbody'))

			container.innerHTML = html.trim();
			let elem = container.firstElementChild;
			container.innerHTML = "";
			container.remove();

			elem.onClick = this.onClick;
			elem.onDelete = this.onDelete;

			this.cachedElem = elem;
		}


		return this.cachedElem;
	}

	refreshElem() {
		const { data, styleClass } = this.props;

		if (this.cachedElem) {
			this.cachedElem.querySelector('.data-id').innerHTML = data.id;
			this.cachedElem.querySelector('.data-label').innerHTML = data.label;
			this.cachedElem.className = styleClass;
		}
	}
}

