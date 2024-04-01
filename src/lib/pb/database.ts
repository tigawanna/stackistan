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
// ==== start of stackistan_users block =====


export interface StackistanUsersResponse extends AuthCollectionResponse {
	collectionName: 'stackistan_users';
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
	type: 'auth';
	collectionId: string;
	collectionName: 'stackistan_users';
	response: StackistanUsersResponse;
	create: StackistanUsersCreate;
	update: StackistanUsersUpdate;
	relations: {
		'stackistan_resume_profile(user)': StackistanResumeProfileCollection[];
		'stackistan_job_application(user)': StackistanJobApplicationCollection[];
	};
}

// ==== end of stackistan_users block =====

// ==== start of stackistan_resume_profile block =====


export interface StackistanResumeProfileResponse extends BaseCollectionResponse {
	collectionName: 'stackistan_resume_profile';
	user: string;
	type: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'gamedev' | 'data' | 'devops' | 'other' | 'general';
	experience: Array<string>;
	education: Array<string>;
	projects: Array<string>;
	skills: any;
	other: any;
	config: any;
}

export interface StackistanResumeProfileCreate extends BaseCollectionCreate {
	user: string;
	type: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'gamedev' | 'data' | 'devops' | 'other' | 'general';
	experience?: MaybeArray<string>;
	education?: MaybeArray<string>;
	projects?: MaybeArray<string>;
	skills?: any;
	other?: any;
	config?: any;
}

export interface StackistanResumeProfileUpdate extends BaseCollectionUpdate {
	user?: string;
	type?: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'gamedev' | 'data' | 'devops' | 'other' | 'general';
	experience?: MaybeArray<string>;
	'experience+'?: MaybeArray<string>;
	'experience-'?: MaybeArray<string>;
	education?: MaybeArray<string>;
	'education+'?: MaybeArray<string>;
	'education-'?: MaybeArray<string>;
	projects?: MaybeArray<string>;
	'projects+'?: MaybeArray<string>;
	'projects-'?: MaybeArray<string>;
	skills?: any;
	other?: any;
	config?: any;
}

export interface StackistanResumeProfileCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'stackistan_resume_profile';
	response: StackistanResumeProfileResponse;
	create: StackistanResumeProfileCreate;
	update: StackistanResumeProfileUpdate;
	relations: {
		user: StackistanUsersCollection;
		experience: StackistanJobExperienceCollection[];
		education: StackistanUserEducationCollection[];
		projects: StackistanUserProjectsCollection[];
		'stackistan_job_application(resume_details)': StackistanJobApplicationCollection[];
	};
}

// ==== end of stackistan_resume_profile block =====

// ==== start of stackistan_job_application block =====


export interface StackistanJobApplicationResponse extends BaseCollectionResponse {
	collectionName: 'stackistan_job_application';
	user: string;
	posting: string;
	resume_details: string;
	resume: string;
	cover_letter: string;
	status: '' | 'applied' | 'rejected' | 'accepted';
}

export interface StackistanJobApplicationCreate extends BaseCollectionCreate {
	user: string;
	posting: string;
	resume_details: string;
	resume: string;
	cover_letter?: string;
	status?: '' | 'applied' | 'rejected' | 'accepted';
}

export interface StackistanJobApplicationUpdate extends BaseCollectionUpdate {
	user?: string;
	posting?: string;
	resume_details?: string;
	resume?: string;
	cover_letter?: string;
	status?: '' | 'applied' | 'rejected' | 'accepted';
}

export interface StackistanJobApplicationCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'stackistan_job_application';
	response: StackistanJobApplicationResponse;
	create: StackistanJobApplicationCreate;
	update: StackistanJobApplicationUpdate;
	relations: {
		user: StackistanUsersCollection;
		posting: StackistanJobPostingsCollection;
		resume_details: StackistanResumeProfileCollection;
		'stackistan_job_experience(job)': StackistanJobExperienceCollection[];
	};
}

// ==== end of stackistan_job_application block =====

// ==== start of stackistan_companies block =====


export interface StackistanCompaniesResponse extends BaseCollectionResponse {
	collectionName: 'stackistan_companies';
	name: string;
	website: string;
	location: string;
	tech_stack: string;
	industry: '' | 'Education' | 'Research' | 'Construction' | 'Design' | 'Accounting' | 'EnvironmentalServices' | 'HumanResources' | 'Consulting' | 'Trading' | 'EnergyMining' | 'Manufacturing' | 'Automotive' | 'AviationAerospace' | 'Chemicals' | 'FoodProduction' | 'Healthcare' | 'Finance' | 'Hospitality' | 'Sports' | 'ArtsEntertainment' | 'RealEstate' | 'Legal' | 'ConsumerGoods' | 'Agriculture' | 'MediaCommunications' | 'SoftwareITServices' | 'TransportationLogistics';
	verified: '' | 'yes' | 'no';
}

