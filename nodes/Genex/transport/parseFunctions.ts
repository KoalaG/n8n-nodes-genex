
import { AddressType, AddressTypeType, CarrierType, CompanyType, ConnectionBaseType, ContactAddressType, CountryType, CreditDetailsEmploymentType, CustomerAccountDetailType, CustomerAuthorisationType, CustomerBankAccountType, CustomerBillOptionsType, CustomerCreditCardType, CustomerCreditDetailsType, CustomerFlagType, CustomerMarketingType, CustomerReferralType, CustomerTeleMarketingType, CustomerType, CycleType, DeliveryMethodType, PrimaryContactType, ServiceDisconnectionReasonsType, ServiceType, StateTypeType, StreetTypeSuffixType, StreetTypeType, SystemReferenceType } from '../actions/Interfaces';
import { GenexAccountStatusDataType, GenexAddressTypeDataType, GenexCarrierDataType, GenexCarrierType, GenexCountryTypeDataType, GenexCustomerListType, GenexCustomerType, GenexCycleDataType, GenexServiceDisconnectionReasonDataType, GenexServiceDisconnectionReasonType, GenexServiceListType, GenexStateTypeDataType, GenexStreetTypeDataType, GenexStreetTypeSuffixDataType, GenexTextType } from './interfaces';


export function parseGeneric(input: any ) : any {

	if (input === undefined) {
		return undefined;
	}

	// {}
	if (!Object.keys(input).length) {
		return undefined;
	}

	// { _attributes: { 'xsi:nil': 'true' } }
	try {
		if(input._attributes['xsi:nil'] === 'true') {
			return null;
		}
	} catch {}

	// { _text: 'value' }
	if (input._text !== undefined) {
		return input._text;
	}

	return input;

}

export function parseValue<T>(
	value: any,
	typeOf: StringConstructor | NumberConstructor | DateConstructor | BooleanConstructor = String,
) : T {

	if (value === undefined) {
		return undefined as any;
	}

	try {
		if(value['_attributes']['xsi:nil'] === 'true') {
			return null as any;
		}
	} catch {}

	if (typeOf === Date) {
		return new Date(value['_text']) as any;
	}

	if (typeOf === Boolean) {
		return (value['_text'] === 'true') as any;
	}

	if (value['_text'] === undefined) {
		return null as any;
	}

	return typeOf(value['_text']) as any;

}

export function parseAddress(address: any) : AddressType | ContactAddressType {
	if (address === undefined) {
		return {} as AddressType | ContactAddressType;
	}
	return {
		State:							parseValue<string>(address.State),
		Postcode:						parseValue<string>(address.Postcode),
		StreetName: 				parseValue<string>(address.StreetName),
		StreetNumberEnd:		parseValue<number>(address.StreetNumberEnd, Number),
		StreetNumberStart:	parseValue<number>(address.StreetNumberStart, Number),
		StreetNumberSuffix:	parseValue<string>(address.StreetNumberSuffix),
		StreetType:					parseValue<string>(address.StreetType),
		StreetTypeSuffix:		parseValue<string>(address.StreetTypeSuffix),
		Suburb:							parseValue<string>(address.Suburb),
		TypeSuffix:					parseValue<string>(address.TypeSuffix),
		Type:								parseValue<string>(address.Type),
		TypeNumber:					parseValue<number>(address.TypeNumber, Number),
		PropertyName:				parseValue<string>(address.PropertyName),
		Country:						address.Country ? parseValue<string>(address.Country) : undefined
	}
}

export function parseConnectionList(
	connectionList: any | any[],
) : ConnectionBaseType[]
{

	const data = Array.isArray(connectionList) ? connectionList : [connectionList];

	return data.filter((e) => e).map((connection: any) : ConnectionBaseType => ({
		Carrier:						parseValue<string>(connection.Carrier),
		DateProvisioned:		parseValue<Date>(connection.DateProvisioned, Date),
		DeclaredDate:				parseValue<Date>(connection.DeclaredDate, Date),
		StatusChangeDate:		parseValue<Date>(connection.StatusChangeDate, Date),
		DisconnectionDate:	parseValue<Date>(connection.DisconnectionDate, Date),
		ServiceStatus:			parseValue<string>(connection.ServiceStatus),
	}));

}

