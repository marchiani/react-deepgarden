import React from 'react';
import ReactDOM from 'react-dom';

import Toast from './index';

const DEFAULT_TIMEOUT = 5000;

import { portal } from '../../hoc/portal';

const $node = window ? document.createElement('div') : null; // @TODO: Test browser support

let toasts = new Map();

@portal({
	className: '_Toast__Overlay',
})
class Toasts extends React.Component {
	render() {
		return [...toasts.keys()].map((toast, key) => <Toast key={key} {...toast} />);
	}
}

export default function toast({ timeout = DEFAULT_TIMEOUT, ...props }) {

	if (!window) {
		return false;
	}

	toasts.set(props, true);

	setTimeout(() => removeToast(props), timeout);

	ReactDOM.render(
		<Toasts />,
		$node,
	);
}

function removeToast(props) {

	toasts.delete(props);

	if (toasts.size) {
		ReactDOM.render(
			<Toasts />,
			$node,
		);
	} else {
		ReactDOM.unmountComponentAtNode($node);
	}
}