export interface StackistanCompaniesCreate extends BaseCollectionCreate {
	name?: string;
	website?: string | URL;
	location?: string;
	tech_stack?: string;
	industry?: '' | 'Education' | 'Research' | 'Construction' | 'Design' | 'Accounting' | 'EnvironmentalServices' | 'HumanResources' | 'Consulting' | 'Trading' | 'EnergyMining' | 'Manufacturing' | 'Automotive' | 'AviationAerospace' | 'Chemicals' | 'FoodProduction' | 'Healthcare' | 'Finance' | 'Hospitality' | 'Sports' | 'ArtsEntertainment' | 'RealEstate' | 'Legal' | 'ConsumerGoods' | 'Agriculture' | 'MediaCommunications' | 'SoftwareITServices' | 'TransportationLogistics';
	verified?: '' | 'yes' | 'no';
}

export interface StackistanCompaniesUpdate extends BaseCollectionUpdate {
	name?: string;
	website?: string | URL;
	location?: string;
	tech_stack?: string;
	industry?: '' | 'Education' | 'Research' | 'Construction' | 'Design' | 'Accounting' | 'EnvironmentalServices' | 'HumanResources' | 'Consulting' | 'Trading' | 'EnergyMining' | 'Manufacturing' | 'Automotive' | 'AviationAerospace' | 'Chemicals' | 'FoodProduction' | 'Healthcare' | 'Finance' | 'Hospitality' | 'Sports' | 'ArtsEntertainment' | 'RealEstate' | 'Legal' | 'ConsumerGoods' | 'Agriculture' | 'MediaCommunications' | 'SoftwareITServices' | 'TransportationLogistics';
	verified?: '' | 'yes' | 'no';
}

export interface StackistanCompaniesCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'stackistan_companies';
	response: StackistanCompaniesResponse;
	create: StackistanCompaniesCreate;
	update: StackistanCompaniesUpdate;
	relations: {
		'stackistan_job_postings(company)': StackistanJobPostingsCollection[];
		'stackistan_job_experience(company)': StackistanJobExperienceCollection[];
	};
}

// ==== end of stackistan_companies block =====

// ==== start of stackistan_job_postings block =====


export interface StackistanJobPostingsResponse extends BaseCollectionResponse {
	collectionName: 'stackistan_job_postings';
	title: string;
	description: string;
	description_screenshot: string;
	location: string;
	company: string;
	level: '' | 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'other';
	verified: '' | 'yes' | 'no';
}

export interface StackistanJobPostingsCreate extends BaseCollectionCreate {
	title?: string;
	description?: string;
	description_screenshot?: File | null;
	location?: string;
	company?: string;
	level?: '' | 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'other';
	verified?: '' | 'yes' | 'no';
}

export interface StackistanJobPostingsUpdate extends BaseCollectionUpdate {
	title?: string;
	description?: string;
	description_screenshot?: File | null;
	location?: string;
	company?: string;
	level?: '' | 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'other';
	verified?: '' | 'yes' | 'no';
}

export interface StackistanJobPostingsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'stackistan_job_postings';
	response: StackistanJobPostingsResponse;
	create: StackistanJobPostingsCreate;
	update: StackistanJobPostingsUpdate;
	relations: {
		'stackistan_job_application(posting)': StackistanJobApplicationCollection[];
		company: StackistanCompaniesCollection;
	};
}

// ==== end of stackistan_job_postings block =====

// ==== start of stackistan_job_experience block =====


export interface StackistanJobExperienceResponse extends BaseCollectionResponse {
	collectionName: 'stackistan_job_experience';
	company: string;
	job: string;
	achievements: string;
	from: string;
	to: string;
}

export interface StackistanJobExperienceCreate extends BaseCollectionCreate {
	company: string;
	job: string;
	achievements?: string;
	from?: string | Date;
	to?: string | Date;
}

export interface StackistanJobExperienceUpdate extends BaseCollectionUpdate {
	company?: string;
	job?: string;
	achievements?: string;
	from?: string | Date;
	to?: string | Date;
}

export interface StackistanJobExperienceCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'stackistan_job_experience';
	response: StackistanJobExperienceResponse;
	create: StackistanJobExperienceCreate;
	update: StackistanJobExperienceUpdate;
	relations: {
		'stackistan_resume_profile(experience)': StackistanResumeProfileCollection[];
		company: StackistanCompaniesCollection;
		job: StackistanJobApplicationCollection;
	};
}

