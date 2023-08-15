// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	context.subscriptions.push(
		vscode.commands.registerCommand('nextComponentPreviewer.preview', () => {
			NextComponentPreviewer.show(context.extensionUri);
		}
	));

}

// This method is called when your extension is deactivated
export function deactivate() {}


class NextComponentPreviewer implements vscode.WebviewViewProvider {

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

		NextComponentPreviewer.currentPanel = new NextComponentPreviewer(panel, extensionUri);
		
	}

}