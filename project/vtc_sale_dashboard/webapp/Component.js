sap.ui.define(
    [
        "sap/ovp/app/Component",
        "sap/ui/model/odata/v2/ODataModel",
        "./ext/controller/DataProcessor"
    ],
    function (Component, ODataModel, DataProcessor) {
        "use strict";

        return Component.extend("com.vinatech.vtcsaledashboard.Component", {
            metadata: {
                manifest: "json"
            },

            init: function () {
                // Hook into ODataModel before calling base init
                // This ensures we catch responses from the backend
                if (ODataModel && !ODataModel.prototype._processSuccessHooked) {
                    const originalProcessSuccess = ODataModel.prototype._processSuccess;

                    ODataModel.prototype._processSuccess = function (oRequest, oResponse, fnSuccess, mMapping, oETagServer, bMerge) {
                        try {
                            const uri = (oRequest && (oRequest.requestUri || oRequest.url)) || "";
                            // Check if this response is for our revenue compare entity
                            if (uri.includes("ZC_OVP_REV_COMPARE")) {
                                if (oResponse && oResponse.data && oResponse.data.results) {
                                    // Process to fill missing months
                                    oResponse.data.results = DataProcessor.fillMissingMonths(oResponse.data.results);
                                }
                            }
                        } catch (e) {
                            console.warn("Error processing missing months:", e);
                        }

                        // Call the original success processor with our modified data
                        return originalProcessSuccess.apply(this, arguments);
                    };

                    ODataModel.prototype._processSuccessHooked = true;
                    console.log("vtc_sale_dashboard: Successfully hooked ODataModel._processSuccess in Component.js!");
                }

                // call the base component's init function
                Component.prototype.init.apply(this, arguments);
            }
        });
    }
);