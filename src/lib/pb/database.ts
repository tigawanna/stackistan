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

// ===== pocketbook_user =====

export interface PocketbookUserResponse extends AuthCollectionResponse {
	collectionName: 'pocketbook_user';
	avatar: string;
	access_token: string;
	bio: string;
	github_login: string;
	github_avatar: string;
}

export interface PocketbookUserCreate extends AuthCollectionCreate {
	avatar?: string | URL;
	access_token?: string;
	bio?: string;
	github_login?: string;
	github_avatar?: string | URL;
}

export interface PocketbookUserUpdate extends AuthCollectionUpdate {
	avatar?: string | URL;
	access_token?: string;
	bio?: string;
	github_login?: string;
	github_avatar?: string | URL;
}

export interface PocketbookUserCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'pocketbook_user';
	response: PocketbookUserResponse;
	create: PocketbookUserCreate;
	update: PocketbookUserUpdate;
	relations: {
		'pocketbook_reactions(user)': PocketbookReactionsCollection[];
		'pocketbook_posts(user)': PocketbookPostsCollection[];
		'pocketbook_friends(user_a)': PocketbookFriendsCollection[];
		'pocketbook_friends(user_b)': PocketbookFriendsCollection[];
		'pocketbook_friendship(user_a)': PocketbookFriendshipCollection[];
		'pocketbook_friendship(user_b)': PocketbookFriendshipCollection[];
	};
}

// ===== pocketbook_reactions =====

export interface PocketbookReactionsResponse extends BaseCollectionResponse {
	collectionName: 'pocketbook_reactions';
	post: string;
	user: string;
	liked: 'yes' | 'no';
}

export interface PocketbookReactionsCreate extends BaseCollectionCreate {
	post: string;
	user: string;
	liked: 'yes' | 'no';
}

export interface PocketbookReactionsUpdate extends BaseCollectionUpdate {
	post?: string;
	user?: string;
	liked?: 'yes' | 'no';
}

export interface PocketbookReactionsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'pocketbook_reactions';
	response: PocketbookReactionsResponse;
	create: PocketbookReactionsCreate;
	update: PocketbookReactionsUpdate;
	relations: {
		post: PocketbookPostsCollection;
		user: PocketbookUserCollection;
	};
}

// ===== mashamba_listings =====

export interface MashambaListingsResponse extends BaseCollectionResponse {
	collectionName: 'mashamba_listings';
	location: string;
	longitude: number;
	latitude: number;
	images: Array<string>;
	amenities: any;
	owner: string;
	price: number;
	status: 'available' | 'sold';
	type: '' | 'land' | 'house';
	description: string;
	property: any;
}

export interface MashambaListingsCreate extends BaseCollectionCreate {
	location: string;
	longitude?: number;
	latitude?: number;
	images: MaybeArray<File>;
	amenities?: any;
	owner?: string;
	price: number;
	status: 'available' | 'sold';
	type?: '' | 'land' | 'house';
	description?: string;
	property?: any;
}

export interface MashambaListingsUpdate extends BaseCollectionUpdate {
	location?: string;
	longitude?: number;
	'longitude+'?: number;
	'longitude-'?: number;
	latitude?: number;
	'latitude+'?: number;
	'latitude-'?: number;
	images?: MaybeArray<File>;
	'images-'?: string;
	amenities?: any;
	owner?: string;
	price?: number;
	'price+'?: number;
	'price-'?: number;
	status?: 'available' | 'sold';
	type?: '' | 'land' | 'house';
	description?: string;
	property?: any;
}

export interface MashambaListingsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'mashamba_listings';
	response: MashambaListingsResponse;
	create: MashambaListingsCreate;
	update: MashambaListingsUpdate;
	relations: {
		owner: MashambaOwnerCollection;
		'mashamba_user(listings)': MashambaUserCollection[];
	};
}

// ===== mashamba_owner =====

export interface MashambaOwnerResponse extends BaseCollectionResponse {
	collectionName: 'mashamba_owner';
	name: string;
	email: string;
	phone: string;
	location: string;
	image: string;
	whatsapp: string;
}

export interface MashambaOwnerCreate extends BaseCollectionCreate {
	name: string;
	email: string;
	phone: string;
	location: string;
	image: File | null;
	whatsapp?: string;
}

export interface MashambaOwnerUpdate extends BaseCollectionUpdate {
	name?: string;
	email?: string;
	phone?: string;
	location?: string;
	image?: File | null;
	whatsapp?: string;
}

