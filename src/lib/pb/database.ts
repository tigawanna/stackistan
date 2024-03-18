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
  name: string;
  avatar_url: string;
  bio: string;
  google_access_token: string;
  github_access_token: string;
  cover_image_url: string;
  github_username: string;
  linkedin_username: string;
  city: string;
  country: string;
  phone: string;
  skills: string;
  website: string;
  avatar: string;
  cover_image: string;
}

export interface StackistanUsersCreate extends AuthCollectionCreate {
  name: string;
  avatar_url?: string | URL;
  bio?: string;
  google_access_token?: string;
  github_access_token?: string;
  cover_image_url?: string | URL;
  github_username?: string;
  linkedin_username?: string;
  city?: string;
  country?: string;
  phone?: string;
  skills?: string;
  website?: string | URL;
  avatar?: File | null;
  cover_image?: File | null;
}

export interface StackistanUsersUpdate extends AuthCollectionUpdate {
  name?: string;
  avatar_url?: string | URL;
  bio?: string;
  google_access_token?: string;
  github_access_token?: string;
  cover_image_url?: string | URL;
  github_username?: string;
  linkedin_username?: string;
  city?: string;
  country?: string;
  phone?: string;
  skills?: string;
  website?: string | URL;
  avatar?: File | null;
  cover_image?: File | null;
}

export interface StackistanUsersCollection {
  type: "auth";
  collectionId: string;
  collectionName: "stackistan_users";
  response: StackistanUsersResponse;
  create: StackistanUsersCreate;
  update: StackistanUsersUpdate;
  relations: {
    "stackistan_resume_profile(user)": StackistanResumeProfileCollection[];
    "stackistan_job_application(user)": StackistanJobApplicationCollection[];
  };
}

// ===== stackistan_resume_profile =====

export interface StackistanResumeProfileResponse
  extends BaseCollectionResponse {
  collectionName: "stackistan_resume_profile";
  user: string;
  type:
    | "frontend"
    | "backend"
    | "fullstack"
    | "mobile"
    | "gamedev"
    | "data"
    | "devops"
    | "other";
  education: any;
  experience: any;
  projects: any;
  activities: any;
  other: any;
}

export interface StackistanResumeProfileCreate extends BaseCollectionCreate {
  user: string;
  type:
    | "frontend"
    | "backend"
    | "fullstack"
    | "mobile"
    | "gamedev"
    | "data"
    | "devops"
    | "other";
  education?: any;
  experience?: any;
  projects?: any;
  activities?: any;
  other?: any;
}

export interface StackistanResumeProfileUpdate extends BaseCollectionUpdate {
  user?: string;
  type?:
    | "frontend"
    | "backend"
    | "fullstack"
    | "mobile"
    | "gamedev"
    | "data"
    | "devops"
    | "other";
  education?: any;
  experience?: any;
  projects?: any;
  activities?: any;
  other?: any;
}

export interface StackistanResumeProfileCollection {
  type: "base";
  collectionId: string;
  collectionName: "stackistan_resume_profile";
  response: StackistanResumeProfileResponse;
  create: StackistanResumeProfileCreate;
  update: StackistanResumeProfileUpdate;
  relations: {
    user: StackistanUsersCollection;
    "stackistan_job_application(resume_details)": StackistanJobApplicationCollection[];
  };
}

// ===== stackistan_job_application =====

export interface StackistanJobApplicationResponse
  extends BaseCollectionResponse {
  collectionName: "stackistan_job_application";
  user: string;
  posting: string;
  resume_details: string;
  resume: string;
  cover_letter: string;
}

export interface StackistanJobApplicationCreate extends BaseCollectionCreate {
  user: string;
  posting: string;
  resume_details: string;
  resume: string;
  cover_letter?: string;
}

export interface StackistanJobApplicationUpdate extends BaseCollectionUpdate {
  user?: string;
  posting?: string;
  resume_details?: string;
  resume?: string;
  cover_letter?: string;
}

