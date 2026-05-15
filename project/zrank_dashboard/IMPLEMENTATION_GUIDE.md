# Implementation Guide - Fiori OVP Dashboard for Customer Rank Analysis

## Overview
This document outlines the implementation of a Fiori OVP (Overview Page) dashboard for analyzing customer rank-based revenue and order data using SAP UI5 with analytical cards.

## Project Configuration

### Application Metadata
- **ID**: com.vinatech.zrankdashboard
- **Title**: Phân Tích Hạng Khách Hàng (Customer Rank Analysis)
- **Template**: Analytical List Page V2
- **OData Service**: Z_C_RANK_REVENUE_QUERY_CDS (V2)
- **Service URL**: /sap/opu/odata/sap/Z_C_RANK_REVENUE_QUERY_CDS/
- **Main Entity**: Z_C_RANK_REVENUE_QUERY

## Implemented Features

### 1. Global Smart Filter (Bộ lọc toàn cục)
Located at the top of the page, allows users to filter all charts by:

| Filter Field | Technical Name | Type | Purpose |
|---|---|---|---|
| **Hạng Khách Hàng** | RankId | Dimension | Filter by customer rank category |
| **Năm/Tháng** | InvoiceYearMonth | Dimension | Filter by time period (YYYYMM format) |
| **Tiền Tệ** | Currency | Dimension | Filter by currency code |

**Configuration**: Defined in `annotation.xml` as `UI.SelectionFields`

---

### 2. Revenue Analytics Card (Thẻ biểu đồ 1)
**Title**: Phân Tích Doanh Thu (Revenue Analysis)

#### Chart Configuration:
- **Chart Type**: Stacked Column Chart (UI.ChartType/Column)
- **X-Axis (Category)**: InvoiceYearMonth (consecutive months)
- **Y-Axis (Value/Measure)**: RevenueAmount (total revenue in VND/USD)
- **Series (Color/Dimension)**: RankId (customer rank stratification)
- **Data Point Annotation**: @UI.DataPoint#RevenueAmount

#### Purpose:
Help management visualize:
- Revenue trends across consecutive months
- Which customer rank contributes most to total revenue
- Month-over-month revenue changes by rank category

#### Configuration Reference:
```xml
<Annotation Term="UI.Chart" Qualifier="RevenueChart">
    <!-- Stacked Column showing revenue by month, stratified by rank -->
</Annotation>
```

---

### 3. Order Count Analytics Card (Thẻ biểu đồ 2)
**Title**: Phân Tích Số Lượng Đơn Hàng (Order Count Analysis)

#### Chart Configuration:
- **Chart Type**: Stacked Column Chart (UI.ChartType/Column)
- **X-Axis (Category)**: InvoiceYearMonth (consecutive months)
- **Y-Axis (Value/Measure)**: OrderCount (total invoice count)
- **Series (Color/Dimension)**: RankId (customer rank stratification)
- **Data Point Annotation**: @UI.DataPoint#OrderCount

#### Purpose:
Assess purchasing frequency (volume):
- Show order volume trends across months
- Identify which rank purchases most frequently
- Compare order count vs. revenue (e.g., Silver rank might have high order count but lower revenue than Gold)

#### Configuration Reference:
```xml
<Annotation Term="UI.Chart" Qualifier="OrderCountChart">
    <!-- Stacked Column showing orders by month, stratified by rank -->
</Annotation>
```

---

## Data Model & Fields

### Available Fields from Z_C_RANK_REVENUE_QUERY Entity:

| Field Name | Type | Aggregation Role | Description | Format/Notes |
|---|---|---|---|---|
| **ID** | String | - | Unique key | Primary Key (not filterable) |
| **InvoiceYearMonth** | String (6) | Dimension | Year and Month | Format: YYYYMM (e.g., "202401") |
| **InvoiceMonth** | String (2) | Dimension | Month only | Format: MM (e.g., "01") |
| **RankId** | String (4) | Dimension | Customer Rank | Values: Ranks like "GOLD", "SILVER", etc. |
| **RevenueAmount** | Decimal (42,2) | Measure | Total Revenue | Currency-dependent; use with Currency field |
| **RevenueAmount_F** | String | - | Formatted Revenue | Pre-formatted display value |
| **OrderCount** | Decimal (42,0) | Measure | Number of Orders | Integer count of invoices |
| **OrderCount_F** | String | - | Formatted Order Count | Pre-formatted display value |
| **Currency** | String (5) | Dimension | ISO Currency Code | e.g., "VND", "USD" |
| **TotaledProperties** | String | Annotation | System field | For aggregation metadata |

---

## File Structure & Configuration Files

### Core Files Modified/Created:

#### 1. **webapp/annotations/annotation.xml** ✅
- **Purpose**: Define UI elements, filters, and chart configurations
- **Key Sections**:
  - `UI.SelectionFields`: Filter bar configuration (RankId, InvoiceYearMonth, Currency)
  - `UI.Chart@RevenueChart`: Revenue stacked column chart
  - `UI.Chart@OrderCountChart`: Order count stacked column chart
  - `UI.DataPoint`: Measure definitions and labels
  - Field annotations with Common.Label

#### 2. **webapp/manifest.json** ✅
- **Purpose**: Application configuration and OData binding
- **Key Updates**:
  - ALP component with analytical controls enabled
  - Chart persistence key for state management
  - SmartVariantManagement for variant support
  - Table settings for display preferences

