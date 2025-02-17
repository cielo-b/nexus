"use client";

import React, { useEffect, useState } from "react";

const SubscriptionPage = ({ params }: { params: { token: string } }) => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'confirmed' | 'alreadyConfirmed' | 'error' | null>(null);

  useEffect(() => {
    const confirmSubscription = async () => {
      try {
        const response = await fetch(
          `https://api.nexus.rw/api/v1/subscriptions/confirm/${params.token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.payload.subscription.active) {
            setStatus('alreadyConfirmed');
          } else {
            setStatus('confirmed');
          }
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error("Error confirming subscription:", error);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };

    confirmSubscription();
  }, [params.token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-white h-full absolute flex flex-col items-center justify-center p-4">
      {status === 'confirmed' && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Thank you for subscribing!</h1>
          <p className="text-lg">
            Your email has been successfully added to our mailing list.
          </p>
        </div>
      )}
      {status === 'alreadyConfirmed' && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Already Subscribed</h1>
          <p className="text-lg">
            Your email is already subscribed to our mailing list.
          </p>
        </div>
      )}
      {status === 'error' && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Subscription Failed</h1>
          <p className="text-lg">
            Sorry, we couldn't process your subscription at this time.
          </p>
          <p className="text-lg">Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;

export const runtime = 'edge';