export function parseServiceList(response: GenexServiceListType )
: ServiceType[]
{

	const serviceList = Array.isArray(response.Service) ? response.Service : [ response.Service ];

	return serviceList.filter((e) => e).map((service: any) : ServiceType => ({
		ServiceNumber:			parseValue<string>(service.ServiceNumber),
		Name:								parseValue<string>(service.Name),
		Department:					parseValue<string>(service.Department),
		TelstraAccNo:				parseValue<string>(service.TelstraAccNo),
		Address:						parseAddress(service.Address),
		PreselectTo:				parseValue<string>(service.PreselectTo),
		PrimaryServiceNo: 	parseValue<string>(service.PrimaryServiceNo),
		ContractStartDate: 	parseValue<Date>(service.ContractStartDate, Date),
		ContractEndDate: 		parseValue<Date>(service.ContractEndDate, Date),
		ExtraInformation: 	parseValue<string>(service.ExtraInformation),
		LineType:						parseValue<string>(service.LineType),
		Division:						parseValue<string>(service.Division),
		UsageType:					parseValue<string>(service.UsageType),
		EnableUsageWarning: parseValue<boolean>(service.EnableUsageWarning, Boolean),
		ServiceRatePlan:		parseValue<number>(service.ServiceRatePlan, Number),
		SpendContactEmail: 	parseValue<string>(service.SpendContactEmail),
		SpendContactMobile: parseValue<string>(service.SpendContactMobile),
		SpendLevel1:				parseValue<number>(service.SpendLevel1, Number),
		SpendLevel2:				parseValue<number>(service.SpendLevel2, Number),
		CustomerNumber:			parseValue<number>(service.CustomerNumber, Number),
		SequenceNumber:			parseValue<number>(service.SequenceNumber, Number),
		ReleasedDate:				parseValue<Date>(service.ReleasedDate, Date),
		ServiceConnections: service.ServiceConnections ? parseConnectionList(service.ServiceConnections.ConnectionBase) : [],
	}));

}

export function parseCompany(rawCompany: any) : CompanyType {
	return {
		Name:								parseValue<string>(rawCompany.Name),
		ABN:								parseValue<string>(rawCompany.ABN),
		ACN:								parseValue<string>(rawCompany.ACN),
		Entity:							parseValue<string>(rawCompany.Entity),
		GSTFree:						parseValue<boolean>(rawCompany.GSTFree, Boolean),
	}
}

export function parsePrimaryContact(rawContact: any) : PrimaryContactType {
	return {
		Salutation:					parseValue<string>(rawContact.Salutation),
		FirstName:					parseValue<string>(rawContact.FirstName),
		MiddleName:					parseValue<string>(rawContact.MiddleName),
		Surname:						parseValue<string>(rawContact.Surname),
		Title:							parseValue<string>(rawContact.Title),
		Phone:							parseValue<string>(rawContact.Phone),
		Fax:								parseValue<string>(rawContact.Fax),
		Email:							parseValue<string>(rawContact.Email),
		AfterHoursPhone:		parseValue<string>(rawContact.AfterHoursPhone),
		Mobile:							parseValue<string>(rawContact.Mobile),
	}
}