export interface StackistanJobApplicationCollection {
  type: "base";
  collectionId: string;
  collectionName: "stackistan_job_application";
  response: StackistanJobApplicationResponse;
  create: StackistanJobApplicationCreate;
  update: StackistanJobApplicationUpdate;
  relations: {
    user: StackistanUsersCollection;
    posting: StackistanJobPostingsCollection;
    resume_details: StackistanResumeProfileCollection;
  };
}

// ===== stackistan_companies =====

export interface StackistanCompaniesResponse extends BaseCollectionResponse {
  collectionName: "stackistan_companies";
  name: string;
  field: string;
  website: string;
  tech_stack: any;
  location: string;
}

export interface StackistanCompaniesCreate extends BaseCollectionCreate {
  name?: string;
  field?: string;
  website?: string | URL;
  tech_stack?: any;
  location?: string;
}

export interface StackistanCompaniesUpdate extends BaseCollectionUpdate {
  name?: string;
  field?: string;
  website?: string | URL;
  tech_stack?: any;
  location?: string;
}

export interface StackistanCompaniesCollection {
  type: "base";
  collectionId: string;
  collectionName: "stackistan_companies";
  response: StackistanCompaniesResponse;
  create: StackistanCompaniesCreate;
  update: StackistanCompaniesUpdate;
  relations: {
    "stackistan_job_postings(company)": StackistanJobPostingsCollection[];
  };
}

// ===== stackistan_job_postings =====

export interface StackistanJobPostingsResponse extends BaseCollectionResponse {
  collectionName: "stackistan_job_postings";
  title: string;
  description: string;
  description_screenshot: string;
  location: string;
  company: string;
  level: "" | "entry" | "junior" | "mid" | "senior" | "lead" | "other";
}

export interface StackistanJobPostingsCreate extends BaseCollectionCreate {
  title?: string;
  description?: string;
  description_screenshot?: File | null;
  location?: string;
  company?: string;
  level?: "" | "entry" | "junior" | "mid" | "senior" | "lead" | "other";
}

export interface StackistanJobPostingsUpdate extends BaseCollectionUpdate {
  title?: string;
  description?: string;
  description_screenshot?: File | null;
  location?: string;
  company?: string;
  level?: "" | "entry" | "junior" | "mid" | "senior" | "lead" | "other";
}

export interface StackistanJobPostingsCollection {
  type: "base";
  collectionId: string;
  collectionName: "stackistan_job_postings";
  response: StackistanJobPostingsResponse;
  create: StackistanJobPostingsCreate;
  update: StackistanJobPostingsUpdate;
  relations: {
    "stackistan_job_application(posting)": StackistanJobApplicationCollection[];
    company: StackistanCompaniesCollection;
  };
}

// ===== Schema =====

export type Schema = {
  // pocketbook_user: PocketbookUserCollection;
  // pocketbook_reactions: PocketbookReactionsCollection;
  // mashamba_listings: MashambaListingsCollection;
  // mashamba_owner: MashambaOwnerCollection;
  // utility_staff: UtilityStaffCollection;
  // tasky_tasks: TaskyTasksCollection;
  // tasky_staff_details: TaskyStaffDetailsCollection;
  // pocketbook_notifications: PocketbookNotificationsCollection;
  // utility_shops: UtilityShopsCollection;
  // utility_tenants_base: UtilityTenantsBaseCollection;
  // utility_bills: UtilityBillsCollection;
  // pocketbook_posts: PocketbookPostsCollection;
  // pocketbook_friends: PocketbookFriendsCollection;
  // utility_tenants: UtilityTenantsCollection;
  // pocketbook_friendship: PocketbookFriendshipCollection;
  // mashamba_user: MashambaUserCollection;
  // github_oauth: GithubOauthCollection;
  // shamiri_rick_and_morty_notes: ShamiriRickAndMortyNotesCollection;
  // shamiri_users: ShamiriUsersCollection;
  stackistan_users: StackistanUsersCollection;
  stackistan_resume_profile: StackistanResumeProfileCollection;
  stackistan_job_application: StackistanJobApplicationCollection;
  stackistan_companies: StackistanCompaniesCollection;
  stackistan_job_postings: StackistanJobPostingsCollection;
};
