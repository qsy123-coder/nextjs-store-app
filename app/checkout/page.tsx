"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
const CheckoutPage = () => {
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

export default CheckoutPage;