export function parseCustomerMarketing(rawMarketing: any) : CustomerMarketingType {
	return {
		MarketingSource:							parseValue<string>(rawMarketing.MarketingSource),
		ExpectedCallSpend:						parseValue<number>(rawMarketing.ExpectedCallSpend, Number),
		TollingF2MEstimate:						parseValue<number>(rawMarketing.TollingF2MEstimate, Number),
		TollingInternationalEstimate: parseValue<number>(rawMarketing.TollingInternationalEstimate, Number),
		TollingInboundEstimate:				parseValue<number>(rawMarketing.TollingInboundEstimate, Number),
		TollingLocalEstimate:					parseValue<number>(rawMarketing.TollingLocalEstimate, Number),
		TollingNationalEstimate:			parseValue<number>(rawMarketing.TollingNationalEstimate, Number),
		TollingStartedDate:						parseValue<Date>(rawMarketing.TollingStartedDate, Date),
		PABXProgrammingFlage:					parseValue<boolean>(rawMarketing.PABXProgrammingFlage, Boolean),
	}
}

export function parseCustomerTeleMarketing(rawTeleMarketing: any) : CustomerTeleMarketingType {
	return {
		AgentNo:								parseValue<number>(rawTeleMarketing.AgentNo, Number),
		SaleDate:								parseValue<Date>(rawTeleMarketing.SaleDate, Date),
		AccountManager:					parseValue<string>(rawTeleMarketing.AccountManager),
		Telemarketer:						parseValue<string>(rawTeleMarketing.Telemarketer),
	}
}

export function parseCustomerReferral(rawReferral: any) : CustomerReferralType {
	return {
		CustomerNoReferredBy:		parseValue<number>(rawReferral.CustomerNoReferredBy, Number),
		ReferralStartDate:			parseValue<Date>(rawReferral.ReferralStartDate, Date),
		CurrentReferralAmount:	parseValue<number>(rawReferral.CurrentReferralAmount, Number),
	}
}

export function parseCustomerAuthorisation(rawAuthorisation: any) : CustomerAuthorisationType {
	return {
		InternetAccessFlag:			parseValue<boolean>(rawAuthorisation.InternetAccessFlag, Boolean),
		InternetPassword:				parseValue<string>(rawAuthorisation.InternetPassword),
		AuthorisationType:			parseValue<string>(rawAuthorisation.AuthorisationType),
		AuthorisationNumber:		parseValue<string>(rawAuthorisation.AuthorisationNumber),
		AuthorisationDOB:				parseValue<Date>(rawAuthorisation.AuthorisationDOB, Date),
		AccountPassword:				parseValue<string>(rawAuthorisation.AccountPassword),
	};
}

export function parseCustomerBankAccount(rawBankAccount: any) : CustomerBankAccountType {
	return {
		BankName:								parseValue<string>(rawBankAccount.BankName),
		BankAccountName:				parseValue<string>(rawBankAccount.BankAccountName),
		BankBSB:								parseValue<string>(rawBankAccount.BankBSB),
		BankAccountNumber:			parseValue<string>(rawBankAccount.BankAccountNumber),
	};
}

export function parseCustomerCreditCard(rawCreditCard: any) : CustomerCreditCardType {
	return {
		CreditCardType:					parseValue<string>(rawCreditCard.CreditCardType),
		CreditCardNo:						parseValue<string>(rawCreditCard.CreditCardNo),
		CreditCardExpiry:				parseValue<string>(rawCreditCard.CreditCardExpiry),
		CreditCardName:					parseValue<string>(rawCreditCard.CreditCardName),
		CreditCardAuthority:		parseValue<string>(rawCreditCard.CreditCardAuthority),
	};
}

export function parseCustomerFlags(rawFlags: any) : CustomerFlagType {
	return {
		Flag1:									parseValue<boolean>(rawFlags.Flag1, Boolean),
		Flag2:									parseValue<boolean>(rawFlags.Flag2, Boolean),
		Flag3:									parseValue<boolean>(rawFlags.Flag3, Boolean),
		Flag4:									parseValue<boolean>(rawFlags.Flag4, Boolean),
		Flag5:									parseValue<boolean>(rawFlags.Flag5, Boolean),
		Flag6:									parseValue<boolean>(rawFlags.Flag6, Boolean),
		Flag7:									parseValue<boolean>(rawFlags.Flag7, Boolean),
		Flag8:									parseValue<boolean>(rawFlags.Flag8, Boolean),
		Flag9:									parseValue<boolean>(rawFlags.Flag9, Boolean),
	}
}

