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

export async function login() {
  try {
    const redirectUrl = Linking.createURL('/'); // Ensure deep linking is correctly set up

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUrl
    );

    if (!response) throw new Error('OAuth URL missing.');

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUrl
    );

    if (browserResult.type !== 'success')
      throw new Error('redirect error User cancelled or login failed.');

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();
    if (!userId || !secret) throw new Error('User cancelled or login failed.');
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error('failed to create a session.');
    return true;
  } catch (e) {
    console.error('Login Error:', e);
    return null;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getUserInfo() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