export interface MashambaOwnerCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'mashamba_owner';
	response: MashambaOwnerResponse;
	create: MashambaOwnerCreate;
	update: MashambaOwnerUpdate;
	relations: {
		'mashamba_listings(owner)': MashambaListingsCollection[];
	};
}

// ===== utility_staff =====

export interface UtilityStaffResponse extends AuthCollectionResponse {
	collectionName: 'utility_staff';
	name: string;
	type: 'caretaker' | 'manager' | 'cashier';
	avatar: string;
}

export interface UtilityStaffCreate extends AuthCollectionCreate {
	name: string;
	type: 'caretaker' | 'manager' | 'cashier';
	avatar?: File | null;
}

export interface UtilityStaffUpdate extends AuthCollectionUpdate {
	name?: string;
	type?: 'caretaker' | 'manager' | 'cashier';
	avatar?: File | null;
}

export interface UtilityStaffCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'utility_staff';
	response: UtilityStaffResponse;
	create: UtilityStaffCreate;
	update: UtilityStaffUpdate;
	relations: {
		'tasky_tasks(created_by)': TaskyTasksCollection[];
		'tasky_tasks(updated_by)': TaskyTasksCollection[];
		'tasky_tasks(approved_by)': TaskyTasksCollection[];
		'tasky_tasks(funded_by)': TaskyTasksCollection[];
		'tasky_tasks(marked_completed_by)': TaskyTasksCollection[];
		'tasky_tasks(rejected_by)': TaskyTasksCollection[];
		'tasky_tasks(marked_in_progress_by)': TaskyTasksCollection[];
		'tasky_staff_details(leave_requested_by)': TaskyStaffDetailsCollection[];
		'tasky_staff_details(leave_approved_by)': TaskyStaffDetailsCollection[];
	};
}

// ===== tasky_tasks =====

export interface TaskyTasksResponse extends BaseCollectionResponse {
	collectionName: 'tasky_tasks';
	title: string;
	description: string;
	type: 'todo' | 'repairs' | 'maintenance' | 'recurring' | 'other';
	status: 'created' | 'approved' | 'funded' | 'in_progress' | 'completed' | 'rejected';
	created_by: string;
	updated_by: string;
	approved_by: string;
	funded_by: string;
	marked_completed_by: string;
	approved_on: string;
	funded_on: string;
	completed_on: string;
	quotation: string;
	deadline: string;
	frequency: '' | 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	rejected_by: string;
	marked_in_progress_by: string;
	rejected_on: string;
	marked_in_progress_on: string;
}

export interface TaskyTasksCreate extends BaseCollectionCreate {
	title: string;
	description: string;
	type: 'todo' | 'repairs' | 'maintenance' | 'recurring' | 'other';
	status: 'created' | 'approved' | 'funded' | 'in_progress' | 'completed' | 'rejected';
	created_by: string;
	updated_by?: string;
	approved_by?: string;
	funded_by?: string;
	marked_completed_by?: string;
	approved_on?: string | Date;
	funded_on?: string | Date;
	completed_on?: string | Date;
	quotation?: string | URL;
	deadline?: string | Date;
	frequency?: '' | 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	rejected_by?: string;
	marked_in_progress_by?: string;
	rejected_on?: string | Date;
	marked_in_progress_on?: string | Date;
}

export interface TaskyTasksUpdate extends BaseCollectionUpdate {
	title?: string;
	description?: string;
	type?: 'todo' | 'repairs' | 'maintenance' | 'recurring' | 'other';
	status?: 'created' | 'approved' | 'funded' | 'in_progress' | 'completed' | 'rejected';
	created_by?: string;
	updated_by?: string;
	approved_by?: string;
	funded_by?: string;
	marked_completed_by?: string;
	approved_on?: string | Date;
	funded_on?: string | Date;
	completed_on?: string | Date;
	quotation?: string | URL;
	deadline?: string | Date;
	frequency?: '' | 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	rejected_by?: string;
	marked_in_progress_by?: string;
	rejected_on?: string | Date;
	marked_in_progress_on?: string | Date;
}

export interface TaskyTasksCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'tasky_tasks';
	response: TaskyTasksResponse;
	create: TaskyTasksCreate;
	update: TaskyTasksUpdate;
	relations: {
		created_by: UtilityStaffCollection;
		updated_by: UtilityStaffCollection;
		approved_by: UtilityStaffCollection;
		funded_by: UtilityStaffCollection;
		marked_completed_by: UtilityStaffCollection;
		rejected_by: UtilityStaffCollection;
		marked_in_progress_by: UtilityStaffCollection;
	};
}

// ===== tasky_staff_details =====