export function parseCustomerAccountDetail(rawCustomerDetail: any) : CustomerAccountDetailType {
	return {
		Notes:							parseValue<string>(rawCustomerDetail.Notes),
		ContractStartDate:	parseValue<Date>(rawCustomerDetail.ContractStartDate, Date),
		ContractTerm:				parseValue<number>(rawCustomerDetail.ContractTerm, Number),
		AccountStatus:			parseValue<string>(rawCustomerDetail.AccountStatus),
		CreditCategory:			parseValue<string>(rawCustomerDetail.CreditCategory),
		CeilingAmount:			parseValue<number>(rawCustomerDetail.CeilingAmount, Number),
	}
}

export function parseDeliveryMethod(rawDeliveryMethod: any) : DeliveryMethodType {
	return {
		Print:							parseValue<boolean>(rawDeliveryMethod.Print, Boolean),
		Email:							parseValue<boolean>(rawDeliveryMethod.Email, Boolean),
		EmailNotification:	parseValue<boolean>(rawDeliveryMethod.EmailNotification, Boolean),
	}
}

export function parseCustomerBillOptions(rawBillOptions: any) : CustomerBillOptionsType {
	return {
		DeliveryMethod:				parseDeliveryMethod(rawBillOptions.DeliveryMethod),
		ReminderEnabled:			parseValue<boolean>(rawBillOptions.ReminderEnabled, Boolean),
		ForceBill:						parseValue<boolean>(rawBillOptions.ForceBill, Boolean),
		PrintItemisatisationToFile:	parseValue<boolean>(rawBillOptions.PrintItemisatisationToFile, Boolean),
		GenerateDepartmentBills:	parseValue<boolean>(rawBillOptions.GenerateDepartmentBills, Boolean),
		CombinedItemisation:		parseValue<boolean>(rawBillOptions.CombinedItemisation, Boolean),
	}
}

export function parseCreditDetailsAddress(rawAddress: any) {
	return {
		Country:		parseValue<string>(rawAddress.Country),
		StartDate:	parseValue<Date>(rawAddress.StartDate, Date),
		EndDate:		parseValue<Date>(rawAddress.EndDate, Date),
	}
}

export function parseCreditDetailsEmployment(rawEmployment: any) : CreditDetailsEmploymentType {
	return {
		StartDate:	parseValue<Date>(rawEmployment.StartDate, Date),
		EndDate:		parseValue<Date>(rawEmployment.EndDate, Date),
		EmployerName:	parseValue<string>(rawEmployment.EmployerName),
		Industry:			parseValue<string>(rawEmployment.Industry),
		Position:			parseValue<string>(rawEmployment.Position),
	}
}

export function parseCustomerCreditDetails(rawCreditDetails: any) : CustomerCreditDetailsType | undefined {
	if (!rawCreditDetails) return undefined;
	return {
		CurrentAddressStartDate:	parseValue<Date>(rawCreditDetails.CurrentAddressStartDate, Date),
		PreviousAddress1:         parseCreditDetailsAddress(rawCreditDetails.PreviousAddress1),
		PreviousAddress2:         parseCreditDetailsAddress(rawCreditDetails.PreviousAddress2),
		PreviousAddress3:         parseCreditDetailsAddress(rawCreditDetails.PreviousAddress3),
		CurrentEmployment:				parseCreditDetailsEmployment(rawCreditDetails.CurrentEmployment),
		PreviousEmployment1:			parseCreditDetailsEmployment(rawCreditDetails.PreviousEmployment1),
		PreviousEmployment2:			parseCreditDetailsEmployment(rawCreditDetails.PreviousEmployment2),
		PreviousEmployment3:			parseCreditDetailsEmployment(rawCreditDetails.PreviousEmployment3),
	}
}

