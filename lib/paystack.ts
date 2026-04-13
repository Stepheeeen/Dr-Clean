const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  console.warn("PAYSTACK_SECRET_KEY is not defined in environment variables");
}

export async function initializePaystackTransaction(data: {
  email: string;
  amount: number; // in minor units (kobo/cents)
  reference: string;
  callback_url: string;
  metadata?: any;
}) {
  const subaccount = process.env.PAYSTACK_SUBACCOUNT_CODE;
  
  const body: any = {
    ...data,
  };

  // If a subaccount is provided, we use it for a split payment
  if (subaccount) {
    body.subaccount = subaccount;
    // Paystack will automatically split based on the subaccount's percentage
    // If you want to specify a flat fee for the platform, you can use 'bearer' and other params
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  if (!result.status) {
    throw new Error(result.message || "Paystack initialization failed");
  }

  return result.data; // { authorization_url, access_code, reference }
}

export async function verifyPaystackTransaction(reference: string) {
  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
  });

  const result = await response.json();
  if (!result.status) {
    throw new Error(result.message || "Paystack verification failed");
  }

  return result.data;
}
