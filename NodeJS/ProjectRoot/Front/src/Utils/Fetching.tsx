// --------------------------Fetching-------------------------------
export async function Fetching() {
  const response = await fetch("http://localhost:3500/products");
  console.log("fetch is runnig");
  // console.log(response);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  // console.log(response);
  const data = await response.json();
  // console.log(data.items);
  // return data.items; // استخراج آرایه items
  return data;
}

export async function Delete(id: number) {
  const response = await fetch(`http://localhost:3500/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete the item");
  }

  // اگر پاسخ دارای وضعیت 204 بود، نیازی به تجزیه JSON نیست
  if (response.status === 204) {
    return; // یا return null، بر اساس نیاز شما
  }

  // اگر پاسخ دارای محتوای JSON باشد، تجزیه آن را انجام دهید
  return response;
}
export async function Put({
  price,
  title,
  name,
  count,
  id,
}: {
  price: number | undefined;
  title: string;
  name: string;
  count: number | undefined;
  id: number;
}) {
  const updatedProduct = { price, title, name, count, id };
  const response = await fetch(`http://localhost:3500/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedProduct),
  });
  const data = await response.json();
  console.log(data.details);
  if (response.status === 400) {
    throw new Error(
      `Validation failed: ${data.details
        .map((err: any) => `${err.field}: ${err.message}`)
        .join(",")}`
    );
  }
  // console.log(response.data.details, "my put");
  if (response.status === 404) {
    throw new Error("Product not found for updata");
  }

  return;
}

export async function Post({
  price,
  title,
  name,
  count,
}: {
  price: number;
  title: string;
  name: string;
  count: number;
}) {
  const newProduct = { price, title, name, count };
  const response = await fetch("http://localhost:3500/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });
  // console.log(response);
  if (response.status === 404) {
    return response;
  }
  if (!response.ok) {
    throw new Error("Error posting data");
  }

  if (response.status === 201) {
    // دریافت پاسخ به صورت JSON
    return response.json();
  }
}