export function parseCustomerData(rawCustomer: GenexCustomerType) : CustomerType {
	return {
		LinkedCustomerNo:				parseValue<number>(rawCustomer.LinkedCustomerNo, Number),
		GroupNo:								parseValue<number>(rawCustomer.GroupNo, Number),
		CustomerType:						parseValue<string>(rawCustomer.CustomerType),
		PlanNo:									parseValue<number>(rawCustomer.PlanNo, Number),
		CycleNo:								parseValue<number>(rawCustomer.CycleNo, Number),
		PaymentMethod:					parseValue<string>(rawCustomer.PaymentMethod),
		AlternateCustomerId:		parseValue<string>(rawCustomer.AlternateCustomerId),
		PaymentTermDays:				parseValue<number>(rawCustomer.PaymentTermDays, Number),
		DPID:										parseValue<string>(rawCustomer.DPID),
		DirectDebitProcess:			parseValue<string>(rawCustomer.DirectDebitProcess),
		PrimaryContact:	      	parsePrimaryContact(rawCustomer.PrimaryContact),
		ContactAddress:					parseAddress(rawCustomer.ContactAddress) as ContactAddressType,
		Company:								parseCompany(rawCustomer.Company),
		CustomerMarketing:			parseCustomerMarketing(rawCustomer.CustomerMarketing),
		CustomerTeleMarketing:	parseCustomerTeleMarketing(rawCustomer.CustomerTeleMarketing),
		CustomerReferral:				parseCustomerReferral(rawCustomer.CustomerReferral),
		CustomerAuthorisation:	parseCustomerAuthorisation(rawCustomer.CustomerAuthorisation),
		CustomerBankAccount:		parseCustomerBankAccount(rawCustomer.CustomerBankAccount),
		CustomerCreditCard:			parseCustomerCreditCard(rawCustomer.CustomerCreditCard),
		CustomerFlag:						parseCustomerFlags(rawCustomer.CustomerFlag),
		CustomerAccountDetail:	parseCustomerAccountDetail(rawCustomer.CustomerAccountDetail),
		CustomerBillOptions:		parseCustomerBillOptions(rawCustomer.CustomerBillOptions),
		CustomerCreditDetails:	parseCustomerCreditDetails(rawCustomer.CustomerCreditDetails),
		CustomerNo:							parseValue<number>(rawCustomer.CustomerNo, Number),
		Services:								rawCustomer.Services ? parseServiceList(rawCustomer.Services.Service) : undefined,
		AddedByUser:						parseValue<string>(rawCustomer.AddedByUser),
		LastModifiedbyUser:			parseValue<string>(rawCustomer.LastModifiedbyUser),
		AddedOn:								parseValue<Date>(rawCustomer.AddedOn, Date),
		ModifiedOn:							parseValue<Date>(rawCustomer.ModifiedOn, Date),
		CancelledOn:						parseValue<Date>(rawCustomer.CancelledOn, Date),
		CurrentBalance:					parseValue<number>(rawCustomer.CurrentBalance, Number),
		OverdueBalance:					parseValue<number>(rawCustomer.OverdueBalance, Number),
	}
}

export function parseCustomerList(rawCustomerList: GenexCustomerListType) : CustomerType[] {
	if (!rawCustomerList) return [];
	if (!Array.isArray(rawCustomerList.Customer)) rawCustomerList.Customer = [ rawCustomerList.Customer ];
	return rawCustomerList.Customer.map(parseCustomerData);
}

export function parseSystemReference(rawSystemReference: any)
: SystemReferenceType | null {
	if (!rawSystemReference) return null;
	return {
		CustomerNumber: parseValue<number>(rawSystemReference.CustomerNumber, Number),
		ExternalSystem: parseValue<string>(rawSystemReference.ExternalSystem),
		ExternalReference: parseValue<string>(rawSystemReference.ExternalReference),
	}
}

