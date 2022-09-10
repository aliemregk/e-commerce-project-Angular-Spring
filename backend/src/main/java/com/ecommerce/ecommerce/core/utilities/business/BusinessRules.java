package com.ecommerce.ecommerce.core.utilities.business;

import com.ecommerce.ecommerce.core.utilities.results.dataResults.DataResult;

public class BusinessRules {

    private BusinessRules() {

    }

    public static DataResult<?> Run(DataResult<?> ...funcs) {
        for (DataResult<?> func : funcs) {
            if (!func.isSucceed()) {
                return func;
            }
        }
        return null;
    }
}