export interface TaskyStaffDetailsResponse extends BaseCollectionResponse {
	collectionName: 'tasky_staff_details';
	leave_type: 'sick' | 'annual' | 'maternity' | 'other';
	leave_reason: string;
	leave_start: string;
	leave_end: string;
	leave_requested_by: string;
	leave_approved_by: string;
	leave_request_status: 'pending' | 'approved' | 'rejected';
	remaining_leave_days: number;
	remaining_sick_leave_days: number;
	leave_approved_on: string;
}

export interface TaskyStaffDetailsCreate extends BaseCollectionCreate {
	leave_type: 'sick' | 'annual' | 'maternity' | 'other';
	leave_reason: string;
	leave_start: string | Date;
	leave_end: string | Date;
	leave_requested_by: string;
	leave_approved_by?: string;
	leave_request_status: 'pending' | 'approved' | 'rejected';
	remaining_leave_days: number;
	remaining_sick_leave_days: number;
	leave_approved_on?: string | Date;
}

export interface TaskyStaffDetailsUpdate extends BaseCollectionUpdate {
	leave_type?: 'sick' | 'annual' | 'maternity' | 'other';
	leave_reason?: string;
	leave_start?: string | Date;
	leave_end?: string | Date;
	leave_requested_by?: string;
	leave_approved_by?: string;
	leave_request_status?: 'pending' | 'approved' | 'rejected';
	remaining_leave_days?: number;
	'remaining_leave_days+'?: number;
	'remaining_leave_days-'?: number;
	remaining_sick_leave_days?: number;
	'remaining_sick_leave_days+'?: number;
	'remaining_sick_leave_days-'?: number;
	leave_approved_on?: string | Date;
}

export interface TaskyStaffDetailsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'tasky_staff_details';
	response: TaskyStaffDetailsResponse;
	create: TaskyStaffDetailsCreate;
	update: TaskyStaffDetailsUpdate;
	relations: {
		leave_requested_by: UtilityStaffCollection;
		leave_approved_by: UtilityStaffCollection;
	};
}

// ===== pocketbook_notifications =====

export interface PocketbookNotificationsResponse extends BaseCollectionResponse {
	collectionName: 'pocketbook_notifications';
	name: string;
	message: string;
	item_id: string;
	type: 'like' | 'reply' | 'follow';
}

export interface PocketbookNotificationsCreate extends BaseCollectionCreate {
	name: string;
	message: string;
	item_id?: string;
	type: 'like' | 'reply' | 'follow';
}

export interface PocketbookNotificationsUpdate extends BaseCollectionUpdate {
	name?: string;
	message?: string;
	item_id?: string;
	type?: 'like' | 'reply' | 'follow';
}

export interface PocketbookNotificationsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'pocketbook_notifications';
	response: PocketbookNotificationsResponse;
	create: PocketbookNotificationsCreate;
	update: PocketbookNotificationsUpdate;
	relations: Record<string, never>;
}

// ===== utility_shops =====

export interface UtilityShopsResponse extends BaseCollectionResponse {
	collectionName: 'utility_shops';
	shop_number: string;
	tenant: string;
	utils: '' | 'elec' | 'water' | 'both' | 'none';
	order: number;
	is_vacant: boolean;
}

export interface UtilityShopsCreate extends BaseCollectionCreate {
	shop_number: string;
	tenant?: string;
	utils?: '' | 'elec' | 'water' | 'both' | 'none';
	order?: number;
	is_vacant?: boolean;
}

export interface UtilityShopsUpdate extends BaseCollectionUpdate {
	shop_number?: string;
	tenant?: string;
	utils?: '' | 'elec' | 'water' | 'both' | 'none';
	order?: number;
	'order+'?: number;
	'order-'?: number;
	is_vacant?: boolean;
}

export interface UtilityShopsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'utility_shops';
	response: UtilityShopsResponse;
	create: UtilityShopsCreate;
	update: UtilityShopsUpdate;
	relations: {
		tenant: UtilityTenantsCollection;
		'utility_bills(shop)': UtilityBillsCollection[];
	};
}

// ===== utility_tenants_base =====

export interface UtilityTenantsBaseResponse extends BaseCollectionResponse {
	collectionName: 'utility_tenants_base';
	name: string;
	contact: string;
	email: string;
	details: string;
	supa_id: string;
}

export interface UtilityTenantsBaseCreate extends BaseCollectionCreate {
	name: string;
	contact?: string;
	email?: string;
	details?: string;
	supa_id?: string;
}

export interface UtilityTenantsBaseUpdate extends BaseCollectionUpdate {
	name?: string;
	contact?: string;
	email?: string;
	details?: string;
	supa_id?: string;
}

