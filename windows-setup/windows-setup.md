# Step 1: Local Machine Install and Setup for Cloud Vibe Code Development on Windows

## Introduction

This step prepares your Windows machine for the rest of the workshop. You will install the local tools needed for development, configure Visual Studio Code for Oracle and GitHub workflows, and validate that your machine is ready before moving on.

> **Estimated Time:** 30-45 minutes

---

### Objectives

In this step, you will:

- Install Git
- Install Visual Studio Code
- Configure the SQL Developer extension in VS Code
- Configure MCP in Cline for the SQL Developer extension
- Sign in to GitHub from VS Code
- Install and configure Oracle Code Assist
- Install and configure Cline
- Install Oracle Instant Client
- Request Oracle Code Assist access in OIM
- Install the OCI CLI
- Optionally install Python and Node.js
- Optionally install Codex

---

### Requirements

Before you begin, make sure you have:

- A Windows machine with local administrator access
- A stable internet connection
- An Oracle account for workshop access
- A GitHub account

---

## Task 1: Install Git

Git is required for cloning repositories, working with branches, and authenticating development workflows.

1. Click **Start**, type **PowerShell**, and then click **Windows PowerShell** or **Terminal** to open it.
2. Check whether Git is already installed:

   ```powershell
   git --version
   ```

