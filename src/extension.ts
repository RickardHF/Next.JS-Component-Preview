// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { NextComponentPreviewer }  from './NextComponentPreviewer';

const options = {
	canSelectMany: false,
	canSelectFiles: true,
	openLabel: 'Preview Component',
	filters: {
		'nextjsFiles': ['js', 'jsx', 'ts', 'tsx']
	}
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	context.subscriptions.push(
		vscode.commands.registerCommand('nextComponentPreviewer.preview', () => {
			NextComponentPreviewer.show(context.extensionUri);
		}
	));
	
	const openPreviewCommaind = vscode.commands.registerCommand('nextComponentPreviewer.open', (path: vscode.Uri) => {
		NextComponentPreviewer.showPreview(context.extensionUri, path);
	});

	context.subscriptions.push(openPreviewCommaind);

}

// This method is called when your extension is deactivated
export function deactivate() {}
