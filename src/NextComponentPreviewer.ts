
import * as vscode from 'vscode';

export class NextComponentPreviewer implements vscode.WebviewViewProvider {

	public static currentPanel: NextComponentPreviewer | undefined;

	public static readonly viewType = 'componentPreview';

	private _view?: vscode.WebviewView;

	private readonly _panel: vscode.WebviewPanel;

	private readonly _extensionUri: vscode.Uri;

	constructor(
		panel: vscode.WebviewPanel, extensionUri: vscode.Uri
	) {
		this._panel = panel;
		this._extensionUri = extensionUri;

	}
	
	resolveWebviewView(
		webviewView: vscode.WebviewView, 
		context: vscode.WebviewViewResolveContext<unknown>, 
		token: vscode.CancellationToken): void | Thenable<void> 
	{
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this._extensionUri]
		};

		webviewView.webview.html = "<html><body><h1>hello world</h1></body></html>";
	}
	
	public static show(extensionUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;
		
		if (NextComponentPreviewer.currentPanel) {
			NextComponentPreviewer.currentPanel._panel.reveal(column);
			return;
		}

		const panel = vscode.window.createWebviewPanel(
			NextComponentPreviewer.viewType,
			'Component Preview',
			column || vscode.ViewColumn.One,
			{
				enableScripts: true,
				localResourceRoots: [extensionUri]
			}
		);

		panel.webview.html = "<html><body><h1>hello world</h1></body></html>";

		NextComponentPreviewer.currentPanel = new NextComponentPreviewer(panel, extensionUri);
		
	}

	public static showPreview(extensionUri: vscode.Uri, componentUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;
		
		if (NextComponentPreviewer.currentPanel) {
			NextComponentPreviewer.currentPanel._panel.reveal(column);
			return;
		}

		const fileName = componentUri.fsPath.split('/').pop();

		const panel = vscode.window.createWebviewPanel(
			NextComponentPreviewer.viewType,
			`${fileName} Preview`,
			column || vscode.ViewColumn.One,
			{
				enableScripts: true,
				localResourceRoots: [extensionUri]
			}
		);

		panel.webview.html = `<html><body><h1>hello world</h1><code>${fileName}</code></body></html>`;

		NextComponentPreviewer.currentPanel = new NextComponentPreviewer(panel, extensionUri);
	}

}
