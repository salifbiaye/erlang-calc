"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/schemas/auth.schema";
import { EmailField } from "./fields/EmailField";
import { PasswordField } from "./fields/PasswordField";
import { NameField } from "./fields/NameField";
import { Button } from "../ui/button";

export const SignUpForm = () => {
  const login = useAuthStore((state) => state.login);

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // TODO: Call your register API here
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const { token, user } = await response.json();
      login(token, user);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <NameField />
        <EmailField />
        <PasswordField />
        <PasswordField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
        />
        
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </FormProvider>
  );
};
