"use client";

import { actionFunction } from "@/utils/types";
import React, { useActionState, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
const initalState = {
  message: "",
};
const FormContainer = ({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) => {
  const [state, formAction] = useActionState(action, initalState);

  useEffect(() => {
    if (state.message) {
      toast(state.message);
    }
  }, [state]);
  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