export function parseServiceDisconnectionReasonsData(
	GenexResponse: GenexServiceDisconnectionReasonDataType
) : ServiceDisconnectionReasonsType[] {

	if(!GenexResponse) return [];

	if(!Array.isArray(GenexResponse.ServiceDisconnectionReason)) {
		GenexResponse.ServiceDisconnectionReason = [GenexResponse.ServiceDisconnectionReason];
	}

	return GenexResponse.ServiceDisconnectionReason
		.map((ServiceDisconnectionReason: GenexServiceDisconnectionReasonType) => ({
			Code: parseValue<string>(ServiceDisconnectionReason.Code),
			Reason: parseValue<string>(ServiceDisconnectionReason.Reason),
		}));

}

export function _parseCodeDescriptionData<T>(
	GenexResponse: { [key: string]: T | T[]}
) : { Code: string, Description: string }[] {

	const returnData: { Code: string, Description: string }[] = [];


	Object.keys(GenexResponse).forEach((key: string) => {

		const raw = GenexResponse[key];
		const list: T[] = Array.isArray(raw) ? raw : [raw];

		(list as { Code: GenexTextType, Description: GenexTextType }[]).forEach((item) => {
			if (item.Code && item.Description) {
				returnData.push({
					Code: parseValue<string>(item.Code),
					Description: parseValue<string>(item.Description),
				})
			}
		});

	});

	return returnData;

}

export const parseAccountStatusData = _parseCodeDescriptionData<GenexAccountStatusDataType>;
export const parseCustomerTypeData = _parseCodeDescriptionData;


export function parseCarrierData(
	GenexResponse: GenexCarrierDataType
) : CarrierType[] {

	if(!GenexResponse) return [];

	if(!Array.isArray(GenexResponse.Carrier)) {
		GenexResponse.Carrier = [GenexResponse.Carrier];
	}

	return GenexResponse.Carrier
		.map((Carrier: GenexCarrierType) => ({
			Code: parseValue<string>(Carrier.Code),
			Name: parseValue<string>(Carrier.Name),
		}));

}

export function parseCycleData(data: GenexCycleDataType) : CycleType[] {

	if(!data) return [];

	data.Cycle = Array.isArray(data.Cycle) ? data.Cycle : [data.Cycle];

	return data.Cycle
		.map((Cycle) => ({
			CycleNo: parseValue<number>(Cycle.CycleNo),
			CycleName: parseValue<string>(Cycle.CycleName),
		}));

}

export function parseCountryTypeData({CountryType: list}: GenexCountryTypeDataType) : CountryType[] {
	list = Array.isArray(list) ? list : [list];
	return list.map((item) => ({
		CountryId: parseValue<string>(item.CountryId),
		CountryName: parseValue<string>(item.CountryName),
	}));
}

export function parseAddressTypeData({AddressType: list}: GenexAddressTypeDataType) : AddressTypeType[] {
	list = Array.isArray(list) ? list : [list];
	return list.map((item) => ({
		Code: parseValue<string>(item.Code),
		Description: parseValue<string>(item.Description),
		Type: parseValue<string>(item.Type),
	}));
}

// GetStreetTypes
export function parseStreetTypeData({StreetType: list}: GenexStreetTypeDataType) : StreetTypeType[] {
	list = Array.isArray(list) ? list : [list];
	return list.map((item) => ({
		Type: parseValue<string>(item.Type),
		Description: parseValue<string>(item.Description),
	}));
}

// GetStreetTypeSuffixes
export function parseStreetTypeSuffixData({StreetTypeSuffix: list}: GenexStreetTypeSuffixDataType) : StreetTypeSuffixType[] {
	list = Array.isArray(list) ? list : [list];
	return list.map((item) => ({
		Suffix: parseValue<string>(item.Suffix),
		Description: parseValue<string>(item.Description),
	}));
}

// GetStateTypes
export function parseStateTypeData({StateType: list}: GenexStateTypeDataType) : StateTypeType[] {
	list = Array.isArray(list) ? list : [list];
	return list.map((item) => ({
		CountryId: parseValue<string>(item.CountryId),
		State: parseValue<string>(item.State),
		StateName: parseValue<string>(item.StateName),
	}));
}
