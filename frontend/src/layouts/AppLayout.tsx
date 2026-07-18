import { Outlet } from "react-router-dom";
import SubscriptionPaymentListener from "@/services/SubscriptionPaymentListener";

export function AppLayout() {
  return (
    <>
      <SubscriptionPaymentListener />
      <Outlet />
    </>
  );
}