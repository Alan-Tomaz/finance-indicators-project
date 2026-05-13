import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

/**
 * Authenticate in google services using a service account. This is used to access the Google Sheets API to fetch data from the spreadsheet containing your financial assets.
 * Make sure to set the environment variables GOOGLE_PROJECT_ID, GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY with the credentials of your service account. You can create a service account and download its credentials from the Google Cloud Console. The service account must have access to the spreadsheet you want to fetch data from.
 * Enable the Google Sheets API in your Google Cloud project and share the spreadsheet with the service account email to grant it access.
 * @return {google.auth.GoogleAuth} An authenticated GoogleAuth instance that can be used to access Google APIs.
 */
export const googleAuthentication = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return auth;
  } catch (error) {
    console.log("Error in Google Auth Authentication" + error);
    throw new Error("Error in Google Auth Authentication" + error);
  }
};
