import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type GenexMap = {
	configuration:
		'GetAccountStatuses' | 'GetAddressTypes' | 'GetAuthorisationTypes' | 'GetCarriers'
		| 'GetChargeTypes' | 'GetContactNoteStatuses' | 'GetContactNoteTypes' | 'GetCountryTypes'
		| 'GetCreditCardAuthorityTypes' | 'GetCreditCardTypes' | 'GetCustomerTypes' | 'GetCycles'
		| 'GetDirectDebitMethods' | 'GetDirectDebitProcessOptions' | 'GetFlagLabels'
		| 'GetGenexUsers' | 'GetGroups' | 'GetOnceOffChargeTariffs' | 'GetProvisioningStatuses'
		| 'GetRatePlans' | 'GetStateTypes' | 'GetStreetTypeSuffixes' | 'GetStreetTypes'
		| 'GetTransactionTypes' | 'GetUsageTypes';
	connection: any;
	customer:
		'SearchCustomers' | 'GetCustomerDetails' |
		'SetExternalSystemReference' | 'GetExternalSystemReference' |
		'UpdateCustomerFlags';
	note: any;
	service:
		'SearchServices' | 'GetCustomerServices' | 'ReleaseService'
		| 'UpdateServiceRatePlan' | 'UpdateServiceName' | 'UpdateServiceExtraInformation'
		| 'UpdateServiceExternalReference' | 'UpdateServiceDivision' | 'UpdateServiceDepartment'
		| 'UpdateServiceContract' | 'UpdateServiceAddress'
		| 'SetServiceDeclaredDate'
		| 'ReleaseServiceWithDisconnectionReason' | 'ReconnectService'
		| 'DisconnectServiceWithDisconnectionReason' | 'DisconnectService'
		;
	statement: any;
	transaction:
		'AddTransaction' | 'GetCustomerTransactions';
};

export type Genex = AllEntities<GenexMap>;


export type GenexConfiguration = Entity<GenexMap, 'configuration'>;
export type GenexConnection = Entity<GenexMap, 'connection'>;
export type GenexCustomer = Entity<GenexMap, 'customer'>;
export type GenexNote = Entity<GenexMap, 'note'>;
export type GenexService = Entity<GenexMap, 'service'>;
export type GenexStatement = Entity<GenexMap, 'statement'>;
export type GenexTransaction = Entity<GenexMap, 'transaction'>;

export type ConfigurationProperties = PropertiesOf<GenexConfiguration>;
export type ConnectionProperties = PropertiesOf<GenexConnection>;
export type CustomerProperties = PropertiesOf<GenexCustomer>;
export type NoteProperties = PropertiesOf<GenexNote>;
export type ServiceProperties = PropertiesOf<GenexService>;
export type StatementProperties = PropertiesOf<GenexStatement>;
export type TransactionProperties = PropertiesOf<GenexTransaction>;


export type PrimaryContactType = {
	Salutation: string,
	FirstName: string,
	MiddleName: string,
	Surname:string,
	Title: string,
	Phone: string,
	Fax: string,
	Email: string,
	AfterHoursPhone: string,
	Mobile: string,
}

export type AddressType = {
	Suburb?: String,
	State?: String,
	Postcode?: string,
	Type?: AddressTypeType["Code"],
	TypeNumber?: number,
	TypeSuffix?: string,
	PropertyName?: string,
	StreetName?: string,
	StreetNumberEnd?: number,
	StreetNumberStart?: number,
	StreetNumberSuffix?: string,
	StreetType?: string,
	StreetTypeSuffix?: string,
}

export type ContactAddressType = AddressType & {
	Country?: string,
}
export type ServiceAddressType = AddressType

export type CompanyType = {
	Name: string,
	ABN: String,
	ACN: String,
	Entity: string,
	GSTFree: boolean,
}

export type CustomerMarketingType = {
	MarketingSource: string,
	ExpectedCallSpend: number,
	TollingStartedDate: Date,
	TollingNationalEstimate: number,
	TollingInternationalEstimate: number,
	TollingF2MEstimate: number,
	TollingLocalEstimate: number,
	TollingInboundEstimate: number,
	PABXProgrammingFlage: boolean,
}

export type CustomerTeleMarketingType = {
	AgentNo: number,
	SaleDate: Date,
	AccountManager: string,
	Telemarketer: string
}

export type CustomerReferralType = {
	CustomerNoReferredBy: number,
	ReferralStartDate: Date,
	CurrentReferralAmount: number,
}

export type CustomerAuthorisationType = {
	InternetAccessFlag: boolean,
	InternetPassword: string,
	AuthorisationType: string,
	AuthorisationNumber: string,
	AuthorisationDOB: Date,
	AccountPassword: string,
}

export type CustomerBankAccountType = {
	BankName: string,
	BankAccountName: string,
	BankBSB: string,
	BankAccountNumber: string,
}

