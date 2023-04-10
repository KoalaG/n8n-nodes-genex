
export type GenexAPIResponse = {
	'soap:Envelope': {
		'soap:Body': {
			[response: string]: {
				[result: string]: GenexResultType
			}
		}
	}
} | null;

export interface BaseResultType {
	ResponseStatusCode: GenexTextType,
	ResponseStatusDescription: GenexTextType,
}

export type GenexResultType =
	GenexGetAccountStatusesResultType
	| GenexServiceDisconnectionReasonResultType
	;

export interface GenexGetAccountStatusesResultType extends BaseResultType {
	AccountStatusData: GenexAccountStatusDataType
}

export interface GenexServiceDisconnectionReasonResultType extends BaseResultType {
	ServiceDisconnectionReasonsData: GenexServiceDisconnectionReasonDataType
}

// Common Types
export type GenexTextType = { _text: string }
export type GenexNumberType = { _text: number }
export type GenexDateType = { _text: string }

// CONFIGURATION RESPONSES

export type GenexServiceDisconnectionReasonDataType = {
	ServiceDisconnectionReason: GenexServiceDisconnectionReasonType | GenexServiceDisconnectionReasonType[]
}

export type GenexServiceDisconnectionReasonType = {
	Code: GenexTextType,
	Reason: GenexTextType,
}

export type GenexCustomerTypeDataType = {
	CustomerType: GenexCustomerTypeType | GenexCustomerTypeType[]
}

export type GenexCustomerTypeType = {
	Code: GenexTextType,
	Description: GenexTextType,
}

export type GenexAccountStatusDataType = {
	AccountStatus: GenexAccountStatusType | GenexAccountStatusType[]
}

export type GenexAccountStatusType = {
	Code: GenexTextType,
	Description: GenexTextType,
}

export type GenexCarrierDataType = {
	Carrier: GenexCarrierType | GenexCarrierType[]
}

export type GenexCarrierType = {
	Code: GenexTextType,
	Name: GenexTextType,
}

export type GenexCustomerListType = {
	Customer: GenexCustomerType | GenexCustomerType[]
}

export type GenexCustomerType = {
	LinkedCustomerNo: GenexNumberType,
	GroupNo: GenexNumberType,
	CustomerType: GenexTextType,
	PlanNo: GenexNumberType,
	CycleNo: GenexNumberType,
	PaymentMethod: GenexTextType,
	AlternateCustomerId: GenexTextType,
	PaymentTermDays: GenexNumberType,
	DPID: GenexTextType,
	DirectDebitProcess: GenexTextType,
	PrimaryContact: any,
	SecondaryContact: any,
	ContactAddress: any,
	Company: any,
	CustomerMarketing: any,
	CustomerTeleMarketing: any,
	CustomerReferral: any,
	CustomerAuthorisation: any,
	CustomerBankAccount: any,
	CustomerCreditCard: any,
	CustomerFlag: any,
	CustomerAccountDetail: any,
	CustomerBillOptions: any,
	CustomerCreditDetails: any,
	CustomerNo: GenexNumberType,
	Services: any,
	AddedByUser: GenexTextType,
	LastModifiedbyUser: GenexTextType,
	AddedOn: GenexDateType,
	ModifiedOn: GenexDateType,
	CancelledOn: GenexDateType,
	CurrentBalance: GenexNumberType,
	OverdueBalance: GenexNumberType,
}

export type GenexServiceListType = {
	Service: GenexServiceType | GenexServiceType[]
}

export type GenexServiceType = {
	ServiceNumber: GenexNumberType,
	Name: GenexTextType,
	Department: GenexTextType,
	TelstraAccNo: GenexTextType,
	PreselectTo: GenexTextType,
	ContactStartDate: GenexDateType,
	ContractEndDate: GenexDateType,
	ExtraInformation: GenexTextType,
	PrimaryServiceNo: GenexTextType,
	Division: GenexTextType,
	UsageType: GenexTextType,
	ServiceRatePlan: GenexNumberType,
	EnableUsageWarning: GenexTextType,
	SpendLevel1: GenexNumberType,
	SpendLevel2: GenexNumberType,
	SpendContactMobile: GenexTextType,
	SpendContactEmail: GenexTextType,
	ServiceConnections: any,
	Address: any,
	CustomerNumber: GenexNumberType,
	SequenceNumber: GenexNumberType,
	ReleasedDate: GenexDateType,
}
