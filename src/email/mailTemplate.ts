/**
 * Generates the HTML template for the error email.
 * @param message The error message to be included in the email
 * @returns The HTML template as a string
 */
export const htmlErrorEmailTemplate = (appName:string, ...args: any[]): string => {
    const currentYear = new Date().getFullYear();
    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error dans ${appName}</title>
    </head>

    <!-- Corps de l'email -->
    <body style="font-family: 'Poppins', Arial, sans-serif">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center" style="padding: 20px;">
                    <table class="content" width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #721414;">
                        <!-- Entête de l'email -->
                        <tr>
                            <td class="header" style="background-color: #721414; padding: 40px; text-align: center; color: white; font-size: 24px;">
                                <h2>Erreur dans ${appName}</h2>
                            </td>
                        </tr>

                        <!-- Contenu de l'email -->
                        <tr>
                            <td style="padding: 0px 40px 0px 40px; text-align: center;">
                                <pre>
                                    ${args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg, null, 2)).join('\n')}
                                </pre>
                            </td>
                        </tr>

                        <!-- Footer de l'email -->
                        <tr>
                            <td class="footer" style="background-color: #333333; padding: 40px; text-align: center; color: white; font-size: 14px;">
                                <span>Copyright © ${currentYear} - </span>
                                <a href="https://florobart.github.io/" target="_blank"><b>Floris Robart</b></a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;
}