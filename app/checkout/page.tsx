"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useCallback } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
const CheckoutPageCompoenent = () => {
  const searchParams = useSearchParams();
  const cartId = searchParams?.get("cartId");
  const orderId = searchParams?.get("orderId");

  const fetchClientSecret = useCallback(async () => {
    const response = await axios.post("/api/payment", {
      cartId,
      orderId,
    });
    return response.data.clientSecret;
  }, []);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense>
      <CheckoutPageCompoenent />
    </Suspense>
  );
};

export default CheckoutPage;