export interface UtilityTenantsBaseCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'utility_tenants_base';
	response: UtilityTenantsBaseResponse;
	create: UtilityTenantsBaseCreate;
	update: UtilityTenantsBaseUpdate;
	relations: Record<string, never>;
}

// ===== utility_bills =====

export interface UtilityBillsResponse extends BaseCollectionResponse {
	collectionName: 'utility_bills';
	shop: string;
	elec_readings: number;
	water_readings: number;
	month: number;
	year: number;
}

export interface UtilityBillsCreate extends BaseCollectionCreate {
	shop: string;
	elec_readings?: number;
	water_readings?: number;
	month: number;
	year: number;
}

export interface UtilityBillsUpdate extends BaseCollectionUpdate {
	shop?: string;
	elec_readings?: number;
	'elec_readings+'?: number;
	'elec_readings-'?: number;
	water_readings?: number;
	'water_readings+'?: number;
	'water_readings-'?: number;
	month?: number;
	'month+'?: number;
	'month-'?: number;
	year?: number;
	'year+'?: number;
	'year-'?: number;
}

export interface UtilityBillsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'utility_bills';
	response: UtilityBillsResponse;
	create: UtilityBillsCreate;
	update: UtilityBillsUpdate;
	relations: {
		shop: UtilityShopsCollection;
	};
}

// ===== pocketbook_posts =====

export interface PocketbookPostsResponse extends BaseCollectionResponse {
	collectionName: 'pocketbook_posts';
	body: string;
	media: string;
	user: string;
	parent: string;
	depth: number;
}

export interface PocketbookPostsCreate extends BaseCollectionCreate {
	body?: string;
	media?: File | null;
	user: string;
	parent?: string;
	depth?: number;
}

export interface PocketbookPostsUpdate extends BaseCollectionUpdate {
	body?: string;
	media?: File | null;
	user?: string;
	parent?: string;
	depth?: number;
	'depth+'?: number;
	'depth-'?: number;
}

export interface PocketbookPostsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'pocketbook_posts';
	response: PocketbookPostsResponse;
	create: PocketbookPostsCreate;
	update: PocketbookPostsUpdate;
	relations: {
		'pocketbook_reactions(post)': PocketbookReactionsCollection[];
		user: PocketbookUserCollection;
		parent: PocketbookPostsCollection;
		'pocketbook_posts(parent)': PocketbookPostsCollection[];
	};
}

// ===== pocketbook_friends =====

export interface PocketbookFriendsResponse extends BaseCollectionResponse {
	collectionName: 'pocketbook_friends';
	user_a: string;
	user_b: string;
	user_a_follow_user_b: '' | 'yes' | 'no';
	user_b_follow_user_a: '' | 'yes' | 'no';
}

export interface PocketbookFriendsCreate extends BaseCollectionCreate {
	user_a?: string;
	user_b?: string;
	user_a_follow_user_b?: '' | 'yes' | 'no';
	user_b_follow_user_a?: '' | 'yes' | 'no';
}

export interface PocketbookFriendsUpdate extends BaseCollectionUpdate {
	user_a?: string;
	user_b?: string;
	user_a_follow_user_b?: '' | 'yes' | 'no';
	user_b_follow_user_a?: '' | 'yes' | 'no';
}

export interface PocketbookFriendsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'pocketbook_friends';
	response: PocketbookFriendsResponse;
	create: PocketbookFriendsCreate;
	update: PocketbookFriendsUpdate;
	relations: {
		user_a: PocketbookUserCollection;
		user_b: PocketbookUserCollection;
	};
}

// ===== utility_tenants =====

export interface UtilityTenantsResponse extends AuthCollectionResponse {
	collectionName: 'utility_tenants';
	phone: string;
	avatar: string;
}

export interface UtilityTenantsCreate extends AuthCollectionCreate {
	phone?: string;
	avatar?: File | null;
}

export interface UtilityTenantsUpdate extends AuthCollectionUpdate {
	phone?: string;
	avatar?: File | null;
}

export interface UtilityTenantsCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'utility_tenants';
	response: UtilityTenantsResponse;
	create: UtilityTenantsCreate;
	update: UtilityTenantsUpdate;
	relations: {
		'utility_shops(tenant)': UtilityShopsCollection[];
	};
}

// ===== pocketbook_friendship =====