#### 3. **webapp/i18n/i18n.properties** ✅
- **Purpose**: Vietnamese language labels
- **Content**:
  - Application title and description
  - Field labels for all UI elements
  - Chart titles in Vietnamese
  - Error messages and help texts

#### 4. **README.md** ✅
- **Purpose**: Project documentation
- **Updates**: Added feature overview and data field documentation

#### 5. **webapp/index.html** ✓ (No changes needed)
- Already properly configured for component-based loading

#### 6. **webapp/Component.js** ✓ (No changes needed)
- Already extends sap.suite.ui.generic.template.lib.AppComponent

---

## Key OData V2 Vocabulary References

### Used Annotations:
- **UI.SelectionFields**: Defines filter bar fields
- **UI.Chart**: Defines chart visualization with qualifier
  - ChartType: Column (stacked)
  - Dimensions: InvoiceYearMonth, RankId
  - Measures: RevenueAmount, OrderCount
  - MeasureAttributes & DimensionAttributes: Configure chart roles
- **UI.DataPoint**: Defines measure properties and labels
- **Common.Label**: Display labels for fields

### Chart Roles:
- **Category Role**: InvoiceYearMonth (X-axis)
- **Series Role**: RankId (color/stacking dimension)
- **Axis1 Role**: RevenueAmount, OrderCount (Y-axis values)

---

## How to Run & Test

### Prerequisites:
1. Node.js LTS version installed
2. npm version matching Node.js requirements
3. Access to SAP backend OData service (for production)

### Development Mode:

#### With Mock Data (Local Development):
```bash
npm run start-mock
```
This uses local metadata file: `webapp/localService/mainService/metadata.xml`

#### With Live OData Service:
```bash
npm start
```
This connects to the service URL: `/sap/opu/odata/sap/Z_C_RANK_REVENUE_QUERY_CDS/`

### Browser Access:
- Open: `http://localhost:8080` (or your configured port)
- The dashboard will load with the filter bar and two analytical cards

---

## Testing Checklist

### ✅ Filter Bar
- [ ] Filter by RankId displays correct values
- [ ] Filter by InvoiceYearMonth updates time range
- [ ] Multiple filters work together
- [ ] "Go" button applies filters to charts
- [ ] Filter reset clears all selections

### ✅ Revenue Analytics Card
- [ ] Chart displays as stacked column
- [ ] X-axis shows consecutive months
- [ ] Y-axis shows revenue values with currency
- [ ] Different colors represent different ranks
- [ ] Legend shows all ranks
- [ ] Hovering shows data point values
- [ ] Drill-down works if configured

### ✅ Order Count Analytics Card
- [ ] Chart displays as stacked column
- [ ] X-axis shows consecutive months
- [ ] Y-axis shows order count numbers
- [ ] Different colors represent different ranks
- [ ] Legend shows all ranks
- [ ] Hovering shows order count values
- [ ] Chart updates when filters change

### ✅ UI/UX
- [ ] All Vietnamese labels display correctly
- [ ] Charts are responsive on different screen sizes
- [ ] No console errors
- [ ] Performance is acceptable with data volume

---

## Customization & Extension Points

### To Add More Charts:
1. Add new `UI.Chart` annotation with unique Qualifier in `annotation.xml`
2. Add corresponding `UI.DataPoint` annotation for the measure
3. Update manifest if needed to prioritize chart display

### To Add KPI Cards:
1. Define `UI.KPI` annotations (if not using full OVP template)
2. Reference in manifest KPI configurations
3. Update i18n with KPI titles

### To Add Drill-Down Navigation:
1. Add `UI.LineItem` annotation for target entity
2. Configure routing in manifest
3. Define ObjectPage if needed

### To Change Chart Type:
1. Modify `ChartType` EnumMember in `UI.Chart` annotation
  - Options: Column, Bar, Line, Pie, Donut, etc.
2. Restart application

---

## Troubleshooting

### Issue: Charts not displaying
**Solution**: 
- Check annotation.xml for XML syntax errors
- Verify OData service metadata includes the fields
- Ensure UI.SelectionFields and UI.Chart annotations are present
- Check browser console for errors

### Issue: Filter values not populating
**Solution**:
- Verify backend has data for dimension values
- Check RankId has a value list defined in backend
- Ensure OData service returns correct metadata

### Issue: Wrong aggregation in charts
**Solution**:
- Verify `sap:aggregation-role` in metadata (should be "dimension" or "measure")
- Check Dimensions vs Measures in UI.Chart annotation
- Ensure RankId has role="dimension" in metadata

---

## Additional Resources

### SAP Documentation:
- [SAP Fiori Analytical List Page](https://experience.sap.com)
- [UI Annotations Vocabulary](https://github.com/SAP/odata-vocabularies)
- [SAP UI5 Chart Control](https://openui5.hana.ondemand.com)

### Project References:
- **Service Metadata**: `webapp/localService/mainService/metadata.xml`
- **OData Service URL**: `/sap/opu/odata/sap/Z_C_RANK_REVENUE_QUERY_CDS/`
- **OData Version**: V2 (ODataModel)

---

## Support & Maintenance

### Regular Checks:
1. Monitor OData service performance
2. Verify data freshness (backend updates)
3. Update UI5 library versions as needed
4. Test new browser versions

### When Backend Changes:
1. Update local metadata.xml
2. Verify new fields in annotations if added
3. Test filter values for new dimensions
4. Update i18n labels if field names change

---

**Document Version**: 1.0  
**Last Updated**: April 16, 2026  
**Application Status**: Ready for Testing