3. If Git is not installed, open [git-scm.com](https://git-scm.com/download/win), click the Windows download, and wait for the installer to download.

   ![Git for Windows download page with the Windows install option](./images/git-install-download-page.png)

4. Open the downloaded installer. If Windows shows a **User Account Control** prompt, click **Yes**.

   ![Windows User Account Control prompt for the Git installer](./images/git-install-uac-prompt.png)

5. Continue through the Git Setup wizard. On the license screen, click **Next**.

   ![Git Setup showing the GNU General Public License information screen](./images/git-install-license-screen.png)

6. On the **Select Components** screen check **Add a Git Bash Profile to Windows Terminal**, keep the recommended options unless your environment requires something different, and then click **Next**.

   ![Git Setup Select Components screen on Windows](./images/git-install-select-components.png)

7. Continue clicking **Next** through the remaining setup screens, click **Install**, check **Launch Git Bash** and then click **Finish** to complete the Git Setup wizard.

   ![Git Setup showing the Completing the Git Setup Wizard screen](./images/git-install-complete-setup-wizard.png)

8. Verify the installation:

   ```powershell
   git --version
   ```

   ![Git Bash terminal showing the git --version output after installation](./images/git-install-version-check-terminal.png)

---

## Task 2: Install Visual Studio Code

1. Open [code.visualstudio.com](https://code.visualstudio.com/download) in your browser and click the Windows download for Visual Studio Code.

   ![Visual Studio Code download page showing the Windows installer option](./images/vscode-install-download-page.png)

2. Open the downloaded installer, select **I accept the agreement**, and then click **Next**.

   ![Visual Studio Code installer showing the license agreement screen](./images/vscode-install-license-agreement.png)

3. On the **Select Additional Tasks** screen, check the options you want, such as **Add to PATH** and Windows Explorer context menu entries, and then click **Next**.

   ![Visual Studio Code installer showing the Select Additional Tasks screen](./images/vscode-install-select-additional-tasks.png)

4. On the **Ready to Install** screen, click **Install**.

   ![Visual Studio Code installer showing the Ready to Install screen](./images/vscode-install-ready-to-install.png)

5. When the installation finishes, leave **Launch Visual Studio Code** checked and click **Finish**.

   ![Visual Studio Code Setup Wizard completion screen with Launch Visual Studio Code selected](./images/vscode-install-completion-screen.png)

6. If VS Code does not open automatically, click **Start**, type **Visual Studio Code**, and click the app.

   ![Visual Studio Code first-launch welcome screen after installation](./images/vscode-first-launch-welcome-screen.png)

7. Optionally right-click the Visual Studio Code icon on the taskbar and select **Pin to taskbar** for quick access.

---

## Task 3: Sign in to GitHub from VS Code

1. Open VS Code.
2. Click the **Accounts** icon on the left side of VS Code, and then click **Sign In**.

   ![Clicking the VS Code Accounts icon and selecting Sign In](./images/vscode-accounts-sign-in-icon.png)

3. Select **Sign in with GitHub**.

   ![Choosing Sign In and selecting Sign in with GitHub](./images/sign-in-with-github.png)

4. In the browser window that opens, complete the GitHub sign-in and authorization flow.

   ![Completing the browser-based GitHub sign-in flow](./images/browser-github-sign-in.png)

5. Return to VS Code and click **Open** or **Continue** if VS Code prompts you to complete the sign-in.

6. Confirm that your GitHub account is connected in the **Accounts** menu.

This sign-in is useful for source control workflows and for tools that integrate with GitHub from inside the IDE.

---

## Task 4: Install the SQL Developer Extension in VS Code

1. In VS Code, click **Extensions** in the left-hand panel, search for **Oracle SQL Developer Extension**, and then click **Install** on the Oracle SQL Developer extension page.

   ![VS Code Extensions view showing the Oracle SQL Developer extension install page](./images/sql-developer-extension-install-page.png)

2. If prompted, trust the publisher and continue the installation.

   ![VS Code Trust the publisher prompt for the Oracle SQL Developer extension](./images/sql-developer-extension-trust-publisher.png)

3. Verify that the extension appears in the Extensions panel.

---

## Task 5: Request Oracle Code Assist Access in OIM

1. Sign in to [Oracle Identity Manager (OIM)](https://oim.oraclecorp.com/identity/faces/home).
2. Click **Request Access**, and then click **Request for Self**.
   ![Oracle Identity Manager request access page with the Request for Self option](./images/oim-request-access-request-for-self.png)
3. Click **Catalog**, click the search field, and search for the correct entitlement string listed in Section 3. Use the exact entitlement name from that section, or the request will not be approved.
   ![Oracle Identity Manager catalog search showing the entitlement lookup field](./images/oim-catalog-entitlement-search.png)
4. On the matching entitlement, click **Add to Cart**.
5. Click **Next**.
6. Enter your justification, click **Update**, and then click **Submit**.
7. Wait for manager approval.
8. After approval, allow about 15 minutes for the entitlement to become active.

---

## Task 6: Install Cline, Configure Oracle Code Assist and SQLcl MCP

1. Click **Extensions** in the left-hand panel, search for **Cline**, and then click **Install**.

   ![VS Code Extensions view showing the Cline extension install page](./images/cline-extension-install-page.png)

2. In VS Code, click **Install**. If prompted, click **Trust Publisher & Install** to continue.

   ![VS Code Trust Publisher and Install dialog for the Cline extension](./images/cline-extension-trust-publisher.png)

3. Open the **Cline** panel in VS Code by clicking the **Cline** icon in the Activity Bar. In the Cline panel, click **Settings**, choose **Oracle Code Assist** as API Provider, check **I'm an Oracle Employee**, and then click **Sign in with Oracle Code Assist**.

   ![Configuring Oracle Code Assist in the Cline panel](./images/configure-oracle-code-assist.png)

4. After sign-in completes, click the model selector and choose the LLM model that you want to use.

   ![Selecting the LLM model after Oracle Code Assist sign-in](./images/choose-llm-model.png)

5. Press **Ctrl+Shift+P** in VS Code to open the Command Palette.

   ![Opening the Command Palette and searching for Configure Cline SQLcl MCP](./images/cline-command-palette-configure-sqlcl-mcp.png)

6. Search for **Configure Cline SQLcl MCP** and open it.

7. In the Cline panel, open the MCP configuration area.

   ![Opening the Cline MCP configuration area](./images/cline-mcp-configuration.png)

8. Review or enable the SQLcl - SQL Developer MCP configuration so that Cline can work with the SQL Developer extension.

   ![Cline MCP settings showing the SQLcl - SQL Developer configuration](./images/cline-sqlcl-mcp-settings.png)

9. Save the configuration.
10. Restart VS Code if required.
11. Verify that Cline can see and use the SQL Developer tooling.

---

## Task 7: Install Oracle Instant Client

Oracle Instant Client is required for tools and extensions that depend on Oracle client libraries.

1. Open Oracle's Instant Client download page for Windows: [Oracle Instant Client Downloads](https://www.oracle.com/database/technologies/instant-client/downloads.html).

   ![Oracle Instant Client download page for Microsoft Windows](./images/instant-client-download-page.png)

2. Download the package you need, such as the Basic package for Windows. Review the installation steps on the download page and choose the correct Windows package for your environment.

   ![Oracle Instant Client download page showing the Windows x64 Basic Package and installation steps](./images/instant-client-basic-package-download.png)

3. In File Explorer, right-click the downloaded ZIP file, click **Extract All...**, choose the destination folder, and then click **Extract**.

   ![Windows Extract Compressed Zipped Folders dialog for the Oracle Instant Client package](./images/instant-client-extract-zipped-folder.png)

4. Open the extracted Instant Client folder. To copy the full folder path, right-click the `instantclient_...` folder and then click **Copy as path**.

   ![Windows File Explorer showing the extracted Oracle Instant Client folder](./images/instant-client-extracted-folder.png)

5. If required by your tools, update your Windows environment variables so the Instant Client path is available. Click **Start**, type **environment variables**, and open that result.

   ![Windows Start search showing Edit environment variables for your account](./images/windows-edit-environment-variables-search.png)

6. In **System Properties**, open the **Advanced** tab and click **Environment Variables...**.

   ![System Properties Advanced tab showing the Environment Variables button](./images/system-properties-advanced-environment-variables.png)

7. In the **Environment Variables** window, select **Path** under your user variables and click **Edit**.

   ![Environment Variables window showing the Path variable selected](./images/environment-variables-path-window.png)

8. In the **Edit environment variable** window, click **New**, paste the Instant Client folder path, and then click **OK** on each open window.

   ![Edit environment variable window showing the Oracle Instant Client path being added](./images/environment-variables-add-instant-client-path.png)

9. Open a new terminal session after making environment variable changes.
10. Verify the client files are present in the install directory.

---

## Task 8: Install OCI CLI

1. Open this [link](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm#InstallingCLI__windows) for the Windows setup instructions for OCI CLI.

   ![Oracle documentation page showing the Windows OCI CLI installer instructions](./images/oci-cli-windows-install-docs-page.png)

2. Open the OCI CLI installation instructions for Windows in the Oracle documentation and download the Windows installer package you want to use. We used the MSI installer, so click the [GitHub](https://github.com/oracle/oci-cli/releases) release page and download **oci-cli-3.78.0-Windows-Server-Installer.msi**.

   ![GitHub Releases assets list showing OCI CLI Windows installer download options](./images/oci-cli-download-assets-page.png)

3. Open the downloaded installer. If Windows shows a **User Account Control** prompt, click **Yes**.

   ![Windows User Account Control prompt for the OCI CLI installer package](./images/oci-cli-installer-uac-prompt.png)

4. In the installer, review the destination directory and continue through the setup wizard.

   ![OCI CLI setup window showing the Select destination directory step](./images/oci-cli-select-destination-directory.png)

5. When the installation completes, click **Finish**.

   ![OCI CLI installer completion screen](./images/oci-cli-installer-completion-screen.png)

6. Verify the installation:

   ```powershell
   oci --version
   ```

   ![Windows PowerShell showing the OCI CLI version check output](./images/oci-cli-version-check-terminal.png)

7. If needed, run the OCI CLI setup command:

   ```powershell
   oci setup config
   ```

8. Press **Enter** to accept the default config file location if it is correct, and then follow the prompts to enter your OCI tenancy details.

---

## Task 9: Optional - Install Core Programming Languages

Install these if they are not already available on your machine.

### Python

1. Check whether Python 3 is already installed:

   ```powershell
   python --version
   ```

2. If Python is not installed, download it from [python.org](https://www.python.org/downloads/windows/) or install it using your preferred Windows package manager.

   ![Python.org Windows downloads page showing the Python installer downloaded](./images/python-download-page-installer-downloaded.png)

3. Open **File Explorer** and go to **Downloads**. Right-click the Python installer and click **Run as administrator** if that option is available. If Windows shows a **User Account Control** prompt, click **Yes**.

   ![File Explorer Downloads folder showing the Python installer selected with Run as administrator in the context menu](./images/python-installer-run-as-administrator.png)

   ![Windows User Account Control prompt for the Python installer](./images/python-installer-uac-prompt.png)

4. In the Python installer, check **Add python.exe to PATH** before you click **Install Now** if that option is shown.

   ![Python installer Install Now screen showing the Add python.exe to PATH option](./images/python-installer-install-now-screen.png)

5. When the setup finishes, click **Close**. If you see the option to disable the path length limit, review it and apply it if your environment requires it.

   ![Python setup successful screen on Windows](./images/python-setup-successful-screen.png)

6. Verify the installation:

   ```powershell
   python --version
   pip --version
   ```

   ![Windows PowerShell showing the Python version check after installation](./images/python-version-check-terminal.png)

### Node.js

1. Check your Node.js version:

   ```powershell
   node -v
   ```

2. If needed, install Node.js using the official installer from [nodejs.org](https://nodejs.org/) or your preferred version manager. In the installer, continue through the default setup screens and click **Install**.
3. Confirm that both Node.js and npm are installed:

   ```powershell
   node -v
   npm -v
   ```

<!-- Add Windows screenshots: Python installer, Node installer, version checks -->

---

## Task 10: Optional - Install and Set Up Codex

1. Open the [Codex download page](https://openai.com/codex/) in your browser and click the Windows download option if available.
2. Open the downloaded installer and follow the setup wizard.
3. Open the Oracle Code Assist API key page and click the copy button for the Codex environment setup command or API key details needed for your local setup.
4. In **PowerShell** or another terminal, paste the copied command or credentials, run the Codex setup or login flow, and complete authentication with your Oracle Code Assist API key.
5. Launch Codex and verify that it opens successfully and responds to a prompt.

<!-- Add Windows screenshots: download page, installer, terminal login flow, app ready -->

---

## Validation Checklist

Before moving on, confirm that:

- Git runs from Command Prompt or PowerShell
- VS Code opens correctly
- GitHub is connected in VS Code
- SQL Developer extension is installed
- Cline is installed and opens correctly
- Oracle Code Assist is installed
- Instant Client is available if required by your tooling
- OCI CLI is installed and responds in a terminal
- Optional Python and Node.js installations are available if needed
- Optional Codex installation opens and responds correctly if you chose to install it

---

## Next Steps

Once your Windows machine is ready, continue to the IDE-focused configuration and workshop labs.

---

## Acknowledgements

**Authors**

- **Varun Yadav**, Senior Cloud Engineer, ONA Developer Experience

**Contributors**

- **Cline AI**

**Last Updated By/Date:**

- **Generated for Windows setup draft**, April 2026
