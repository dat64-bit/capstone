## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Thu Apr 16 2026 22:42:26 GMT+0700 (Indochina Time)|
|**App Generator**<br>SAP Fiori Application Generator|
|**App Generator Version**<br>1.20.1|
|**Generation Platform**<br>Visual Studio Code|
|**Template Used**<br>Analytical List Page V2|
|**Service Type**<br>OData URL|
|**Service URL**<br>https://s35lp1.ucc.cit.tum.de:8100/sap/opu/odata/sap/Z_C_RANK_REVENUE_QUERY_CDS/|
|**Module Name**<br>zrank_dashboard|
|**Application Title**<br>Phân Tích Hạng Khách Hàng|
|**Namespace**<br>com.vinatech|
|**UI5 Theme**<br>sap_horizon|
|**UI5 Version**<br>1.108.33|
|**Enable TypeScript**<br>False|
|**Add Eslint configuration**<br>False|
|**Main Entity**<br>Z_C_RANK_REVENUE_QUERY|

## zrank_dashboard

Dashboard OVP báo cáo doanh thu và đơn hàng.

### Dashboard Overview

This application provides an analytical dashboard for visualizing customer rank-based revenue and order analysis.

#### Features Implemented:

**1. Global Smart Filter (Bộ lọc toàn cục)**
   - Hạng Khách Hàng (Customer Rank) - Primary filter
   - Năm/Tháng (Year/Month) - Date range filter
   - Tiền Tệ (Currency) - Optional currency selection

**2. Revenue Analytics Card (Thẻ biểu đồ 1: Phân tích Doanh thu)**
   - Chart Type: Stacked Column Chart
   - X-Axis: Consecutive months (InvoiceYearMonth)
   - Y-Axis: Total Revenue (VNĐ/USD)
   - Series Dimension: Customer Rank (RankId)
   - Purpose: Visualize revenue trends by month with stratification by customer rank

**3. Order Count Analytics Card (Thẻ biểu đồ 2: Phân tích Số lượng Đơn hàng)**
   - Chart Type: Stacked Column Chart
   - X-Axis: Consecutive months (InvoiceYearMonth)
   - Y-Axis: Order Count (Số lượng hóa đơn)
   - Series Dimension: Customer Rank (RankId)
   - Purpose: Analyze purchasing frequency by month with rank-based breakdown

#### Data Fields Available:
- `InvoiceYearMonth`: YYYYMM format (e.g., 202401)
- `InvoiceMonth`: MM format (e.g., 01)
- `RankId`: Customer rank identifier
- `RevenueAmount`: Total revenue with currency
- `OrderCount`: Number of invoices/orders
- `Currency`: ISO currency code

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  To launch the generated application, run the following from the generated application root folder:

```
    npm start
```

- It is also possible to run the application using mock data that reflects the OData Service URL supplied during application generation.  In order to run the application with Mock Data, run the following from the generated app root folder:

```
    npm run start-mock
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)

### Configuration Files

- **manifest.json**: Application configuration including OData service binding and ALP settings
- **annotations/annotation.xml**: OData annotations for UI elements, filters, and chart configurations
- **i18n/i18n.properties**: Vietnamese language labels and texts
- **localService/mainService/metadata.xml**: Local OData metadata for development

### Deployment Notes

This application uses mock data during development from the local metadata file. For production deployment:
1. Ensure the backend OData service Z_C_RANK_REVENUE_QUERY_CDS is available
2. Update service URL in manifest.json if needed
3. Configure value lists for RankId filter in the backend
4. Test with actual data before production go-live



