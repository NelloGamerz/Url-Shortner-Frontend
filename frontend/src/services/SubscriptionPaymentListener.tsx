// import { useEffect, useRef, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useAuth } from "@clerk/clerk-react";
// import { fetchEventSource } from "@microsoft/fetch-event-source";
// import { useSubscriptionStore } from "../store/subscriptionStore";

// export default function SubscriptionPaymentListener() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const { getToken } = useAuth();

//   const fetchSubscription = useSubscriptionStore(
//     (state) => state.fetchSubscription,
//   );

//   const [processing, setProcessing] = useState(false);

//   const started = useRef(false);

//   const payment = searchParams.get("payment");

//   useEffect(() => {
//     if (payment !== "success") {
//       return;
//     }

//     // Prevent duplicate SSE in React StrictMode
//     if (started.current) {
//       return;
//     }

//     started.current = true;

//     setProcessing(true);

//     const controller = new AbortController();

//     const startSSE = async () => {
//       console.log("[SSE] Starting subscription listener");

//       try {
//         const token = await getToken();

//         if (!token) {
//           console.error("[SSE] Clerk token missing");

//           return;
//         }

//         await fetchEventSource(
//           `${import.meta.env.VITE_API_BASE_URL}/subscription/events`,
//           {
//             signal: controller.signal,

//             headers: {
//               Authorization: `Bearer ${token}`,
//             },

//             async onopen(response) {
//               console.log("[SSE] Connected", response.status);

//               if (!response.ok) {
//                 throw new Error(`SSE failed: ${response.status}`);
//               }
//             },

//             onmessage(event) {
//               console.log("[SSE] Event:", event.data);

//               if (event.data === "ACTIVE") {
//                 console.log("[SSE] Subscription activated");

//                 controller.abort();

//                 // Redirect immediately
//                 navigate("/dashboard", {
//                   replace: true,
//                 });

//                 // Refresh subscription in background
//                 fetchSubscription()
//                   .then(() => {
//                     console.log("[SSE] Subscription refreshed");
//                   })
//                   .catch((error) => {
//                     console.error("[SSE] Subscription refresh failed", error);
//                   });

//                 return;
//               }

//               if (event.data === "FAILED") {
//                 console.log("[SSE] Subscription failed");

//                 controller.abort();

//                 navigate("/dashboard/billing", {
//                   replace: true,
//                 });
//               }
//             },

//             onerror(error) {
//               console.error("[SSE] Error", error);

//               throw error;
//             },
//           },
//         );
//       } catch (error) {
//         if ((error as Error).name === "AbortError") {
//           console.log("[SSE] Closed");

//           return;
//         }

//         console.error("[SSE] Connection error", error);
//       }
//     };

//     startSSE();

//     return () => {
//       console.log("[SSE] Cleanup");

//       controller.abort();
//     };
//   }, [payment, getToken, fetchSubscription, navigate]);

//   if (processing) {
//     return (
//       <div
//         className="
//         fixed inset-0
//         z-[9999]
//         flex
//         flex-col
//         items-center
//         justify-center
//         bg-white
//         dark:bg-slate-950
//         "
//       >
//         <div
//           className="
//           h-12
//           w-12
//           rounded-full
//           border-4
//           border-indigo-600
//           border-t-transparent
//           animate-spin
//           "
//         />

//         <p
//           className="
//           mt-4
//           text-lg
//           font-medium
//           text-slate-700
//           dark:text-slate-200
//           "
//         >
//           Activating your subscription...
//         </p>

//         <p
//           className="
//           mt-2
//           text-sm
//           text-slate-500
//           "
//         >
//           Confirming your payment. Please wait...
//         </p>
//       </div>
//     );
//   }

//   return null;
// }

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useSubscriptionStore } from "../store/subscriptionStore";

export default function SubscriptionPaymentListener() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { getToken } = useAuth();

  const fetchSubscription = useSubscriptionStore(
    (state) => state.fetchSubscription,
  );

  const [processing, setProcessing] = useState(false);
  const [showDashboardButton, setShowDashboardButton] = useState(false);

  const started = useRef(false);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const payment = searchParams.get("payment");

  useEffect(() => {
    if (payment !== "success") {
      return;
    }

    if (started.current) {
      return;
    }

    started.current = true;

    setProcessing(true);

    // Show manual dashboard button after 5 seconds
    fallbackTimer.current = setTimeout(() => {
      console.log("[SSE] Taking too long, showing dashboard button");

      setShowDashboardButton(true);
    }, 5000);

    const controller = new AbortController();

    const startSSE = async () => {
      try {
        const token = await getToken();

        if (!token) {
          console.error("[SSE] Clerk token missing");

          return;
        }

        await fetchEventSource(
          `${import.meta.env.VITE_API_BASE_URL}/subscription/events`,
          {
            signal: controller.signal,

            headers: {
              Authorization: `Bearer ${token}`,
            },

            async onopen(response) {
              console.log("[SSE] Connected", response.status);

              if (!response.ok) {
                throw new Error(`SSE failed ${response.status}`);
              }
            },

            onmessage(event) {
              console.log("[SSE] Event:", event.data);

              if (event.data === "ACTIVE") {
                console.log("[SSE] Subscription activated");

                if (fallbackTimer.current) {
                  clearTimeout(fallbackTimer.current);
                }

                controller.abort();

                navigate("/dashboard", {
                  replace: true,
                });

                fetchSubscription()
                  .then(() => {
                    console.log("[SSE] Subscription refreshed");
                  })
                  .catch((error) => {
                    console.error("[SSE] Refresh failed", error);
                  });

                return;
              }

              if (event.data === "FAILED") {
                console.log("[SSE] Subscription failed");

                if (fallbackTimer.current) {
                  clearTimeout(fallbackTimer.current);
                }

                controller.abort();

                navigate("/dashboard/billing", {
                  replace: true,
                });
              }
            },

            onerror(error) {
              console.error("[SSE] Error", error);

              throw error;
            },
          },
        );
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("[SSE] Connection error", error);
        }
      }
    };

    startSSE();

    return () => {
      controller.abort();

      if (fallbackTimer.current) {
        clearTimeout(fallbackTimer.current);
      }
    };
  }, [payment, getToken, fetchSubscription, navigate]);

  if (processing) {
    return (
      <div
        className="
        fixed inset-0
        z-[9999]
        flex
        flex-col
        items-center
        justify-center
        bg-white
        dark:bg-slate-950
        "
      >
        {!showDashboardButton ? (
          <>
            <div
              className="
              h-12
              w-12
              rounded-full
              border-4
              border-indigo-600
              border-t-transparent
              animate-spin
              "
            />

            <p
              className="
              mt-4
              text-lg
              font-medium
              text-slate-700
              dark:text-slate-200
              "
            >
              Activating your subscription...
            </p>

            <p
              className="
              mt-2
              text-sm
              text-slate-500
              "
            >
              Confirming your payment. Please wait...
            </p>
          </>
        ) : (
          <>
            <p
              className="
              text-lg
              font-medium
              text-slate-700
              dark:text-slate-200
              "
            >
              Payment received
            </p>

            <p
              className="
              mt-2
              text-sm
              text-slate-500
              "
            >
              Your subscription activation is taking longer than expected.
            </p>

            <button
              className="
              mt-6
              rounded-lg
              bg-indigo-600
              px-5
              py-2
              text-white
              hover:bg-indigo-700
              "
              onClick={() =>
                navigate("/dashboard", {
                  replace: true,
                })
              }
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    );
  }

  return null;
}
