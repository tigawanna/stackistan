/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
export interface BaseCollectionResponse {
  /**
   * 15 characters string to store as record ID.
   */
  id: string;
  /**
   * Date string representation for the creation date.
   */
  created: string;
  /**
   * Date string representation for the creation date.
   */
  updated: string;
  /**
   * The collection id.
   */
  collectionId: string;
  /**
   * The collection name.
   */
  collectionName: string;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface BaseCollectionCreate {
  /**
   * 15 characters string to store as record ID.
   * If not set, it will be auto generated.
   */
  id?: string;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface BaseCollectionUpdate {}

// https://pocketbase.io/docs/collections/#auth-collection
export interface AuthCollectionResponse extends BaseCollectionResponse {
  /**
   * The username of the auth record.
   */
  username: string;
  /**
   * Auth record email address.
   */
  email: string;
  /**
   * Whether to show/hide the auth record email when fetching the record data.
   */
  emailVisibility: boolean;
  /**
   * Indicates whether the auth record is verified or not.
   */
  verified: boolean;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface AuthCollectionCreate extends BaseCollectionCreate {
  /**
   * The username of the auth record.
   * If not set, it will be auto generated.
   */
  username?: string;
  /**
   * Auth record email address.
   */
  email?: string;
  /**
   * Whether to show/hide the auth record email when fetching the record data.
   */
  emailVisibility?: boolean;
  /**
   * Auth record password.
   */
  password: string;
  /**
   * Auth record password confirmation.
   */
  passwordConfirm: string;
  /**
   * Indicates whether the auth record is verified or not.
   * This field can be set only by admins or auth records with "Manage" access.
   */
  verified?: boolean;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface AuthCollectionUpdate {
  /**
   * The username of the auth record.
   */
  username?: string;
  /**
   * The auth record email address.
   * This field can be updated only by admins or auth records with "Manage" access.
   * Regular accounts can update their email by calling "Request email change".
   */
  email?: string;
  /**
   * Whether to show/hide the auth record email when fetching the record data.
   */
  emailVisibility?: boolean;
  /**
   * Old auth record password.
   * This field is required only when changing the record password. Admins and auth records with "Manage" access can skip this field.
   */
  oldPassword?: string;
  /**
   * New auth record password.
   */
  password?: string;
  /**
   * New auth record password confirmation.
   */
  passwordConfirm?: string;
  /**
   * Indicates whether the auth record is verified or not.
   * This field can be set only by admins or auth records with "Manage" access.
   */
  verified?: boolean;
}

// https://pocketbase.io/docs/collections/#view-collection
export interface ViewCollectionRecord {
  id: string;
}

// utilities

type MaybeArray<T> = T | T[];





// ===== stackistan_users =====

export interface StackistanUsersResponse extends AuthCollectionResponse {
  collectionName: "stackistan_users";
  github_access_token: string;
  google_access_token: string;
  bio?: string;
  website?: string;
  name: string;
  avatar_url: string;
  cover_image_url: string;
  skills?: string;
  github_username: string;
  linkedin_username: string;
  city: string;
  country: string;
  phone: string;
}

export interface StackistanUsersCreate extends AuthCollectionCreate {
  name: string;
  website?: string | URL;
  github_access_token?: string;
  google_access_token?: string;
  bio?: string;
  avatar_url?: string | URL;
  cover_image_url: string | URL;
  skills?: string;
  github_username?: string;
  linkedin_username?: string;
  city?: string;
  country?: string;
  phone?: string;
}

export interface StackistanUsersUpdate extends AuthCollectionUpdate {
  name: string;
  website?: string | URL;
  github_access_token?: string;
  google_access_token?: string;
  bio?: string;
  avatar_url?: string | URL;
  cover_image_url: string | URL;
  skills?: string;
  github_username?: string;
  linkedin_username?: string;
  city?: string;
  country?: string;
  phone?: string;
}

export interface StackistanUsersCollection {
  type: "auth";
  collectionId: string;
  collectionName: "stackistan_users";
  response: StackistanUsersResponse;
  create: StackistanUsersCreate;
  update: StackistanUsersUpdate;
  relations: Record<string, never>;
}

// ===== Schema =====

export type Schema = {
//   pocketbook_user: PocketbookUserCollection;
//   pocketbook_reactions: PocketbookReactionsCollection;
//   mashamba_listings: MashambaListingsCollection;
//   mashamba_owner: MashambaOwnerCollection;
//   utility_staff: UtilityStaffCollection;
//   tasky_tasks: TaskyTasksCollection;
//   tasky_staff_details: TaskyStaffDetailsCollection;
//   pocketbook_notifications: PocketbookNotificationsCollection;
//   utility_shops: UtilityShopsCollection;
//   utility_tenants_base: UtilityTenantsBaseCollection;
//   utility_bills: UtilityBillsCollection;
//   pocketbook_posts: PocketbookPostsCollection;
//   pocketbook_friends: PocketbookFriendsCollection;
//   utility_tenants: UtilityTenantsCollection;
//   pocketbook_friendship: PocketbookFriendshipCollection;
//   mashamba_user: MashambaUserCollection;
//   github_oauth: GithubOauthCollection;
//   shamiri_rick_and_morty_notes: ShamiriRickAndMortyNotesCollection;
//   shamiri_users: ShamiriUsersCollection;
  stackistan_users: StackistanUsersCollection;
};