// ==== end of stackistan_job_experience block =====

// ==== start of stackistan_user_education block =====


export interface StackistanUserEducationResponse extends BaseCollectionResponse {
	collectionName: 'stackistan_user_education';
	school: string;
	field_of_study: string;
	qualification: '' | 'Certificate' | 'Diploma' | 'Bachelors' | 'Masters' | 'PhD';
	from: string;
	to: string;
}

export interface StackistanUserEducationCreate extends BaseCollectionCreate {
	school?: string;
	field_of_study?: string;
	qualification?: '' | 'Certificate' | 'Diploma' | 'Bachelors' | 'Masters' | 'PhD';
	from?: string | Date;
	to?: string | Date;
}

export interface StackistanUserEducationUpdate extends BaseCollectionUpdate {
	school?: string;
	field_of_study?: string;
	qualification?: '' | 'Certificate' | 'Diploma' | 'Bachelors' | 'Masters' | 'PhD';
	from?: string | Date;
	to?: string | Date;
}

export interface StackistanUserEducationCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'stackistan_user_education';
	response: StackistanUserEducationResponse;
	create: StackistanUserEducationCreate;
	update: StackistanUserEducationUpdate;
	relations: {
		'stackistan_resume_profile(education)': StackistanResumeProfileCollection[];
	};
}

// ==== end of stackistan_user_education block =====

// ==== start of stackistan_user_projects block =====


export interface StackistanUserProjectsResponse extends BaseCollectionResponse {
	collectionName: 'stackistan_user_projects';
	name: string;
	description: string;
	link: string;
	tech_stack: Array<string>;
}

export interface StackistanUserProjectsCreate extends BaseCollectionCreate {
	name?: string;
	description?: string;
	link?: string | URL;
	tech_stack?: MaybeArray<string>;
}

export interface StackistanUserProjectsUpdate extends BaseCollectionUpdate {
	name?: string;
	description?: string;
	link?: string | URL;
	tech_stack?: MaybeArray<string>;
	'tech_stack+'?: MaybeArray<string>;
	'tech_stack-'?: MaybeArray<string>;
}

export interface StackistanUserProjectsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'stackistan_user_projects';
	response: StackistanUserProjectsResponse;
	create: StackistanUserProjectsCreate;
	update: StackistanUserProjectsUpdate;
	relations: {
		'stackistan_resume_profile(projects)': StackistanResumeProfileCollection[];
		tech_stack: StackistanTechnologiesCollection[];
	};
}

// ==== end of stackistan_user_projects block =====

// ==== start of stackistan_technologies block =====


export interface StackistanTechnologiesResponse extends BaseCollectionResponse {
	collectionName: 'stackistan_technologies';
	name: string;
	description: string;
	link: string;
	logo: string;
	dependancies: Array<string>;
	verified: '' | 'yes' | 'no';
}

export interface StackistanTechnologiesCreate extends BaseCollectionCreate {
	name?: string;
	description?: string;
	link?: string | URL;
	logo?: File | null;
	dependancies?: MaybeArray<string>;
	verified?: '' | 'yes' | 'no';
}

export interface StackistanTechnologiesUpdate extends BaseCollectionUpdate {
	name?: string;
	description?: string;
	link?: string | URL;
	logo?: File | null;
	dependancies?: MaybeArray<string>;
	'dependancies+'?: MaybeArray<string>;
	'dependancies-'?: MaybeArray<string>;
	verified?: '' | 'yes' | 'no';
}

export interface StackistanTechnologiesCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'stackistan_technologies';
	response: StackistanTechnologiesResponse;
	create: StackistanTechnologiesCreate;
	update: StackistanTechnologiesUpdate;
	relations: {
		'stackistan_user_projects(tech_stack)': StackistanUserProjectsCollection[];
		dependancies: StackistanTechnologiesCollection[];
		'stackistan_technologies(dependancies)': StackistanTechnologiesCollection[];
	};
}

// ==== end of stackistan_technologies block =====

export type Schema = {
	stackistan_users: StackistanUsersCollection;
	stackistan_resume_profile: StackistanResumeProfileCollection;
	stackistan_job_application: StackistanJobApplicationCollection;
	stackistan_companies: StackistanCompaniesCollection;
	stackistan_job_postings: StackistanJobPostingsCollection;
	stackistan_job_experience: StackistanJobExperienceCollection;
	stackistan_user_education: StackistanUserEducationCollection;
	stackistan_user_projects: StackistanUserProjectsCollection;
	stackistan_technologies: StackistanTechnologiesCollection;
};