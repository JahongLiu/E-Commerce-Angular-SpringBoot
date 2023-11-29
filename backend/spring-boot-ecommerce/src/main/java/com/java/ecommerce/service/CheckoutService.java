package com.java.ecommerce.service;

import com.java.ecommerce.dto.PaymentInfo;
import com.java.ecommerce.dto.Purchase;
import com.java.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;

}