export type CustomerCreditCardType = {
	CreditCardType: string,
	CreditCardNo: string,
	CreditCardExpiry: string,
	CreditCardName: string,
	CreditCardAuthority: string,
}

export type CustomerFlagType = {
	Flag1: boolean,
	Flag2: boolean,
	Flag3: boolean,
	Flag4: boolean,
	Flag5: boolean,
	Flag6: boolean,
	Flag7: boolean,
	Flag8: boolean,
	Flag9: boolean,
}

export type CustomerAccountDetailType = {
	Notes: string,
	ContractStartDate: Date,
	ContractTerm: number,
	AccountStatus: string,
	CreditCategory: string,
	CeilingAmount: number,
}

export type DeliveryMethodType = {
	Print: boolean,
	Email: boolean,
	EmailNotification: boolean,
}

export type CustomerBillOptionsType = {
	DeliveryMethod: DeliveryMethodType,
	ReminderEnabled: boolean,
	ForceBill: boolean,
	PrintItemisatisationToFile: boolean,
	GenerateDepartmentBills: boolean,
	CombinedItemisation: boolean,
}

export type CreditDetailsEmploymentType = {
	StartDate: Date,
	EndDate: Date,
	EmployerName: string,
	Industry: string,
	Position: string,
}

export type CustomerCreditDetailsType = {
	CurrentAddressStartDate: Date,
	PreviousAddress1: {
		Country: string,
		StartDate: Date,
		EndDate: Date,
	},
	PreviousAddress2: {
		StartDate: Date,
		EndDate: Date,
	},
	PreviousAddress3: {
		StartDate: Date,
		EndDate: Date,
	},
	CurrentEmployment: CreditDetailsEmploymentType,
	PreviousEmployment1: CreditDetailsEmploymentType,
	PreviousEmployment2: CreditDetailsEmploymentType,
	PreviousEmployment3: CreditDetailsEmploymentType,
}

export type CustomerType = {
	LinkedCustomerNo: number,
	GroupNo: number,
	CustomerType: string,
	PlanNo: number,
	CycleNo: number,
	PaymentMethod: string,
	AlternateCustomerId: string,
	PaymentTermDays: number,
	DPID: string,
	DirectDebitProcess: string,
	PrimaryContact: PrimaryContactType,
	ContactAddress: ContactAddressType,
	Company: CompanyType,
	CustomerMarketing: CustomerMarketingType,
	CustomerTeleMarketing: CustomerTeleMarketingType,
	CustomerReferral: CustomerReferralType,
	CustomerAuthorisation: CustomerAuthorisationType,
	CustomerBankAccount: CustomerBankAccountType,
	CustomerCreditCard: CustomerCreditCardType,
	CustomerFlag: CustomerFlagType,
	CustomerAccountDetail: CustomerAccountDetailType,
	CustomerBillOptions: CustomerBillOptionsType,
	CustomerCreditDetails?: CustomerCreditDetailsType,
	CustomerNo: number,
	Services?: ServiceType[],
	AddedByUser: string,
	LastModifiedbyUser: string,
	AddedOn: Date,
	ModifiedOn: Date,
	CancelledOn: Date,
	CurrentBalance: number,
	OverdueBalance: number,
}

export type ConnectionBaseType = {
	Carrier: string,
	DeclaredDate: Date,
	DateProvisioned: Date,
	DisconnectionDate: Date,
	StatusChangeDate: Date,
	ServiceStatus: string,
}

export type ServiceType = {
	ServiceNumber: string,
	Name: string,
	Department: string,
	TelstraAccNo: string,
	PreselectTo: string,
	ContractStartDate: Date,
	ContractEndDate: Date,
	ExtraInformation: string,
	PrimaryServiceNo: string,
	LineType: string,
	Division: string,
	UsageType: string,
	ServiceRatePlan: number,
	EnableUsageWarning: boolean,
	SpendLevel1: number,
	SpendLevel2: number,
	SpendContactMobile: string,
	SpendContactEmail: string,
	ServiceConnections: ConnectionBaseType[],
	Address: AddressType,
	CustomerNumber: number,
	SequenceNumber: number,
	ReleasedDate: Date,
}

export type SystemReferenceType = {
	CustomerNumber: number,
	ExternalSystem: string,
	ExternalReference: string | null
}

export type ServiceDisconnectionReasonsType = {
	Code: string,
	Reason: string,
}

export type AccountStatusType = {
	Code: string,
	Description: string,
}

export type CarrierType = {
	Code: string,
	Name: string,
}

export type CycleType = {
	CycleNo: number,
	CycleName: string,
}

export type CountryType = {
	CountryId: string,
	CountryName: string,
}

export type AddressTypeType = {
	Code: string,
	Description: string,
	Type: string,
}

export type StreetTypeType = {
	Type: string,
	Description: string,
}

export type StateTypeType = {
	CountryId: string,
	State: string,
	StateName: string,
}

export type StreetTypeSuffixType = {
	Suffix: string,
	Description: string,
}