export interface PocketbookFriendshipResponse extends BaseCollectionResponse {
	collectionName: 'pocketbook_friendship';
	user_a: string;
	user_b: string;
	user_a_follow_user_b: '' | 'yes' | 'no';
	user_b_follow_user_a: '' | 'yes' | 'no';
	user_a_name: string;
	user_b_name: string;
	user_a_avatar: string;
	user_b_avatar: string;
	user_a_email: string;
	user_b_email: string;
}

export interface PocketbookFriendshipCollection {
	type: 'view';
	collectionId: string;
	collectionName: 'pocketbook_friendship';
	response: PocketbookFriendshipResponse;
	relations: {
		user_a: PocketbookUserCollection;
		user_b: PocketbookUserCollection;
	};
}

// ===== mashamba_user =====

export interface MashambaUserResponse extends AuthCollectionResponse {
	collectionName: 'mashamba_user';
	listings: Array<string>;
}

export interface MashambaUserCreate extends AuthCollectionCreate {
	listings?: MaybeArray<string>;
}

export interface MashambaUserUpdate extends AuthCollectionUpdate {
	listings?: MaybeArray<string>;
	'listings+'?: MaybeArray<string>;
	'listings-'?: MaybeArray<string>;
}

export interface MashambaUserCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'mashamba_user';
	response: MashambaUserResponse;
	create: MashambaUserCreate;
	update: MashambaUserUpdate;
	relations: {
		listings: MashambaListingsCollection[];
	};
}

// ===== github_oauth =====

export interface GithubOauthResponse extends AuthCollectionResponse {
	collectionName: 'github_oauth';
	accessToken: string;
	avatarUrl: string;
}

export interface GithubOauthCreate extends AuthCollectionCreate {
	accessToken?: string;
	avatarUrl?: string | URL;
}

export interface GithubOauthUpdate extends AuthCollectionUpdate {
	accessToken?: string;
	avatarUrl?: string | URL;
}

export interface GithubOauthCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'github_oauth';
	response: GithubOauthResponse;
	create: GithubOauthCreate;
	update: GithubOauthUpdate;
	relations: Record<string, never>;
}

// ===== shamiri_rick_and_morty_notes =====

export interface ShamiriRickAndMortyNotesResponse extends BaseCollectionResponse {
	collectionName: 'shamiri_rick_and_morty_notes';
	character_name: string;
	character_id: string;
	user: string;
	note: string;
	status: '' | 'hidden' | 'visible';
}

export interface ShamiriRickAndMortyNotesCreate extends BaseCollectionCreate {
	character_name: string;
	character_id: string;
	user: string;
	note: string;
	status?: '' | 'hidden' | 'visible';
}

export interface ShamiriRickAndMortyNotesUpdate extends BaseCollectionUpdate {
	character_name?: string;
	character_id?: string;
	user?: string;
	note?: string;
	status?: '' | 'hidden' | 'visible';
}

export interface ShamiriRickAndMortyNotesCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'shamiri_rick_and_morty_notes';
	response: ShamiriRickAndMortyNotesResponse;
	create: ShamiriRickAndMortyNotesCreate;
	update: ShamiriRickAndMortyNotesUpdate;
	relations: {
		user: ShamiriUsersCollection;
	};
}

// ===== shamiri_users =====

export interface ShamiriUsersResponse extends AuthCollectionResponse {
	collectionName: 'shamiri_users';
	avatarUrl: string;
}

export interface ShamiriUsersCreate extends AuthCollectionCreate {
	avatarUrl?: string | URL;
}

export interface ShamiriUsersUpdate extends AuthCollectionUpdate {
	avatarUrl?: string | URL;
}

export interface ShamiriUsersCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'shamiri_users';
	response: ShamiriUsersResponse;
	create: ShamiriUsersCreate;
	update: ShamiriUsersUpdate;
	relations: {
		'shamiri_rick_and_morty_notes(user)': ShamiriRickAndMortyNotesCollection[];
	};
}

// ===== applicate_users =====

export interface ApplicateUsersResponse extends AuthCollectionResponse {
	collectionName: 'applicate_users';
	linkedinAccessToken: string;
	bio: string;
	avatar: string;
}

export interface ApplicateUsersCreate extends AuthCollectionCreate {
	linkedinAccessToken?: string;
	bio?: string;
	avatar?: string | URL;
}

export interface ApplicateUsersUpdate extends AuthCollectionUpdate {
	linkedinAccessToken?: string;
	bio?: string;
	avatar?: string | URL;
}

export interface ApplicateUsersCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'applicate_users';
	response: ApplicateUsersResponse;
	create: ApplicateUsersCreate;
	update: ApplicateUsersUpdate;
	relations: Record<string, never>;
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
	applicate_users: ApplicateUsersCollection;
};
