import { Account, Avatars, Client, OAuthProvider } from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';

export const config = {
  platform: 'com.apps.havenly',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);
console.log('Appwrite Endpoint:', config.endpoint);

export async function login() {
  try {
    const redirectUrl = Linking.createURL('/'); // Ensure deep linking is correctly set up

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUrl
    );
    console.log('OAuth Response:', response, redirectUrl);

    if (!response) throw new Error('OAuth URL missing.');

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUrl
    );
    console.log('Browser Result:', browserResult);

    if (browserResult.type !== 'success')
      throw new Error('User cancelled or login failed.');

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get('secret');
    const userId = url.searchParams.get('userId');
    if (!userId || !secret) throw new Error('User cancelled or login failed.');
    const session = account.createSession(userId, secret);
    if (!session) throw new Error('failed to create a session.');
    return true;
  } catch (e) {
    console.error('Login Error:', e);
    return null;
  }
}
